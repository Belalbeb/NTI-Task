window.onload = () => Meal('pizza');



let recipeMap = {};

async function Meal(meal) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    const data = await response.json();


    const recipes = data.recipes;

    if (!recipes || recipes.length === 0) {
      document.getElementById("card-container").innerHTML = `<p>No recipes found for "${meal}"</p>`;
      return;
    }

    recipeMap = {};
    let cardsHTML = "";

    recipes.forEach(recipe => {
      recipeMap[recipe.recipe_id] = recipe;
      cardsHTML += `
        <div class="card">
          <img src="${recipe.image_url}" alt="Card Image" class="card-image">
          <div class="card-content">
            <h2 class="card-title">${recipe.title}</h2>
            <p class="card-description">Publisher: ${recipe.publisher}</p>
            <div class="card-buttons">
              <button onclick="window.open('${recipe.source_url}')">Source</button>
              <button onclick="showDetails('${recipe.recipe_id}')">Details</button>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById("card-container").innerHTML = cardsHTML;

  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("card-container").innerHTML = `<p>Error.</p>`;
  }
}

function showDetails(recipeId) {
  const recipe = recipeMap[recipeId];
  if (!recipe) return;
  const content = `
    <img src="${recipe.image_url}" style="width:100%; border-radius:8px;" />
    <h2>${recipe.title}</h2>
    <p><strong>Publisher:</strong> ${recipe.publisher}</p>
    <a href="${recipe.source_url}" target="_blank">View Source</a>
  `;
  document.getElementById("overlay-content").innerHTML = content;
  document.getElementById("details-overlay").classList.remove("hidden");
}

function closeDetails() {
  document.getElementById("details-overlay").classList.add("hidden");
}
