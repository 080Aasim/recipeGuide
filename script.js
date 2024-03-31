const searchBtn = document.getElementById("Search-btn");
const image = document.getElementById("image");
const mealInfo= document.getElementById("meal-info");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


searchBtn.addEventListener("click",()=>{
    const input = document.getElementById("inp").value;
    if(input.length == 0){
        mealInfo.innerHTML = `<h3> Invalid input </h3>`
    }
    else{
        fetch(url + input).then(res => res.json()).then((data) =>{
            let myMeal = data.meals[0];
            image.innerHTML = `
            <img src="${myMeal.strMealThumb}" alt="">
            `;
            mealInfo.innerHTML = `
            <h2 id="meal-name">${myMeal.strMeal}</h2>
            <h4 id="meal-origin">${myMeal.strArea}</h4>
            `;
            
            let count = 1;
            let ingredients = [];
            console.log(ingredients);
            for( let i in myMeal){
                let ingredient = "";
                let measure = "";
                if(i.startsWith("strIngredient") && myMeal[i]){
                    ingredient = myMeal[i];
                    measure = myMeal[`strMeasure` + count];
                    count += 1;
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
            const ingBox = document.getElementById("ing-box");
            ingBox.innerHTML = `
                <div class="ingred" id="ingred"></div>
            `;
            
            const mealIng = document.getElementById("ingred");
            let parent = document.createElement("ul");
            ingredients.forEach((i)=>{
                let child = document.createElement("li");
                child.innerHTML = i;
                parent.appendChild(child);
                mealIng.appendChild(parent);
            });
            console.log(mealIng);
    
            const recipeBtn = document.getElementById("btn");
            recipeBtn.addEventListener("click",()=>{
                const recipe = document.getElementById("recipe");
                const recipeDetails = document.getElementById("recipe-details");
                recipe.style.display = "block";
                recipeDetails.innerText = data.meals[0].strInstructions;
            });

                
            const closeBtn = document.getElementById("close");
            closeBtn.addEventListener("click",()=>{
                recipe.style.display = "none";
            });
            
            
        });

    }
});
