
# Aspire Banking UI (React + TypeScript)


## Features

- View and add virtual debit cards.
- Freeze/unfreeze cards, set spend limits.
- View available balance and recent transactions.
- Uses `localStorage` to simulate persistent data.

## 📁 Folder Structure

```
aspire-banking-ui/
├── node_modules/
├── public/
├── src/
│   ├── assets/                  # Images, icons, or reusable media
│   ├── components/             # All UI components
│   │   ├── CardCarousel/
│   │   │   ├── CardCarousel.tsx
│   │   │   └── CardCarousel.css
│   │   ├── DropDown/           # DropDown transaction filter component
│   │   ├── FreezeToggleButton/ # Toggle button to freeze cards
│   │   ├── CardSection.tsx     # Card and transaction layout
│   │   └── Sidebar.tsx         # Navigation Sidebar
│   ├── services/               # Logic and localStorage services
│   │   ├── cardService.ts
│   │   └── dropDownService.ts
│   ├── styles/                 # Global CSS styles
│   │   ├── CardSection.css
│   │   └── Sidebar.css
│   ├── App.tsx                 # Root component
│   ├── App.test.tsx           # Test file
│   ├── App.css
│   ├── index.tsx              # React app entry point
│   ├── index.css              # Global styles
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/aspire-banking-ui.git
cd aspire-banking-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

Open your browser and go to `http://localhost:3000` to see the app in action.

---

## 🧪 Running Tests

The project includes setup for testing with **React Testing Library** and **Jest**.

```bash
npm test
```

---

## ⚙️ Project Configuration

- TypeScript for strong typing.
- CSS modules and global CSS for styling.
- Component-based folder structure.
- Service files manage state using `localStorage`.

---

##  Notes


- No backend/API integration is involved; data is mocked and stored in `localStorage`.
- You can add new cards through the **"Add New Card"** modal.
- Click the **freeze toggle** to simulate freezing/unfreezing a card.

---

## 📄 License

MIT License. Free to use, modify, and distribute.


Created by Yash Jaiswal
https://github.com/yashjaiswal97