let recipeModal = document.querySelector("#recipeModal");
let modalImg = document.querySelector("#modalImg");
let modalTitle = document.querySelector("#modalTitle");
let modalIngredients = document.querySelector("#modalIngredients");
let modalServings = document.querySelector("#modalServings");
let modalTime = document.querySelector("#modalTime");

// let data = await response.json();
// modalTitle.textContent = recipe.title;
// modalImg.src = recipe.image_url;
// modalTime.textContent = recipe.cooking_time;
// modalServings.textContent = recipe.servings;

let recipeCards = document.querySelectorAll(".recipe-card");
// recipeCards.forEach((card) => {
//   card.addEventListener("click", function () {});
// });

let loadRecipes = async function () {
  let response = await fetch(
    "https://forkify-api.jonas.io/api/v2/recipes?search=pizza",
  );
  let data = await response.json();
  let recipes = data.data.recipes;

  console.log(recipes);

  recipes.forEach((recipe, index) => {
    let card = recipeCards[index];
    let img = card.querySelector("img");
    let title = card.querySelector(".recipe-title");
    img.src = recipe.image_url;
    title.textContent = recipe.title;

    card.addEventListener("click", async function () {
      let id = recipe.id;

      let response = await fetch(
        `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
      );
      let data = await response.json();

      let recipeMain = data.data.recipe;

      modalTitle.textContent = recipe.title;
      modalImg.src = recipe.image_url;
      modalTime.textContent = recipe.cooking_time;
      modalServings.textContent = recipeMain.servings;

      recipeModal.classList.remove("hidden");
      modalIngredients.innerHTML = "";

      recipeMain.ingredients.forEach(function (ingredient) {
        let li = document.createElement("li");

        li.textContent = `${ingredient.quantity}${ingredient.unit} ${ingredient.description}`;
        modalIngredients.appendChild(li);
      });
    });
  });
};
loadRecipes();
