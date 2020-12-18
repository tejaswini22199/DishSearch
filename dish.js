var dishname;
var inputEl=document.querySelector('.dishFind');
var singlemeal=document.querySelector('.singleMeal');
var searchbtn=document.querySelector('.search-btn');
var submit=document.getElementById('submit');
var describe=document.querySelector('.meal-list');
var random=document.querySelector('#random');
function searchHandler(e)
{
    
   e.preventDefault();
   singlemeal.innerHTML='';
   dishname=inputEl.value;
   if(dishname.trim())
   {
       var url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishname}`;
       fetch(url)
       .then(response=>response.json())
       .then(json=>
        {
            console.log(json);
            if (json.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
              } else {
                    let output="";
                    json.meals.forEach(element => {
                        output+=`
                        <div>
                        <img class="image-dish" src="${element.strMealThumb}">
                        <div class="meal-info" data-mealID="${element.idMeal}">
                        <h3>${element.strMeal}</h3>
                        </div>
                       
                        </div>`
              })
              describe.innerHTML=output;
            }
            
        }

       )
       inputEl.value='';
   }
   else
   {
       alert('enter any item to start with');
   }
}
function randomHandler()
{
    describe.innerHTML = '';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response=>response.json())
    .then(json=>
        {
            AddmealToUI(json.meals[0]);
        })
}
function AddmealToUI(meal)
{
    let ingredients=[];
    for(let i=1;i<=20;i++)
    {
        if(meal[`strIngredient${i}`])
        {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
              );
            
        }
        else break;
    }


    singlemeal.innerHTML=`
    <h1>${meal.strMeal}</h1>
    <div class="mainImg">
    <img src="${meal.strMealThumb}">
    <div>
    <h1>Ingredients</h1>
    <ul>
    ${ingredients.map((ing) =>
        `<li>${ing}</li>`).join('')};
    </ul>
    </div>
    </div>
    <div>
    <h1>It is a ${meal.strArea} food</h1>
    <p>${meal.strInstructions}</p>
    <button><a href="${meal.strYoutube}">Watch</a></button>
    <div/>
    `
    
        
}
submit.addEventListener('submit',searchHandler);
random.addEventListener('click',randomHandler);