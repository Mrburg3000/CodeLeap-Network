# CodeLeap Network

A simple social network built with **Next.js**, **TypeScript**, and **plain CSS** — no backend or database required. Everything persists via `localStorage`.

---

## Features

- **Create, edit, and delete posts**
- **Likes** — like/unlike posts with real-time count
- **Comments** — collapsible comment section per post
- **Mentions** — detects `@username` in text and highlights it visually
- **Media attachments** — attach images to posts (base64, 4MB limit)
- **Sorting and filtering** — newest, oldest, most liked / all posts or only yours
- **Persistent login/logout** — session saved in `localStorage`
- **Responsive** — mobile-friendly layout

---

## Tech Stack

- [Next.js 14+](https://nextjs.org/) with App Router
- TypeScript
- Plain CSS (no Tailwind or UI libraries)
- Font: [Roboto](https://fonts.google.com/specimen/Roboto) via Google Fonts

---

## Getting Started

**Requirements:** Node.js 18+ and npm/yarn/pnpm.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/codeleap-network.git
cd codeleap-network

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

---

## How to Use

1. Open the app and enter a username to sign in
2. Create posts with a title, content, and an optional image
3. Use `@username` in your text to mention someone
4. Like posts with the heart button
5. Click "comments" to expand and add a comment
6. Use the sort/filter bar to reorder posts or view only yours
7. Click **Logout** in the header to sign out

---

## Storage

All data is stored in the browser's `localStorage` under these keys:

| Key | Content |
|---|---|
| `codeleap_username` | Logged-in username |
| `codeleap_posts` | Posts array (JSON) |
| `codeleap_comments` | Comments array (JSON) |

> **Note:** data is local to the browser. Clearing `localStorage` or switching devices will erase everything.

---

## Known Limitations

- Images are stored as base64 — posts with large images may approach the ~5MB `localStorage` limit
- Data is not shared across devices or between different users
- Mentions are visual only — there is no real notification system
