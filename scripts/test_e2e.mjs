import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('D:/SU2/oasis-2025-web-main/node_modules/ws');

const ARTIFACTS_DIR = 'C:\\Users\\atlur\\.gemini\\antigravity\\brain\\2d62e249-b353-49a8-9517-f206f53088a6';

async function runTests() {
  console.log('--- STARTING SUPRAGNA 2K27 E2E INTEGRATION SUITE ---');

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--window-size=1920,1080',
    '--user-data-dir=C:\\Users\\atlur\\AppData\\Local\\Temp\\cdp_test_su_backup',
    'http://localhost:5175/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const targets = await new Promise((res, rej) => {
    http.get('http://localhost:9240/json', (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });

  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));

  let id = 1;
  const send = (m, p = {}) => new Promise((res, rej) => {
    const mid = id++;
    const h = (msg) => {
      const r = JSON.parse(msg);
      if (r.id === mid) {
        ws.off('message', h);
        if (r.error) rej(r.error);
        else res(r.result);
      }
    };
    ws.on('message', h);
    ws.send(JSON.stringify({ id: mid, method: m, params: p }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // Helper to evaluate JS in page
  const evalJs = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
    return r?.result?.value;
  };

  const takeScreenshot = async (name) => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const filepath = `${ARTIFACTS_DIR}\\${name}`;
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`[PASS] Saved screenshot: ${name}`);
  };

  // -------------------------------------------------------------
  // TEST 1: HOMEPAGE VERIFICATION
  // -------------------------------------------------------------
  console.log('\n[TEST 1] Verifying Homepage elements...');
  await new Promise(r => setTimeout(r, 2000));

  const pageTitle = await evalJs('document.title');
  console.log('Homepage Title:', pageTitle);
  if (!pageTitle.includes('SUPRAGNA 2K27')) throw new Error('Homepage title mismatch');

  const hasRegisterBtn = await evalJs(`Boolean(Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Register Now')))`);
  console.log('Has Register Now Button:', hasRegisterBtn);
  if (!hasRegisterBtn) throw new Error('Register Now button missing on homepage');

  const hasExploreSchoolsBtn = await evalJs(`Boolean(Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Explore All Schools')))`);
  console.log('Has Explore All Schools Button:', hasExploreSchoolsBtn);

  await takeScreenshot('e2e_1_homepage.png');

  // -------------------------------------------------------------
  // TEST 2: HOMEPAGE -> REGISTER NOW CLICK
  // -------------------------------------------------------------
  console.log('\n[TEST 2] Testing Homepage Register Now button navigation...');
  await evalJs(`
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Register Now'));
    btn && btn.click();
  `);
  await new Promise(r => setTimeout(r, 1200));

  const currentUrl = await evalJs('window.location.pathname');
  console.log('Current URL after Register Now click:', currentUrl);
  if (!currentUrl.includes('register')) throw new Error('Did not navigate to /register');

  const hasSchoolSelector = await evalJs(`Boolean(document.querySelector('#reg-school-select'))`);
  console.log('Has School Selector for direct entry:', hasSchoolSelector);
  if (!hasSchoolSelector) throw new Error('Cascading school selector missing on direct register entry');

  await takeScreenshot('e2e_2_register_direct_entry.png');

  // -------------------------------------------------------------
  // TEST 3: NAVBAR LOGO CLICK -> HOMEPAGE
  // -------------------------------------------------------------
  console.log('\n[TEST 3] Testing Navbar Logo redirects to Homepage...');
  await evalJs(`
    const logo = document.querySelector('img[alt="SUPRAGNA 2K27"]');
    logo && logo.click();
  `);
  await new Promise(r => setTimeout(r, 1000));
  const backHomeUrl = await evalJs('window.location.pathname');
  console.log('URL after logo click:', backHomeUrl);
  if (backHomeUrl !== '/') throw new Error('Logo did not redirect to /');

  // -------------------------------------------------------------
  // TEST 4: HOMEPAGE -> SCHOOLS HUB
  // -------------------------------------------------------------
  console.log('\n[TEST 4] Navigating to Schools Hub...');
  await send('Page.navigate', { url: 'http://localhost:5175/schools' });
  await new Promise(r => setTimeout(r, 1800));

  const schoolsTitle = await evalJs('document.title');
  console.log('Schools Hub Title:', schoolsTitle);
  const schoolsCount = await evalJs(`Array.from(document.querySelectorAll('h2')).filter(h => h.innerText.includes('School')).length`);
  console.log('Displayed School Cards count:', schoolsCount);
  await takeScreenshot('e2e_3_schools_hub.png');

  // -------------------------------------------------------------
  // TEST 5: SCHOOLS -> ENGINEERING -> DEPT MODAL -> REGISTER EVENT
  // -------------------------------------------------------------
  console.log('\n[TEST 5] Testing School of Engineering -> Event Selection -> Registration Pre-fill...');
  await send('Page.navigate', { url: 'http://localhost:5175/schools/engineering' });
  await new Promise(r => setTimeout(r, 2000));

  const soeTitle = await evalJs('document.title');
  console.log('School of Engineering Title:', soeTitle);

  // Click on first department card (AI)
  await evalJs(`
    const deptCard = document.querySelector('div[style*="min-height: 360px"]') || Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Artificial Intelligence'))?.closest('div[style*="cursor: pointer"]');
    if (deptCard) deptCard.click();
  `);
  await new Promise(r => setTimeout(r, 1200));

  // In the modal, click "Register for Event →" on the first event
  console.log('Clicking "Register for Event →" on first competition event inside modal...');
  const clickedModalBtn = await evalJs(`
    const modalBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Register for Event'));
    if (modalBtn) {
      modalBtn.click();
      true;
    } else {
      false;
    }
  `);
  console.log('Found & clicked modal event register button:', clickedModalBtn);
  if (!clickedModalBtn) throw new Error('Could not find Register for Event button in modal');

  await new Promise(r => setTimeout(r, 1500));

  const postEventUrl = await evalJs('window.location.search');
  console.log('URL Search Params after Event Register click:', postEventUrl);
  if (!postEventUrl.includes('school=engineering') || !postEventUrl.includes('event=')) {
    throw new Error('Event deep link parameters missing in URL');
  }

  const prefillBannerText = await evalJs(`
    const banner = Array.from(document.querySelectorAll('div')).find(d => d.innerText.includes('Selected Competition:'));
    banner ? banner.innerText : null;
  `);
  console.log('Prefill Banner Text:', prefillBannerText);

  await takeScreenshot('e2e_4_event_prefill_registration.png');

  // -------------------------------------------------------------
  // TEST 6: COMPLETE REGISTRATION FORM SUBMISSION
  // -------------------------------------------------------------
  console.log('\n[TEST 6] Testing Form Validation & Complete Submission...');
  await evalJs(`
    function fillField(selector, val) {
      const el = document.querySelector(selector);
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
    fillField('#reg-name', 'Karthikeyan Atluri');
    fillField('#reg-email', 'karthikeyan@vrsiddhartha.ac.in');
    fillField('#reg-college', 'V.R. Siddhartha Engineering College');
    fillField('#reg-roll', '248W1A0501');
    fillField('#reg-mobile', '9848511209');
    fillField('#reg-alt-mobile', '9490167231');
  `);

  await new Promise(r => setTimeout(r, 600));

  // Submit form
  console.log('Submitting registration form...');
  await evalJs(`
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  `);

  await new Promise(r => setTimeout(r, 2000));

  const sealedHeading = await evalJs(`
    const h = Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('Delegate Registration Sealed'));
    h ? h.innerText : null;
  `);
  console.log('Sealed Heading found:', sealedHeading);

  const passBadgeText = await evalJs(`
    const b = Array.from(document.querySelectorAll('div')).find(el => el.innerText.includes('SEALED •'));
    b ? b.innerText : null;
  `);
  console.log('Pass Badge text:', passBadgeText);

  if (!sealedHeading && !passBadgeText) throw new Error('Registration was not successfully confirmed!');

  await takeScreenshot('e2e_5_sealed_pass_confirmation.png');

  console.log('\n=== ALL E2E INTEGRATION TESTS PASSED SUCCESSFULLY! ===');

  ws.close();
  chrome.kill();
  process.exit(0);
}

runTests().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
