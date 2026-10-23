
const { app, BrowserWindow, shell, Menu } = require('electron');

const SITE = 'https://app.spriteconsole.com';
const INSIDE = new Set(['app.spriteconsole.com', 'discord.com']); 

if (!app.requestSingleInstanceLock()) app.quit();

let win;
function create() {
  win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 380, minHeight: 600,
    backgroundColor: '#0A0D16', title: 'Sprite Console', autoHideMenuBar: true,
    icon: require('path').join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  Menu.setApplicationMenu(null);
  win.loadURL(SITE);
  win.webContents.setWindowOpenHandler(({ url }) => {
    try { if (INSIDE.has(new URL(url).hostname)) return { action: 'allow' }; } catch {  }
    if (/^https:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    let host = '';
    try { host = new URL(url).hostname; } catch {  }
    if (!INSIDE.has(host)) { e.preventDefault(); if (/^https:/i.test(url)) shell.openExternal(url); }
  });
  win.webContents.on('did-fail-load', (_e, code) => {
    if (code === -3) return;
    win.loadURL('data:text/html,' + encodeURIComponent('<body style="margin:0;display:grid;place-items:center;height:100vh;background:#0A0D16;color:#e6ecf7;font:16px system-ui;text-align:center"><div><h2>Can\'t reach Sprite Console</h2><p>Check your connection.</p><button onclick="location.href=\'' + SITE + '\'" style="padding:10px 20px;border:0;border-radius:8px;background:#5eead4;font-weight:700;cursor:pointer">Try again</button></div></body>'));
  });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
