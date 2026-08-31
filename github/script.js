const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    let targetId = this.getAttribute("href");
    if (targetId === "#" || targetId.length < 2) return;
    let target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();

    let startY = window.scrollY;
    let endY = target.getBoundingClientRect().top + window.scrollY;
    let duration = 900;
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      let elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + (endY - startY) * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
});

let recipeModal = document.querySelector("#recipeModal");
let modalImg = document.querySelector("#modalImg");
let modalTitle = document.querySelector("#modalTitle");
let modalIngredients = document.querySelector("#modalIngredients");
let modalServings = document.querySelector("#modalServings");
let modalTime = document.querySelector("#modalTime");

let recipeCards = document.querySelectorAll(".recipe-card");

recipeCards.forEach(function (card) {
  card.classList.add("hidden");
});

let recipesContainers = document.querySelectorAll(".recipes-cards");
let recipesContainer = recipesContainers[0];
let bookmarksContainer = document.querySelector("#bookmarks .recipes-cards");

let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-field");

let nextBtn = document.querySelector(".next-btn");
let prevBtn = document.querySelector(".prev-btn");

let deleteBtn = document.querySelector("#btnModalDelete");
let bookmarkBtn = document.querySelector("#btnModalSave");

let addRecipeForm = document.querySelector(".add-recipe-form");
let ingredients = document.querySelectorAll(".input-group");

let closeModal = document.querySelector(".btn-close-modal");

let recipes = [];
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

let page = 1;
let perPage = 5;

function updateIngredients(recipeMain, originalServ, newServ) {
  modalIngredients.innerHTML = "";

  recipeMain.ingredients.forEach(function (ingredient) {
    let quantity = ingredient.quantity;

    if (quantity != null) {
      quantity = quantity * (newServ / originalServ);
      quantity = Math.round(quantity * 100) / 100;
    } else {
      quantity = "";
    }

    let li = document.createElement("li");

    li.textContent = `${quantity} ${ingredient.unit} ${ingredient.description}`;

    modalIngredients.appendChild(li);
  });
}

function showLoader() {
  recipesContainer.innerHTML = "";

  let loader = document.createElement("div");

  loader.classList.add("loader");

  recipesContainer.appendChild(loader);
}

async function openRecipe(id, isBookmark = false) {
  try {
    let response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    let data = await response.json();
    let recipeMain = data.data.recipe;

    modalTitle.textContent = recipeMain.title;
    modalImg.src = recipeMain.image_url;
    modalTime.textContent = recipeMain.cooking_time;

    let originalServ = recipeMain.servings;

    modalServings.textContent = originalServ;

    updateIngredients(recipeMain, originalServ, originalServ);

    if (isBookmark) {
      deleteBtn.classList.remove("hidden");
      bookmarkBtn.classList.add("hidden");
    } else {
      deleteBtn.classList.add("hidden");
      bookmarkBtn.classList.remove("hidden");
    }

    let decreaseServ = document.querySelector(".btn-decrease");
    let increaseServ = document.querySelector(".btn-increase");

    decreaseServ.onclick = function () {
      let newServ = Number(modalServings.textContent) - 1;

      if (newServ < 1) return;

      modalServings.textContent = newServ;

      updateIngredients(recipeMain, originalServ, newServ);
    };

    increaseServ.onclick = function () {
      let newServ = Number(modalServings.textContent) + 1;

      modalServings.textContent = newServ;

      updateIngredients(recipeMain, originalServ, newServ);
    };

    bookmarkBtn.onclick = function () {
      if (!bookmarks.some((bookmark) => bookmark.id === recipeMain.id)) {
        bookmarks.push(recipeMain);

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        renderBookmarks();
      }
    };

    deleteBtn.onclick = function () {
      bookmarks = bookmarks.filter(function (bookmark) {
        return bookmark.id !== recipeMain.id;
      });

      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

      renderBookmarks();

      recipeModal.classList.add("hidden");
    };

    recipeModal.classList.remove("hidden");
  } catch (error) {
    alert("Sorry, we have a problem here 😢");
  }
}

