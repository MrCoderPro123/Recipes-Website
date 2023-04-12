(async function () {
    const responce = await fetch("./recipies.json");
    const recipies = await responce.json();

    const btnElem = document.getElementById("searchBtn");
    const inputElem = document.getElementById("searchInput");
    const listElem = document.getElementById("recipeResults");
    const detailElem = document.getElementById("recipeDetails");

    function loadRecipeDetails(recipe) {
        detailElem.innerHTML = `
            <h2 class="title">${recipe.title}</h2>
            <h3>Ingrediants</h3>
            <ul>${recipe.ingredients.map(function (ingredient) {
                return "<li>" + ingredient + "</li>";
            }).join("")}</ul>
            <h3>Instructions:</h3>
            <div>${recipe.instructions}</div>
        
        `;
    }



    function displaySearchResults(results) {
        listElem.innerHTML = "";
        results.forEach(function (recipe) {
            const li = document.createElement("li");
            const listItem = `
                <h2 class="title">${recipe.title}</h2>
                <div class="description">${recipe.description}</div>
            `;
            li.innerHTML = listItem;
            li.addEventListener("click", function () {
                loadRecipeDetails(recipe);
            });
            listElem.appendChild(li);
        });
    }


    function search() {
        const query = inputElem.value.toLowerCase();
        const results = recipies.filter(function (recipe) {
            return (recipe.title.toLowerCase().includes(query) || recipe.ingredients.join(" ").toLowerCase().includes(query));
        });
        displaySearchResults(results);
    }



    btnElem.addEventListener("click", search);
})();