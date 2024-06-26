const cocktailsCenter = document.querySelector(".cocktails-center");
const input = document.querySelector("#input");
const section = document.querySelector('.section')
const cocktailsContainer = document.querySelector('.cocktails-container')

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
    detailsBtn.addEventListener('click', () => getOneItem(item.idDrink))
    // detailsBtn.href = `./about.html?${item.idDrink}`;

    detailsBtn.textContent = "Details";
    footer.appendChild(title);
    footer.appendChild(glass);
    footer.appendChild(alcoholic);
    footer.appendChild(detailsBtn);
    article.appendChild(footer);

    cocktailsCenter.appendChild(article);
}

function getData() {
    const searchTerm = input.value || "a";
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

getData()

function getOneItem(id) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
            cocktailsContainer.style.display = 'none'
            console.log(data?.drinks[0])
            const newData = data?.drinks[0]
            section.innerHTML = `
            <a class="btn btn-primary" href="./index.html">back home</a>
            <h2 class="section-title">${newData.strDrink}</h2>`
        })
        .catch((error) => {
            console.error("Ma'lumotlarni olishda xato:", error);
        });
}
getOneItem()