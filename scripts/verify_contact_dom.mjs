import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';

async function testUrl(url) {
  console.log(`\nTesting ${url}...`);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9238',
    '--window-size=1920,1080',
    '--user-data-dir=C:\\Users\\atlur\\AppData\\Local\\Temp\\cdp_test_contact_eval',
    url
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const targets = await new Promise((res, rej) => {
    http.get('http://localhost:9238/json', (r) => {
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
  await new Promise(r => setTimeout(r, 4000));

  const evalResult = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('*')).map(el => el.innerText).filter(t => t && (t.includes('Ipsita') || t.includes('Ipsitha')))`
  });
  console.log('Evaluated elements matching Ipsit*:', evalResult);

  const bodyText = await send('Runtime.evaluate', {
    expression: `document.body.innerText`
  });
  console.log('Body includes Ipsitha:', bodyText.result.value.includes('Ipsitha'));
  console.log('Body includes Ipsita P:', bodyText.result.value.includes('Ipsita P'));

  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  const filename = url.includes('5173') ? 'contact_5173.png' : 'contact_5174.png';
  fs.writeFileSync(`C:\\Users\\atlur\\.gemini\\antigravity\\brain\\2d62e249-b353-49a8-9517-f206f53088a6\\${filename}`, Buffer.from(data, 'base64'));
  console.log(`Saved screenshot as ${filename}`);

  ws.close();
  chrome.kill();
}

async function main() {
  await testUrl('http://localhost:5173/contact');
  await testUrl('http://localhost:5174/contact');
}

main().catch(console.error);