searchBtn.addEventListener("click", async function () {
  let query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter a recipe name!");
    return;
  }

  showLoader();

  try {
    let response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes?search=${query}`,
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    let data = await response.json();

    recipes = data.data.recipes;

    if (recipes.length === 0) {
      recipesContainer.innerHTML = "";

      alert("No recipes found 😢");

      return;
    }

    page = 1;

    recipesContainer.innerHTML = "";

    renderRecipes(recipes);
  } catch (error) {
    recipesContainer.innerHTML = "";

    alert("Sorry, we have a problem here 😢");
  }
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

function renderRecipes(recipes) {
  let start = (page - 1) * perPage;
  let end = start + perPage;

  let recipesToShow = recipes.slice(start, end);

  recipesToShow.forEach(function (recipe) {
    let card = document.createElement("div");
    card.classList.add("recipe-card");

    let imgWrapper = document.createElement("div");
    imgWrapper.classList.add("recipe-img-wrapper");

    let img = document.createElement("img");
    img.src = recipe.image_url;

    let title = document.createElement("h3");
    title.classList.add("recipe-title");
    title.textContent = recipe.title;

    imgWrapper.appendChild(img);

    card.appendChild(imgWrapper);
    card.appendChild(title);

    recipesContainer.appendChild(card);

    card.addEventListener("click", function () {
      openRecipe(recipe.id);
    });
  });
}

nextBtn.addEventListener("click", function () {
  if (page < Math.ceil(recipes.length / perPage)) {
    page++;

    recipesContainer.innerHTML = "";

    renderRecipes(recipes);
  }
});

prevBtn.addEventListener("click", function () {
  if (page > 1) {
    page--;

    recipesContainer.innerHTML = "";

    renderRecipes(recipes);
  }
});

function renderBookmarks() {
  bookmarksContainer.innerHTML = "";

  bookmarks.forEach(function (bookmark) {
    let card = document.createElement("div");
    card.classList.add("recipe-card");

    let imgWrapper = document.createElement("div");
    imgWrapper.classList.add("recipe-img-wrapper");

    let img = document.createElement("img");
    img.src = bookmark.image_url;

    let title = document.createElement("h3");
    title.classList.add("recipe-title");
    title.textContent = bookmark.title;

    imgWrapper.appendChild(img);

    card.appendChild(imgWrapper);
    card.appendChild(title);

    bookmarksContainer.appendChild(card);

    card.addEventListener("click", function () {
      openRecipe(bookmark.id, true);
    });
  });
}

closeModal.addEventListener("click", function () {
  recipeModal.classList.add("hidden");
});

recipeModal.addEventListener("click", function (event) {
  if (event.target === recipeModal) {
    recipeModal.classList.add("hidden");
  }
});

renderBookmarks();

addRecipeForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  let newRecipe = {};
  let isValid = true;

  let inputs = addRecipeForm.querySelectorAll("input");

  inputs.forEach(function (input) {
    if (input.value.trim() === "") {
      isValid = false;
    }

    if (input.name === "cooking_time" || input.name === "servings") {
      newRecipe[input.name] = Number(input.value);
    } else {
      newRecipe[input.name] = input.value;
    }
  });

  if (!isValid) {
    alert("Please fill all fields!");
    return;
  }

  let newIngredients = [];

  ingredients.forEach(function (ingredient) {
    let inputs = ingredient.querySelectorAll("input");
    let newIngredient = {};

    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        isValid = false;
      }

      if (input.name === "quantity") {
        newIngredient[input.name] = Number(input.value);
      } else {
        newIngredient[input.name] = input.value;
      }
    });

    newIngredients.push(newIngredient);
  });

  if (!isValid) {
    alert("Please fill all ingredients!");
    return;
  }

  newRecipe.ingredients = newIngredients;

  try {
    let response = await fetch(
      "https://forkify-api.jonas.io/api/v2/recipes?key=d4305a98-3b6d-45ca-af18-14cc94bbcc19",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newRecipe),
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    let data = await response.json();

    recipes.unshift(data.data.recipe);

    page = 1;

    recipesContainer.innerHTML = "";

    renderRecipes(recipes);

    addRecipeForm.reset();
  } catch (error) {
    alert("Sorry, we have a problem here 😢");
  }
});

let observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach(function (section) {
  observer.observe(section);
});
