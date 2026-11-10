import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';

async function run() {
  // Launch chrome with remote debugging port 9222
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1920,1080',
    '--user-data-dir=C:\\Users\\atlur\\AppData\\Local\\Temp\\cdp_test',
    'http://localhost:5174/events'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  // Get active CDP target
  const targets = await new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  console.log('Target found:', pageTarget.webSocketDebuggerUrl);

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

  // Wait for initial render
  await new Promise(r => setTimeout(r, 2000));

  // 1. Click Commerce fan blade on the canvas
  // Fan pivot is at (960, 1080). Commerce angle is around 55 deg.
  // Center of Commerce blade is approximately (1450, 450).
  console.log('Clicking School of Arts & Commerce...');
  await send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    x: 1450,
    y: 450,
    button: 'left',
    clickCount: 1
  });
  await send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    x: 1450,
    y: 450,
    button: 'left',
    clickCount: 1
  });

  // Wait for fan fold animation and departments grid to appear
  await new Promise(r => setTimeout(r, 2500));

  // 2. Click on the first department: Department of Commerce
  console.log('Clicking Department of Commerce card...');
  const evalResult = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const headings = Array.from(document.querySelectorAll('h3'));
        const dept = headings.find(h => h.textContent.includes('Commerce') || h.textContent.includes('Business'));
        if (dept) {
          const card = dept.closest('div[style*="cursor: pointer"]');
          if (card) { card.click(); return 'Clicked dept: ' + dept.textContent; }
        }
        // Fallback: click first card
        const cards = document.querySelectorAll('div[style*="cursor: pointer"]');
        if (cards.length > 0) { cards[0].click(); return 'Clicked first card'; }
        return 'Not found';
      })()
    `
  });
  console.log('Dept click result:', evalResult);

  // Wait for events view
  await new Promise(r => setTimeout(r, 1500));

  // Take screenshot
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('D:\\SU2\\oasis-2025-web-main\\screen_dept_events.png', Buffer.from(screenshot.data, 'base64'));
  console.log('Saved screen_dept_events.png!');

  ws.close();
  chromeProc.kill();
}

run().catch(console.error);

