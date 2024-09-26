const params = new URLSearchParams(window.location.search);
const chosenCategory = params.get('category');
const chosenManufacturer = params.get('manufacturer');

const API_URL = 'http://localhost:3000/';
let sort = 'price';
let order = 'asc';
let limit = '34';
let productFilter = 'products/home';

const productsContainerElement = document.querySelector('#products__main-container');
const categoryFilterContainerElement = document.querySelector('#products-filter__categories');
const priceFilterContainerElement = document.querySelector('#products-filter__price-list');
const manufacturerFilterContainerElement = document.querySelector('.products-filter__manufacturer-list');
const itemsTextElement = document.querySelector('#products__items-text');
const categoryHeading = document.querySelector('#products__title');
const productNavigationContainerElement = document.querySelector('#products-pathway');
const SorterSelecter = document.querySelector('#products__sorting-select');
const limiterSelecter = document.querySelector('#products__limiter');
const searchInput = document.querySelector('#header__search-input');

if (chosenCategory) {
    categoryHeading.innerHTML = chosenCategory;
    if (chosenCategory !== 'all') {
        productFilter = `products/category/${chosenCategory}`;
        productNavigationContainerElement.innerHTML = `
        <span class="products-pathway__link">home</span>
        <span class="seperator"> / </span>
        <span class="products-pathway__link products-pathway__link--active">${chosenCategory}</span>`
    }
    fetchProducts()
}

if (chosenManufacturer) {
    productFilter = `products/manufacturer/${chosenManufacturer}`;
    fetchProducts()
}

SorterSelecter.addEventListener('change', (e) => {
    if (e.target.value == 'Price: Ascending') {
        sort = 'price';
        order = 'asc';
        fetchProducts()
    }
    else if (e.target.value == 'Price: Descending') {
        sort = 'price';
        order = 'desc';
        fetchProducts()
    }
    else if (e.target.value == 'Name: A-Z') {
        sort = 'product_name';
        order = 'asc';
        fetchProducts()
    }
    else if (e.target.value == 'Name: Z-A') {
        sort = 'product_name';
        order = 'desc';
        fetchProducts()
    }
})

limiterSelecter.addEventListener('change', (e) => {
    limit = e.target.value;
    fetchProducts()
})

categoryFilterContainerElement.addEventListener('click', (e) => {
    productFilter = `products/category/${e.target.innerHTML}`
    categoryHeading.innerHTML = e.target.innerHTML;
    productNavigationContainerElement.innerHTML = `
    <span class="products-pathway__link">home</span>
    <span class="seperator"> / </span>
    <span class="products-pathway__link products-pathway__link--active">${e.target.innerHTML}</span>`
    fetchProducts()
})

priceFilterContainerElement.addEventListener('click', (e) => {
    const priceElement = e.target.closest('li')
        productFilter = `products/price/lowest/${priceElement.children[0].innerHTML}/highest/${priceElement.lastChild.innerHTML}`
        categoryHeading.innerHTML = 'all';
        productNavigationContainerElement.innerHTML = `
        <span class="products-pathway__link">home</span>
        <span class="seperator"> / </span>
        <span class="products-pathway__link products-pathway__link--active">${priceElement.innerHTML}</span>`
        fetchProducts()
    
})

manufacturerFilterContainerElement.addEventListener('click', async (e) => {
    const manufacturerName = e.target.innerHTML.split(' ')[0]; // Extract the manufacturer name
    console.log(manufacturerName);

    const response = await fetch(API_URL + 'manufacturers');
    const manufacturers = await response.json();

    const manufacturer = manufacturers.find(m => m.name.toLowerCase() === manufacturerName.toLowerCase());

    if (manufacturer) {
        productFilter = `products/manufacturerId/${manufacturer.id}`;
        console.log(productFilter);
        categoryHeading.innerHTML = 'all';
        productNavigationContainerElement.innerHTML = `
        <span class="products-pathway__link">home</span>
        <span class="seperator"> / </span>
        <span class="products-pathway__link products-pathway__link--active">${manufacturerName}</span>`;
        fetchProducts();
    } else {
        console.error('Manufacturer not found');
    }
});

productNavigationContainerElement.addEventListener('click', (e) => {
    if (e.target.innerHTML == 'home') {
        productFilter = 'products/home'
        categoryHeading.innerHTML = 'all';
        productNavigationContainerElement.innerHTML = `
        <span class="products-pathway__link">home</span>`
        fetchProducts()
    }
})

async function fetchProducts(query = '') {
    const response = await fetch(API_URL + productFilter + `&_sort=${sort}&_order=${order}&_limit=${limit}&q=` + query);
    const productData = await response.json();
    console.log(productData)
    productsContainerElement.textContent = '';

    productData.forEach((product) => {
        const productContainer = document.createElement('article');
        productContainer.classList.add('product');

        productContainer.innerHTML = `
        <img src="${product.imageSrc}" alt="${product.category}" class="product__image">
            <div>
                <a href="details.html?product=${product.title}" class="product__name">${product.title}</a>
                <p class="product__price">£${product.price}</p>
                <button onclick="addProduct(this)" class="product__button">add to cart</button>
            </div>`

        productsContainerElement.appendChild(productContainer);
    })

    itemsTextElement.innerHTML = `${productData.length} Item(s)`
}

searchInput.addEventListener('input', (e) => {
    fetchProducts(e.target.value);
})