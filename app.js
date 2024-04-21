const cocktailsCenter = document.querySelector(".cocktails-center");
const input = document.querySelector("#input");

input.addEventListener("input", getData);

function createElement(item) {
    const article = document.createElement("article");
    article.classList.add("cocktail");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const img = document.createElement("img");
    img.src = item.strDrinkThumb;
    img.alt = "";
    imgContainer.appendChild(img);
    article.appendChild(imgContainer);

    const footer = document.createElement("div");
    footer.classList.add("cocktail-footer");
    const title = document.createElement("h3");
    title.textContent = item.strDrink;
    const glass = document.createElement("h4");
    glass.textContent = item.strGlass;
    const alcoholic = document.createElement("p");
    alcoholic.textContent = item.strAlcoholic;
    const detailsBtn = document.createElement("a");
    detailsBtn.classList.add("btn", "btn-primary", "btn-details");
    detailsBtn.href = `about.html/cocktail/${item.idDrink}`;
    detailsBtn.textContent = "Details";
    footer.appendChild(title);
    footer.appendChild(glass);
    footer.appendChild(alcoholic);
    footer.appendChild(detailsBtn);
    article.appendChild(footer);

    cocktailsCenter.appendChild(article);
}

function getData() {
    const searchTerm = input.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
            cocktailsCenter.innerHTML = ""; 
            if (data.drinks) {
                data.drinks.forEach((item) => {
                    createElement(item); 
                });
            } else {
                cocktailsCenter.textContent = "Ma'lumot topilmadi"; 
            }
        })
        .catch((error) => {
            console.error("Ma'lumotlarni olishda xato:", error);
        });
}

// input.value = "a"
