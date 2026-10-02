// Screenshot slides at 1920×1080 with every step revealed.
// Usage: node scripts/shot.mjs <outDir> <n> [n2 n3 …]     (dev server must run on :5181, or set PORT)
//        node scripts/shot.mjs <outDir> all
import puppeteer from 'puppeteer-core'
import fs from 'fs'

const [outDir = '/tmp/deck-shots', ...nums] = process.argv.slice(2)
const PORT = process.env.PORT || 5181
fs.mkdirSync(outDir, { recursive: true })
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true, defaultViewport: { width: 1920, height: 1080 },
})
const page = await browser.newPage()
await page.goto(`http://localhost:${PORT}/?shot#/1`, { waitUntil: 'networkidle2' })
const total = await page.evaluate(() => window.__deckTotal || 0)
const list = nums[0] === 'all' || !nums.length ? Array.from({ length: total || 1 }, (_, i) => i + 1) : nums.map(Number)
for (const n of list) {
  await page.goto(`http://localhost:${PORT}/?shot&n=${n}#/${n}.99`, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 2600))
  const file = `${outDir}/slide-${String(n).padStart(2, '0')}.png`
  await page.screenshot({ path: file })
  console.log(file)
}
await browser.close()
