# How to preview Word Up

You do not need to be a terminal expert. Pick the option that matches your device.

## Option A — Preview in a web browser (easiest)

1. Open a terminal in Cursor (or ask Cursor to run the command for you).
2. Go into the project folder:
   ```bash
   cd word-up
   ```
3. Start the web app:
   ```bash
   npm run web
   ```
4. When it finishes loading, open the address it shows — usually:
   `http://localhost:8081`
5. Use the bottom tabs (scroll sideways if needed) to move between Home, Study, Prayer, Notes, Plans, Quizzes, and Profile.

## Option B — Preview on iPhone or iPad with Expo Go

1. On your phone or tablet, install **Expo Go** from the App Store.
2. Make sure your computer and your iPhone/iPad are on the **same Wi‑Fi**.
3. In the project folder, start Expo:
   ```bash
   cd word-up
   npm start
   ```
4. A QR code will appear in the terminal (or browser dashboard).
5. On iPhone/iPad: open the **Camera** app, point it at the QR code, then open the Expo link.
6. Expo Go will load Word Up.

### If the QR code does not connect

- Confirm phone and computer share the same Wi‑Fi (not phone hotspot unless the computer is also on that hotspot).
- In the Expo terminal, press `s` to switch to Expo Go mode if asked.
- Or ask Cursor to restart with: `npx expo start --tunnel`  
  Tunnel mode is slower but often works on tricky networks. The first time it may ask you to log in to an Expo account in the browser — that step needs you.

## What works in this first version

- Navigation across all 7 screens
- Sample Bible Study layout (clearly labeled sample content)
- Local saves for prayers, verses, reading progress, quizzes, and settings

Not connected yet: a real Bible API or AI study generator.
