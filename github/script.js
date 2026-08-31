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

let recipesContainer = document.querySelector(".recipes-cards");
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-field");

let recipes = [];
let page = 1;
let perPage = 5;

let nextBtn = document.querySelector(".next-btn");
let prevBtn = document.querySelector(".prev-btn");

let bookmarks = [];
let bookmarkBtn = document.querySelector("#btnModalSave");

// SEARCH

searchBtn.addEventListener("click", async function () {
  let query = searchInput.value;

  let response = await fetch(
    `https://forkify-api.jonas.io/api/v2/recipes?search=${query}`,
  );

  let data = await response.json();
  recipes = data.data.recipes;بر
  page = 1;

  recipesContainer.innerHTML = "";

  renderRecipes(recipes);
});

// RENDER RECIPES

function renderRecipes(recipes) {
  let start = (page - 1) * perPage;
  let end = (page - 1) * perPage + perPage;

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

    // OPEN RECIPE (MODAL!)

    card.addEventListener("click", async function () {
      let id = recipe.id;

      let response = await fetch(
        `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
      );

      let data = await response.json();
      let recipeMain = data.data.recipe;

      modalTitle.textContent = recipe.title;
      modalImg.src = recipe.image_url;
      modalTime.textContent = recipeMain.cooking_time;

      let originalServ = recipeMain.servings;
      modalServings.textContent = originalServ;

      function updateIngredients(newServ) {
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

      updateIngredients(originalServ);

      let decreaseServ = document.querySelector(".btn-decrease");

      decreaseServ.addEventListener("click", function () {
        let newServ = Number(modalServings.textContent) - 1;

        if (newServ < 1) return;

        modalServings.textContent = newServ;

        updateIngredients(newServ);
      });

      let increaseServ = document.querySelector(".btn-increase");

      increaseServ.addEventListener("click", function () {
        let newServ = Number(modalServings.textContent) + 1;

        modalServings.textContent = newServ;

        updateIngredients(newServ);
      });

      recipeModal.classList.remove("hidden");
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

let closeModal = document.querySelector(".btn-close-modal");

closeModal.addEventListener("click", function () {
  recipeModal.classList.add("hidden");
});

recipeModal.addEventListener("click", function (event) {
  if (event.target === recipeModal) {
    recipeModal.classList.add("hidden");
  }
});
