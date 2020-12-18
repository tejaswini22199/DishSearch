var dishname;
var inputEl=document.querySelector('.dishFind');
var singlemeal=document.querySelector('.singleMeal');
var searchbtn=document.querySelector('.search-btn');
var heading=document.querySelector('.heading');
var submit=document.getElementById('submit');
var describe=document.querySelector('.meal-description');
function searchHandler(e)
{
   e.preventDefault();
   dishname=inputEl.value;
   if(dishname.trim())
   {
       var url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishname}`;
       fetch(url)
       .then(response=>response.json())
       .then(json=>
        {
            heading.innerHTML=`<h1>Dishes for ${dishname}</h1>`;
            console.log(json);
            if (json.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
              } else {
                    let output="";
                    json.meals.forEach(element => {
                        output+=`
                        <div>
                        <img src="${element.strMealThumb}">
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
submit.addEventListener('submit',searchHandler);