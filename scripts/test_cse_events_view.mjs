import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';

async function run() {
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--window-size=1920,1080',
    '--user-data-dir=C:\\Users\\atlur\\AppData\\Local\\Temp\\cdp_test2',
    'http://localhost:5174/events'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://localhost:9223/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  const WebSocket = (await import('ws')).default || (await import('ws'));
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise((resolve) => ws.on('open', resolve));

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    const handler = (msg) => {
      const res = JSON.parse(msg);
      if (res.id === msgId) {
        ws.off('message', handler);
        resolve(res.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  await new Promise(r => setTimeout(r, 2000));

  // Click Engineering (West, angle ~ 160 deg -> x: 250, y: 700)
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

  await new Promise(r => setTimeout(r, 2500));

  // Click first department (Computer Science & Engineering)
  console.log('Clicking CSE card...');
  const evalResult = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = document.querySelectorAll('div[style*="cursor: pointer"]');
        if (cards.length > 0) {
          cards[0].click();
          return 'Clicked first department card';
        }
        return 'Not found';
      })()
    `
  });
  console.log('Dept click result:', evalResult);

  await new Promise(r => setTimeout(r, 1500));

  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('D:\\SU2\\oasis-2025-web-main\\screen_cse_events.png', Buffer.from(screenshot.data, 'base64'));
  console.log('Saved screen_cse_events.png!');

  ws.close();
  chromeProc.kill();
}

run().catch(console.error);

