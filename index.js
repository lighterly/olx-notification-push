import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import sound from "sound-play";
import open from "open";
import { WindowsToaster } from "node-notifier";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- CONFIG ----------------

const URL = 'https://www.olx.com.br/games/jogos-de-video-game?q=jogo&sf=1';

const CHECK_INTERVAL = 60 * 1000;
const SEEN_FILE = path.join(__dirname, "seen.txt");
const SOUND_FILE = path.join(__dirname, "notification.mp3");
const TMP_DIR = path.join(__dirname, "tmp");

// ---------------- SETUP ----------------

if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);
if (!fs.existsSync(SEEN_FILE)) fs.writeFileSync(SEEN_FILE, "");

// ---------------- HELPERS ----------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const loadSeen = () =>
	new Set(
		fs
			.readFileSync(SEEN_FILE, "utf8")
			.split("\n")
			.map((l) => l.trim())
			.filter(Boolean)
	);

const saveSeen = (link) => fs.appendFileSync(SEEN_FILE, link + "\n");

async function playSound() {
	try {
		await sound.play(SOUND_FILE);
	} catch {}
}

async function downloadImage(url, id) {
	try {
		const res = await fetch(url);
		const buffer = Buffer.from(await res.arrayBuffer());
		const file = path.join(TMP_DIR, `${id}.jpg`);
		fs.writeFileSync(file, buffer);
		return file;
	} catch {
		return null;
	}
}

function notify(ad, imagePath) {
	let notifier = new WindowsToaster({
		withFallback: false,
	});

	notifier.notify(
		{
			title: `🆕 Novo anúncio • ${ad.time} • ${ad.price}`,
			message: ad.title,
			icon: imagePath || undefined,
			contentImage: imagePath || undefined,
			actions: ["Abrir anúncio"],
			wait: false,
		},
		(err, data) => {
			if (err) console.error(err);
		}
	);

	notifier.on("abrir an뿯½ncio", async function () {
		await open(ad.link);
	});
}

// ---------------- MAIN ----------------

const seen = loadSeen();

const browser = await puppeteer.launch({
	headless: false,
	args: ["--window-size=800,600"],
	defaultViewport: { width: 800, height: 600 },
});

const [page] = await browser.pages();

async function checkAds() {
	console.log(`\n🔍 Checking OLX (${new Date().toLocaleTimeString()})`);

	await page.goto(URL, { waitUntil: "networkidle2", timeout: 0 });
	await sleep(2000);

	await page.waitForSelector('div[class^="AdListing_adListContainer"]');

	const ads = await page.$$eval(
		'div[class^="AdListing_adListContainer"] section.olx-adcard',
		(cards) =>
			cards
				.map((card) => {
					const linkEl = card.querySelector('a[data-testid="adcard-link"]');
					const priceEl = card.querySelector(".olx-adcard__price");
					const timeEl = card.querySelector(".olx-adcard__date");

					let image = "";
					const picture = card.querySelector("picture");
					if (picture) {
						const jpeg = picture.querySelector('source[type="image/jpeg"]');
						if (jpeg?.srcset) image = jpeg.srcset.split(" ")[0];
						else {
							const img = picture.querySelector("img");
							if (img?.src) image = img.src;
							else {
								const any = picture.querySelector("source[srcset]");
								if (any?.srcset) image = any.srcset.split(" ")[0];
							}
						}
					}

					return {
						title: linkEl?.getAttribute("title") || "",
						link: linkEl?.href || "",
						price: priceEl?.innerText || "Preço não informado",
						time: timeEl?.innerText || "Horário desconhecido",
						image,
					};
				})
				.filter((ad) => ad.link)
	);

	for (const ad of ads) {
		if (seen.has(ad.link)) continue;

		seen.add(ad.link);
		saveSeen(ad.link);

		console.log("🆕", ad.title);

		playSound();

		const id = ad.link.split("-").pop();
		const imgPath = ad.image ? await downloadImage(ad.image, id) : null;

		notify(ad, imgPath);
	}
}

await checkAds();
setInterval(checkAds, CHECK_INTERVAL);