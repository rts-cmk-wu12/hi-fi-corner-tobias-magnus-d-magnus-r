// Dynamic list ✔
// fetch products  ✔


/*  Standard fetch for products  */
const API_URL = 'http://localhost:3000/';

const response = await fetch(`${API_URL}products?_sort=price`);
const productData = await response.json();

console.log(productData);

/*  Defining variables for elements */
const productsContainerElement = document.querySelector('#products__main-container');
const categoryFilterContainerElement = document.querySelector('#products-filter__categories');
const priceFilterContainerElement = document.querySelector('#products-filter__price-list');
const manufacturerFilterContainerElement = document.querySelector('#products-filter__manufacturer-list');
const manufacturerContainerElement = document.querySelector('#products-manufacturer__list');
const displayOptionsContainerElement = document.querySelector('#products__display-options');
const itemsTextElement = document.querySelector('#products__items-text');

/* function for changing display the Products container display option */
displayOptionsContainerElement.addEventListener('click', (event) => {
    console.log(event.target);

    if (event.target.id === 'products__display-flex'||'products__display-grid') {
        document.querySelectorAll('.products__display-icon').forEach((icon) => {
            icon.classList.remove('products__display-icon--active');
        });
    }

    if (event.target.id === 'products__display-flex') {
        productsContainerElement.classList.replace('grid', 'flex');
        event.target.classList.add('products__display-icon--active');
        console.log('Display products as flex');
    } else if (event.target.id === 'products__display-grid') {
        productsContainerElement.classList.replace('flex', 'grid');
        event.target.classList.add('products__display-icon--active');
        console.log('Display products as grid');
    }
});

itemsTextElement.innerHTML = `${productData.length} Item(s)`;

/*  Creating the product  */
productData.forEach((product) => {
    const productContainer = document.createElement('article');
    productContainer.classList.add('product');

    productContainer.innerHTML = `
    <img src="${product.imageSrc}" alt="${product.category}" class="product__image">
        <div>
            <a href="itemview.html?product=${product.title}" class="product__name">${product.title}</a>
            <p class="product__price">£${product.price}</p>
            <button onclick="addProduct(this)" class="product__button">add to cart</button>
        </div>`

    productsContainerElement.appendChild(productContainer);
})

/*  Fetches manufacturer data from an API, processes product data to extract unique categories and manufacturers,
 and logs the unique categories and manufacturers to the console. */
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
                accumulator.manufacturerCounts[manufacturerName] = 0;
            }
            accumulator.manufacturerCounts[manufacturerName]++;
            return accumulator;
        },
        { categories: [], manufacturers: [], manufacturerCounts: {} }
    );

    return uniqueValues;
}

getUniqueData().then((uniqueValues) => {
    console.log('Unique categories: ', uniqueValues.categories);
    console.log('Unique manufacturers: ', uniqueValues.manufacturers);
    console.log('Manufacturer counts: ', uniqueValues.manufacturerCounts);

/*      left category list */
    uniqueValues.categories.forEach((category) => {
        const categoryElement = document.createElement('li');
        categoryElement.textContent = category;
        categoryElement.classList.add('products-filter__item');
        categoryFilterContainerElement.appendChild(categoryElement);
    });

/*      left manufacture list */
    uniqueValues.manufacturers.forEach((manufacturer) => {
        const manufacturerElement = document.createElement('li');
        const count = uniqueValues.manufacturerCounts[manufacturer];
        manufacturerElement.textContent = manufacturer + ` (${count})`;
        manufacturerElement.classList.add('products-filter__item');
        manufacturerFilterContainerElement.appendChild(manufacturerElement);
    });

 /*     right manufacture list */
    const maxVisibleManufacturers = 7;
    let showAllManufacturers = false;

    const updateManufacturerList = () => {
        manufacturerContainerElement.innerHTML = '';
        const manufacturersToShow = showAllManufacturers ? uniqueValues.manufacturers : uniqueValues.manufacturers.slice(0, maxVisibleManufacturers);

        manufacturersToShow.forEach((manufacturer) => {
            const manufacturerElement = document.createElement('li');
            manufacturerElement.textContent = manufacturer;
            manufacturerElement.classList.add('products-manufacturer__item');
            manufacturerContainerElement.appendChild(manufacturerElement);
        });

        const buttonElement = document.querySelector('#products-manufacturer__button');
        buttonElement.textContent = showAllManufacturers ? 'View Less' : 'View All';
    };

    document.querySelector('#products-manufacturer__button').addEventListener('click', () => {
        showAllManufacturers = !showAllManufacturers;
        updateManufacturerList();
    });

    updateManufacturerList();
});

