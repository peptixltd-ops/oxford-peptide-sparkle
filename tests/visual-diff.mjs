import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const pages = [
  ["home", "/"],
  ["shop", "/shop"],
  ["product", "/products/retatrutide"],
  ["cart", "/cart"],
  ["coas", "/coas"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["faq", "/faqs"],
  ["privacy", "/privacy-policy"],
  ["terms", "/terms"],
  ["shipping", "/shipping-policy"],
];
const widths = [375, 768, 1440];
const live = "https://www.oxfordresearchpeptides.com";
const local = "http://127.0.0.1:3000";
const out = "/workspace/artifacts/comparisons";

async function prepare(page) {
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" }).catch(() => {});
  const box = page.getByRole("checkbox", { name: /18 or over/i });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const visible = await box.waitFor({ state: "visible", timeout: 8000 }).then(() => true).catch(() => false);
    if (!visible) break;
    await box.click({ force: true });
    const gone = await page.getByRole("dialog", { name: /age confirmation/i }).waitFor({ state: "hidden", timeout: 2500 }).then(() => true).catch(() => false);
    if (gone) break;
  }
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(700);
}

async function shoot(browser, base, path, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 45000 });
  await prepare(page);
  const buf = await page.screenshot({ fullPage: false, animations: "disabled" });
  await page.close();
  return buf;
}

const browser = await chromium.launch();
await mkdir(out, { recursive: true });
const report = [];
for (const width of widths) {
  for (const [name, path] of pages) {
    const a = await shoot(browser, live, path, width);
    const b = await shoot(browser, local, path, width);
    const livePath = `${out}/${width}-${name}-live.png`;
    const localPath = `${out}/${width}-${name}-local.png`;
    const sidePath = `${out}/${width}-${name}-side.png`;
    await writeFile(livePath, a);
    await writeFile(localPath, b);
    const diff = spawnSync("python3", ["-c", `
from PIL import Image, ImageChops, ImageDraw, ImageStat
live=Image.open("${livePath}").convert("RGB")
local=Image.open("${localPath}").convert("RGB")
w=min(live.width, local.width)
h=min(live.height, local.height)
live=live.crop((0,0,w,h))
local=local.crop((0,0,w,h))
diff=ImageChops.difference(live, local)
stat=ImageStat.Stat(diff)
mean=sum(stat.mean)/len(stat.mean)
# pixels that differ by more than a small threshold
px=list(diff.getdata())
changed=sum(1 for r,g,b in px if r+g+b>30)
pct=100*changed/len(px)
side=Image.new("RGB", (w*2+16, h), (255,255,255))
side.paste(live,(0,0)); side.paste(local,(w+16,0))
side.save("${sidePath}")
print(f"{pct:.2f} {mean:.2f}")
`], { encoding: "utf8" });
    const [pct, mean] = (diff.stdout || "nan nan").trim().split(" ");
    report.push({ width, name, pct: Number(pct), mean: Number(mean), err: diff.stderr?.slice(0, 200) });
    console.log(`${width} ${name} diff ${pct}% mean ${mean}`);
  }
}
await browser.close();
await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
const worst = [...report].sort((a, b) => b.pct - a.pct).slice(0, 8);
console.log("WORST", JSON.stringify(worst));
