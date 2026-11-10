import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9234',
    '--window-size=1920,1080',
    '--user-data-dir=C:\\Users\\atlur\\AppData\\Local\\Temp\\cdp_test_ai_dept',
    'http://localhost:5174/events'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const targets = await new Promise((res, rej) => {
    http.get('http://localhost:9234/json', (r) => {
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
  await new Promise(r => setTimeout(r, 2000));

  // Click Engineering (West, x: 250, y: 700)
  console.log('Clicking School of Engineering...');
  await send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    x: 250,
    y: 700,
    button: 'left',
    clickCount: 1
  });
  await send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    x: 250,
    y: 700,
    button: 'left',
    clickCount: 1
  });

  await new Promise(r => setTimeout(r, 4500));

  // Click Department of Artificial Intelligence (Card 2)
  console.log('Clicking Department of Artificial Intelligence...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('h3'));
        const aiCard = cards.find(h => h.textContent.includes('Artificial Intelligence'));
        if (aiCard) {
          aiCard.closest('div[style*="cursor"]').click();
          return 'Clicked AI card';
        }
        return 'AI card not found';
      })()
    `
  });

  await new Promise(r => setTimeout(r, 2000));

  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\atlur\\.gemini\\antigravity\\brain\\2d62e249-b353-49a8-9517-f206f53088a6\\screen_ai_events_grid.png', Buffer.from(data, 'base64'));
  console.log('Saved screen_ai_events_grid.png successfully!');
  ws.close();
  chrome.kill();
}

run().catch(console.error);
