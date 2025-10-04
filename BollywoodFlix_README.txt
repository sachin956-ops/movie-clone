BollywoodFlix v3 — Offline Bollywood Movie/Series/Anime Demo

BollywoodFlix v3 is a frontend-only, offline movie/series/anime web app inspired by Netflix, but focused on Bollywood content. It includes features like login/signup, filtering, sorting, watchlist management, modals for detailed info, responsive design, and frontend pagination.

---

Features

- Dark-themed, responsive design
- Login/Signup (accounts stored locally in browser localStorage)
- Filter by genre and type
- Sort by rating or year
- Movie/Series/Anime modal with title, year, genres, description, and rating
- Watchlist — add/remove titles; stored locally
- Frontend-only pagination
- Simple clean poster images stored locally (assets/posters/)
- Error page (404) for unknown routes
- Custom dropdown arrows matching dark theme

---

Included Files

bollywoodflix_v3/
├─ index.html        # Main HTML file
├─ styles.css        # Dark theme + animations + dropdown styling
├─ script.js         # All frontend logic: filters, modals, watchlist, pagination
└─ assets/
   └─ posters/       # 15 simple clean poster images

---

How to Run

1. Download the project ZIP and unzip it.
2. Open index.html in your browser.
   - No server required, fully frontend.
3. Use the navigation links to explore Home, Watchlist, and Login/Signup pages.

---

How to Use

- Filtering & Sorting:
  Use the genre/type/sort dropdowns to filter content.
- Search:
  Type any title in the search box to filter in real time.
- Watchlist:
  - Click on a card or right-click to add/remove from your watchlist.
  - Access watchlist from the header navigation.
- Login/Signup:
  - Create a local account to manage your watchlist.
  - All data is stored in your browser only.

---

Customization

- Poster Images:
  Replace images in assets/posters/ with your own. Ensure filenames match those in script.js.
- Dropdown Colors:
  Edit styles.css under the #genre-select, #type-select, #sort-select section.
- Dark Theme:
  Colors, hover effects, and arrows can be customized in styles.css.

---

Notes

- Works best on modern browsers: Chrome, Firefox, Edge, Safari.
- Fully offline — all assets and logic are local.
- No backend, no API calls.

---

License

This is a personal demo project. All poster images are locally generated and royalty-free. You can use, modify, and distribute for learning purposes.

---

Enjoy your BollywoodFlix experience! 🎬🍿
