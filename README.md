# Sprite Console desktop (Windows)

Free build, no code signing: Windows shows "Windows protected your PC" on first run (More info, Run anyway).

On a Windows PC with Node 20: `cd desktop && npm install && npm run dist` -> `dist/*.exe`.
Or push this folder to GitHub (with `.github/workflows/desktop.yml`), open Actions, run "Build Windows app", download the artifact.

## Getting a single-file installer (no Wine needed)
1. Push this repo to GitHub with `.github/workflows/desktop.yml`.
2. Open Actions, pick "Build Windows app", press Run workflow, tick "Attach the files to the latest GitHub Release", and run it.
3. After a few minutes the release gets `SpriteConsole-Setup.exe` (installer) and `SpriteConsole-Portable.exe` (one file, no install).
You can also push a tag like `desktop-v1.0.1` and it builds and attaches automatically.
