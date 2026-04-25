# 📚 Study App (Desktop)

Minimal, offline-first Study Tracking App built with **Next.js + Electron**.
Track your learning sessions, visualize progress, and keep your data fully private — no cloud required.

![Next.js](https://img.shields.io/badge/Framework-Next.js-black)
![Electron](https://img.shields.io/badge/Desktop-Electron-blue)
![License](https://img.shields.io/badge/license-Private-lightgrey)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📅 **Session Tracking** | Day-based study tracking with module entries and notes |
| 📊 **Weekly Analytics** | Progress %, best/worst tracking, and heatmap visualization |
| 🔒 **Privacy-First** | Fully local storage — no cloud, no tracking, no internet |
| 💾 **Data Export** | JSON export for manual backup and print support |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js (App Router) |
| **Desktop** | Electron |
| **State** | React Hooks |
| **Storage** | localStorage |
| **Build** | electron-builder |

---

## 📂 Project Structure

```
/app
/components
/lib
/types
/public
/electron.js
/next.config.ts
/package.json
/out          → static build (generated)
/dist         → desktop app (generated)
```

---

## 🚀 Getting Started

### Install dependencies
```bash
   npm install
```

### Run Web (Dev)
```bash
   npm run dev
```

### Run Desktop (Dev)
```bash
   npx electron .
```

---

## 📦 Build

### 1. Static Export
```bash
   npm run build
```
Generates `/out`

### 2. Desktop App Build
```bash
   npm run dist
```
Generates `/dist`

### Output Files

| OS | File |
|---|---|
| macOS | `dist/Study App.dmg` |
| Windows | `dist/Study App.exe` |

---

## 💡 Usage

### Launch App
- Install `.dmg` (macOS) or `.exe` (Windows)
- Open **Study App**

### Export Data
- Click **Export** → downloads `study-backup.json`

### Print
- Click **Print** → opens system print dialog

---

## 🗄️ Data Storage

Data is stored in `localStorage` (browser inside Electron).

| Aspect | Status |
|---|---|
| Internet | ❌ None |
| Cloud | ❌ None |
| Tracking | ❌ None |
| Local Only | ✅ Yes |

> ⚠️ No auto backup, no sync, device-bound only.

**Recommended backup strategy:** Export once per week and store on USB, cloud, or a local folder.

---

## 🔮 Future Improvements

- IndexedDB instead of localStorage
- Auto backup
- Import feature
- Dark / light theme toggle
- Mobile version (PWA)

---

## ⚠️ Known Limitations

- No multi-device sync
- No database (localStorage only)
- No authentication
- No auto-save history

---

## 📄 License

Private / Personal-Use

---

## 👤 Author

**June** ([@junesdream](https://github.com/junesdream))
Full-Stack Development • AI Systems • Electronic Music