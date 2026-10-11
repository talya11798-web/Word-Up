import { chromium } from 'playwright';

const base = 'http://localhost:8081';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const results = [];

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const hasBrand = await page.getByText('Word Up', { exact: true }).first().isVisible();
  results.push(['Home brand', hasBrand]);

  const tabs = [
    ['Study', 'Bible Study'],
    ['Prayer', 'Prayer Journal'],
    ['Notes', 'Notes & Saved Verses'],
    ['Plans', 'Reading Plans'],
    ['Quizzes', 'Bible Quizzes'],
    ['Profile', 'Profile & Settings'],
    ['Home', 'Open the Word. Make it personal.'],
  ];

  for (const [tab, expected] of tabs) {
    await page.getByRole('button', { name: tab, exact: true }).click();
    await page.waitForTimeout(700);
    const ok = await page.getByText(expected).first().isVisible();
    results.push([`Tab ${tab} -> ${expected}`, ok]);
  }

  await page.getByRole('button', { name: 'Study', exact: true }).click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'Select KJV', exact: true }).first().click();
  await page.waitForTimeout(700);
  const kjvSelected = await page.getByText('whosoever believeth').first().isVisible();
  results.push(['KJV sample verse updates', kjvSelected]);

  await page.getByRole('button', { name: 'Select NLT', exact: true }).first().click();
  await page.waitForTimeout(700);
  const nltSelected = await page
    .getByText('For this is how God loved the world')
    .first()
    .isVisible();
  results.push(['NLT sample verse updates', nltSelected]);

  await page.screenshot({ path: '/tmp/word-up-smoke.png', fullPage: true });

  let failed = 0;
  for (const [name, ok] of results) {
    console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}`);
    if (!ok) failed += 1;
  }

  await browser.close();
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
