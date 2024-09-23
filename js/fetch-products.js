// Dynamic list
//fetch products  ✔
// filter
// search bar

/* Standard fetch for products */
const API_URL = 'http://localhost:3000/';

const response = await fetch(`${API_URL}products?_sort=price`);
const productData = await response.json();

console.log(productData);

/* Defining variables for elements */
const productsContainerElement = document.querySelector('#products__main-container');
const categoryFilterContainerElement = document.querySelector('#products-filter__categories');
const priceFilterContainerElement = document.querySelector('#products-filter__price-li');
const manufacturerFilterContainerElement = document.querySelector('#products-filter__manufacturer-list');
const manufacturerContainerElement = document.querySelector('#products-manufacturer__list');
const displayOptionsContainerElement = document.querySelector('#products__display-options');
const itemsTextElement = document.querySelector('#products__items-text');

/* function for changing display the Products container display option */
displayOptionsContainerElement.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.id === 'products__display-flex') {
        productsContainerElement.classList.replace('grid', 'flex');
        console.log('Display products as flex');
    } else if (event.target.id === 'products__display-grid') {
        productsContainerElement.classList.replace('flex', 'grid');
        console.log('Display products as grid');
    }
});

itemsTextElement.innerHTML = `${productData.length} Item(s)`;

/* Creating the product */
// productData.forEach((product) => {
//     const productElement = document.createElement('div');
//     productElement.classList.add('product');

//     const productImageElement = document.createElement('img');
//     productImageElement.src = product.imageSrc;
//     productImageElement.alt = product.category;

//     const productInformationElement = document.createElement('div');
//     productInformationElement.innerHTML = `
//     <a href="details.html?product=${product.title}" class="product__name">${product.title}</a>
//     <p class="product__price">£${product.price}</p>
//     <button class="product__button">add to cart</button>
//     `;

//     productElement.appendChild(productImageElement);
//     productElement.appendChild(productInformationElement);
//     productsContainerElement.appendChild(productElement);
// });

// Fetches manufacturer data from an API, processes product data to extract unique categories and manufacturers,
// and logs the unique categories and manufacturers to the console.
async function getUniqueData() {
    const response = await fetch(`${API_URL}manufacturers`);
    const manufacturers = await response.json();

    const manufacturerMap = manufacturers.reduce((map, manufacturer) => {
        map[manufacturer.id] = manufacturer.name;
        return map;
    }, {});

    const uniqueValues = productData.reduce(
        (accumulator, product) => {
            if (!accumulator.categories.includes(product.category)) {
                accumulator.categories.push(product.category);
            }

            const manufacturerName = manufacturerMap[product.manufacturerId];
            if (!accumulator.manufacturers.includes(manufacturerName)) {
                accumulator.manufacturers.push(manufacturerName);
            }
            return accumulator;
        },
        { categories: [], manufacturers: [] }
    );

    return uniqueValues;
}

getUniqueData().then((uniqueValues) => {
    console.log('Unique categories: ', uniqueValues.categories);
    console.log('Unique manufacturers: ', uniqueValues.manufacturers);

    uniqueValues.categories.forEach((category) => {
        const categoryElement = document.createElement('li');
        categoryElement.textContent = category;
        categoryFilterContainerElement.appendChild(categoryElement);
    });

    uniqueValues.manufacturers.forEach((manufacturer) => {
        const manufacturerElement = document.createElement('li');
        manufacturerElement.textContent = manufacturer;
        manufacturerFilterContainerElement.appendChild(manufacturerElement);
    });

    uniqueValues.manufacturers.forEach((manufacturer) => {
        const manufacturerElement = document.createElement('li');
        manufacturerElement.textContent = manufacturer;
        manufacturerContainerElement.appendChild(manufacturerElement);
    });
});