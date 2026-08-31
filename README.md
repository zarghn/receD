# 🍲 receD

A front-end recipe discovery application inspired by **Forkify** by Jonas Schmedtmann, rebuilt with a completely custom UI, dark elegant theme, and smooth scroll-driven animations.

This project was built as a learning project to practice JavaScript, fetch/async-await, the Forkify API, DOM manipulation, and browser storage.

> 🎨 The entire UI and styling are custom-built and are **not** a copy of the original Forkify design.

---

## <h3 align="center">📱 Project Preview</h3>

<p align="center"> <img width="50%" alt="receD - home" src="[PUT_YOUR_IMAGE_LINK_HERE](https://github.com/user-attachments/assets/a512bbe4-7224-4c34-8e11-6e33e7392633)" /> <img width="50%" alt="receD - recipe modal" src="[PUT_YOUR_IMAGE_LINK_HERE](https://github.com/user-attachments/assets/08d7a4f0-88b1-49cc-be69-6059fe0316c4)" /> </p>
## ✨ Features

### 🔍 Recipe Search
- Search thousands of recipes using the Forkify API
- Paginated results with next/previous navigation
- Animated loading state while fetching

### 📖 Recipe Details
- Full recipe modal with ingredients, image, cooking time, and servings
- Dynamically adjustable servings with live-recalculated ingredient quantities
- Smooth open/close modal interactions

### 🔖 Bookmarks
- Save any recipe to a personal bookmarks collection
- Bookmarks persisted using `localStorage`
- Remove recipes directly from bookmarks

### ➕ Add Recipe
- Upload custom recipes with title, image, publisher, cooking time, servings, and ingredients
- Submitted recipes appear instantly in the results list
- Basic form validation before submission

### 🎨 Custom UI & Motion
- Fully custom-designed dark, elegant interface
- Responsive layout
- Hand-crafted CSS without UI frameworks
- Smooth inertia-based page scrolling (Lenis)
- Sections fade and rise into view on scroll
- Animated gradient accents and glowing card borders

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** — hand-crafted, no CSS frameworks
- **JavaScript (ES6+)** — Vanilla JavaScript, `fetch`, `async/await`
- **Forkify API** — recipe data source
- **Lenis** — smooth scrolling
- **Browser Storage** — `localStorage`

---

## 📁 Project Structure

```
receD/
│
├── index.html            # Main page markup
├── index.css              # All styling and animations
├── script.js               # Search, modal, bookmarks,
│                             # add-recipe logic
└── img/                     # Icons and background images
```

---

## 🚀 Getting Started

This project has no build step or backend, so you can run it directly in your browser.

### 1. Clone the repository
```bash
git clone https://github.com/zarghn/receD
```

### 2. Open the project
You can either:
- Open `index.html` directly in your browser
- Or use the **Live Server** extension in VS Code

---

## 🔑 API Key

Adding a new recipe requires a personal Forkify API key.

> ⚠️ The key currently in `script.js` is a demo/development key meant only for testing. Generate your own key at [forkify-api.jonas.io](https://forkify-api.jonas.io) if you plan to use the add-recipe feature extensively.

---

## ⚠️ Current Limitations

This is a **front-end-only** application built on top of a third-party API.

- No backend or database of my own — all recipe data is fetched from the Forkify API
- Bookmarks are stored only in the browser (`localStorage`), not synced across devices
- No user accounts or authentication
- No server-side validation of submitted recipes
- Recipes added through the "Add Recipe" form are not permanently guaranteed to persist on the API

---

## 🗺️ Roadmap

Future improvements I'd like to make:

- [ ] Add recipe categories and filters (time, ingredients, cuisine)
- [ ] Add a favorites/rating system
- [ ] Improve mobile carousel navigation
- [ ] Add image upload instead of image URL input
- [ ] Add skeleton loaders instead of the spinner
- [ ] Add unit conversion for ingredient quantities
- [ ] Add a dedicated recipe detail page (not just a modal)
- [ ] Improve accessibility (keyboard navigation, ARIA labels)

---

## 📚 What I Practiced

This project helped me practice and understand several JavaScript and front-end concepts, including:

- Fetching data with `fetch` and `async/await`
- Working with a real third-party REST API
- DOM manipulation and dynamic HTML generation
- Event handling and delegation
- Pagination logic
- Form handling and validation
- Browser storage with `localStorage`
- Scroll-driven animations with `IntersectionObserver`
- Integrating a smooth-scroll library (Lenis)
- Writing custom, animated CSS without frameworks

---

## 🙏 Inspired By

The core recipe-fetching logic and some of the functionality are inspired by the **Forkify** project from Jonas Schmedtmann's JavaScript course 2025.

However, this project was rebuilt with:

- A completely different UI and dark visual identity
- Custom CSS, layout, and animations
- My own design choices and interactions
- Smooth scrolling and scroll-reveal effects not present in the original
- Additional experimentation and modifications

This project is primarily an exercise in taking concepts learned from a course and rebuilding them into something more personal.

---

## 📄 License

This project is created for learning and educational purposes.

Feel free to explore the code and use it as inspiration for your own learning projects.
