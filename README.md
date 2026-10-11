# Word Up

A teen-friendly Bible study app built with **Expo**, **React Native**, and **TypeScript**.

## What’s included (Milestone 1)

- Home, Bible Study, Prayer Journal, Notes & Saved Verses, Reading Plans, Bible Quizzes, Profile & Settings
- Bible Study layout with KJV / NLT sample content (clearly labeled — no live Bible API yet)
- Local storage for prayers, saved verses, reading progress, quiz scores, and settings
- Navy / black theme with bright blue accents and light cheetah decoration

## Preview on the web

```bash
cd word-up
npm install
npm run web
```

Then open **http://localhost:8081**

## Preview on iPhone / iPad

1. Install **Expo Go** from the App Store
2. Put your phone and computer on the same Wi‑Fi
3. Run:

```bash
npm start
```

4. Scan the QR code with the Camera app and open it in Expo Go

More detail: [PREVIEW.md](./PREVIEW.md)

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start Expo |
| `npm run web` | Start web preview |
| `npm run typecheck` | TypeScript check |
| `npm run smoke:web` | Browser smoke test (dev server must be running) |
