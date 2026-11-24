# HER ERA

Your life. Your space. Your era.

Expo (React Native) app shell with:

- **Welcome / auth** — create account, sign in, or continue as guest
- **Main shell** — Home, My Life, Diary, My Cycle, More, Settings

## Run

```bash
cd her-era
npm start
```

Then press `w` for web, or scan the QR code with Expo Go on your phone.

```bash
npm run web
npm run android
npm run ios
```

## Structure

```
App.tsx                 # Welcome → Main shell
src/theme.ts            # Shared lavender palette
src/screens/
  WelcomeScreen.tsx     # Auth UI
  MainShell.tsx         # Tabbed home experience
```

Account authentication is UI-only for now — sign-in / sign-up / guest all enter the main shell.
