/* Standard fetch for products */
const API_URL = "http://localhost:3000/";

const response = await fetch(`${API_URL}products?_sort=price`);
const productData = await response.json();

console.log(productData);

/* Defining variables for elements */
const productsContainerElement = document.querySelector("#products__main-container");
const categoryFilterContainerElement = document.querySelector("#products-filter__categories");
const priceFilterContainerElement = document.querySelector("#products-filter__price-list");
const manufacturerFilterContainerElement = document.querySelector("#products-filter__manufacturer-list");
const manufacturerContainerElement = document.querySelector("#products-manufacturer__list");
const displayOptionsContainerElement = document.querySelector("#products__display-options");
const itemsTextElement = document.querySelector("#products__items-text");


/* function for changing display the Products container display option */
displayOptionsContainerElement.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target.id === "products__display-flex"){
        productsContainerElement.classList.replace('grid', 'flex')
        console.log("Display products as grid");
    } else if (event.target.id === "products__display-grid"){
        productsContainerElement.classList.replace('flex', 'grid')
        console.log("Display products as flex");
    }
});

itemsTextElement.innerHTML = `${productData.length} Item(s)`


/* Creating the product */
productData.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const productImageElement = document.createElement("img");
    productImageElement.src = product.imageSrc;
    productImageElement.alt = product.category;
    
    const productInformationElement = document.createElement("div");
    productInformationElement.innerHTML = `
    <a href="details.html?product=${product.product_name}" class="product__name">${product.product_name}</a>
    <p class="product__price">£${product.price}</p>
    <button class="product__button">add to cart</button>
    `;

    productElement.appendChild(productImageElement);
    productElement.appendChild(productInformationElement);
});



// Fetches manufacturer data from an API, processes product data to extract unique categories and manufacturers,
// and logs the unique categories and manufacturers to the console.
async function getUniqueData() {
    const response = await fetch(`${API_URL}manufacturers`);
    const manufacturers = await response.json();

    const manufacturerMap = manufacturers.reduce((map, manufacturer) => {
        map[manufacturer.id] = manufacturer.name;
        return map;
    }, {});

    const uniqueValues = productData.reduce((accumulator, product) => {
        if (!accumulator.categories.includes(product.category)) {
            accumulator.categories.push(product.category);
        }
        
        const manufacturerName = manufacturerMap[product.manufacturerId];
        if (!accumulator.manufacturers.includes(manufacturerName)) {
            accumulator.manufacturers.push(manufacturerName);
        }
        return accumulator;
    }, { categories: [], manufacturers: [] });

    const uniqueCategories = uniqueValues.categories;
    const uniqueManufacturers = uniqueValues.manufacturers;
    
    console.log(uniqueCategories);
    console.log(uniqueManufacturers);
}

getUniqueData();