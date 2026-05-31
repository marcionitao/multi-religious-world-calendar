# 🌍 Multi-Religious World Calendar

## Project Overview
The **Multi-Religious World Calendar** is a web application that consolidates celebrations and holidays from six major religious traditions into a single, unified calendar. It aims to promote intercultural understanding and make planning easier for multicultural environments.

---

## Technologies Used
- **Framework**: **Next.js** (v16.2.0)
- **Language**: **React** (v19)
- **Styling**: **Tailwind CSS** (v4.2.0)
- **Date handling**: `date-fns` (v4.1.0)
- **Charts & visualisation**: `recharts` (v2.15.0)
- **UI components**: Radix UI suite (`@radix-ui/react-...`)
- **Carousel**: `embla-carousel-react` (v8.6.0)
- **Form handling & validation**: `react-hook-form`, `@hookform/resolvers`, `zod`
- **Utilities**: `clsx`, `tailwind-merge`, `autoprefixer`, `class-variance-authority`
- **Notifications & animations**: `sonner`, `tw-animate-css`

---

## Core Features
1. **Monthly Grid View** – Browse month‑by‑month with colour‑coded indicators for days that contain celebrations.
2. **Religion Filters** – Toggle any tradition on/off to focus on specific holidays.
3. **Native Names + Translations** – Each holiday displays its original name (Hebrew, Arabic, Sanskrit, Mandarin, etc.) alongside a Portuguese translation.
4. **Detail Panel** – Clicking a day opens a panel with full information: native name, translation, brief description, and associated tradition.
5. **Upcoming Celebrations** – A side list shows the next holidays from the current date, helping users plan ahead.
6. **Weekday Names per Tradition** – Option to view weekday names in the relevant language (e.g., *Shabbat* for Judaism, *Jumuʿah* for Islam).
7. **Light/Dark Mode** – Theme switcher for visual comfort.
8. **Responsive Design** – Works on desktop and mobile devices.

---

## Use Cases
- **Multicultural Companies** – Schedule meetings while avoiding religious holidays of team members.
- **Education** – Teach about religious and cultural diversity.
- **Travelers** – Discover festivals occurring in specific countries or periods.
- **Inter‑faith Communities** – Coordinate events that respect all traditions.

---

## Getting Started
```bash
# Clone the repository
git clone <repo-url>
cd multireligious-calendar-app

# Install dependencies
npm install

# Run the development server
npm run dev
```
The app will be available at `http://localhost:3000`.

---

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Make your changes and ensure the app still builds.
4. Submit a pull request with a clear description of the changes.

---

## License
This project is open source. See the `LICENSE` file for details.

---

*Feel free to open an issue for suggestions, bugs, or feature requests.*