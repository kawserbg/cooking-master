const searchMealName = document.getElementById('search-meal');
const search = document.getElementById('search');
const singleMealItem = document.getElementById('single-meal-item');

// Function for display single meal detail
const singleMeal = mealName => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            singleMealDetail(data);
        });

    const singleMealDetail = meal => {

        meal = meal.meals[0];

        const div = document.createElement('div');

        div.innerHTML = `
                <div class="single-meal">
                    <img src="${meal.strMealThumb}" alt="">
                    <div class="meal-detail">
                        <h3>${meal.strMeal}</h3>
                        <h4>Ingredients</h4>
                        <p><i class="fas fa-check-square"></i> ${meal.strMeasure1} ${meal.strIngredient1}</p>
                        <p><i class="fas fa-check-square"></i> ${meal.strMeasure2} ${meal.strIngredient2}</p>
                        <p><i class="fas fa-check-square"></i> ${meal.strMeasure3} ${meal.strIngredient3}</p>
                        <p><i class="fas fa-check-square"></i> ${meal.strMeasure4} ${meal.strIngredient4}</p>
                        <p><i class="fas fa-check-square"></i> ${meal.strMeasure5} ${meal.strIngredient5}</p>
                        <p><i class="fas fa-check-square"></i> ${meal.strMeasure6} ${meal.strIngredient6}</p>
                    </div>
                </div>
            `;

        singleMealItem.innerHTML = div.innerHTML;

    }
}

// Event listener for search meals recipe
search.addEventListener('click', () => {

    const mealList = document.getElementById('meals-list');
    const errorTxt = document.getElementById('error');

    singleMealItem.innerHTML = "";

    if (searchMealName.value == '') {
        mealList.innerHTML = "";
        errorTxt.innerText = 'Search field must not be empty.';
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMealName.value}`)
            .then(response => response.json())
            .then(data => {
                showMealsList(data);
            })
            .catch(error => {
                errorTxt.innerText = "Sorry! We did not find your recipe.";
            })

        const showMealsList = mealResult => {

            mealList.innerHTML = "";
            error.innerText = "";

            mealResult.meals.forEach(meal => {
                const div = document.createElement('div');

                div.innerHTML = `<div class="list-meal-item" onclick="singleMeal('${meal.strMeal}');">
                                <img src="${meal.strMealThumb}" alt="">
                                <h3>${meal.strMeal}</h3>
                                </div>`;

                mealList.appendChild(div);
            });
        }

        searchMealName.value = "";
    }
})
