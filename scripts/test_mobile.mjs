import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('D:/SU2/oasis-2025-web-main/node_modules/ws');
const ARTIFACTS_DIR = 'C:\\Users\\atlur\\.gemini\\antigravity\\brain\\2d62e249-b353-49a8-9517-f206f53088a6';

async function testMobile() {
  console.log('--- TESTING MOBILE RESPONSIVENESS (390x844) ---');

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9242',
    '--window-size=390,844',
    '--user-data-dir=C:\\Users\\atlur\\AppData\\Local\\Temp\\cdp_test_mobile',
    'http://localhost:5175/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const targets = await new Promise((res, rej) => {
    http.get('http://localhost:9242/json', (r) => {
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
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  const takeScreenshot = async (name) => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${ARTIFACTS_DIR}\\${name}`, Buffer.from(data, 'base64'));
    console.log(`[PASS] Mobile screenshot saved: ${name}`);
  };

  // 1. Mobile Home
  await send('Page.navigate', { url: 'http://localhost:5175/' });
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('mobile_1_homepage.png');

  // 2. Mobile Schools Hub
  await send('Page.navigate', { url: 'http://localhost:5175/schools' });
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('mobile_2_schools.png');

  // 3. Mobile Registration
  await send('Page.navigate', { url: 'http://localhost:5175/register?school=engineering&dept=ai&event=ai-1' });
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('mobile_3_register.png');

  console.log('Mobile tests completed successfully!');
  ws.close();
  chrome.kill();
  process.exit(0);
}

testMobile().catch(console.error);
