import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9233',
    '--window-size=390,844',
    '--user-data-dir=C:\\Users\\atlur\\AppData\\Local\\Temp\\cdp_test_banner_mob3',
    'http://localhost:5174/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const targets = await new Promise((res, rej) => {
    http.get('http://localhost:9233/json', (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });

  const page = targets.find(t => t.type === 'page');
  const WebSocket = (await import('ws')).default || (await import('ws'));
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));

  let id = 1;
  const send = (m, p = {}) => new Promise(res => {
    const mid = id++;
    const h = (msg) => {
      const r = JSON.parse(msg);
      if (r.id === mid) { ws.off('message', h); res(r.result); }
    };
    ws.on('message', h);
    ws.send(JSON.stringify({ id: mid, method: m, params: p }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await new Promise(r => setTimeout(r, 3500));

  // Find and click ENTER
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const els = Array.from(document.querySelectorAll('*'));
        const enterEl = els.find(e => e.children.length === 0 && e.textContent.trim().toUpperCase() === 'ENTER');
        if (enterEl) {
          enterEl.click();
          return 'Clicked';
        }
        return 'Not found';
      })()
    `
  });

  await new Promise(r => setTimeout(r, 6000));
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\atlur\\.gemini\\antigravity\\brain\\2d62e249-b353-49a8-9517-f206f53088a6\\screen_new_banner_mob_inside.png', Buffer.from(data, 'base64'));
  console.log('Saved screen_new_banner_mob_inside.png');
  ws.close();
  chrome.kill();
}

run().catch(console.error);

