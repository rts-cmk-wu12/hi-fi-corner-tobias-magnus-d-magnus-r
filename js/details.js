const params = new URLSearchParams(window.location.search);
const selectedProduct = params.get('product');

const API_URL = 'http://localhost:3000/';

const productNavigationPath = document.querySelector('#products-pathway');
const productPreview = document.querySelector('#preview-image');
const productName = document.querySelector('#item__name');
const otherProducts = document.querySelector('#see-other-products');
const productDescription = document.querySelector('#item__description');
const productPriceContainer = document.querySelector('#item__price');
const productVariants = document.querySelector('#product-information__variants');

(async () => {
    // fetch products
    const productResponse = await fetch(API_URL + 'products');
    const productData = await productResponse.json();
    console.log(productData);


// Fetch manufacturers
   const manufacturersResponse = await fetch(API_URL + 'manufacturers');
    const manufacturers = await manufacturersResponse.json();
    console.log(manufacturers);
    
    productData.forEach(product => {
        if (product.title == selectedProduct) {
            console.log(product);
            
            // Product Path
            productNavigationPath.innerHTML = `
            <span class="products-pathway__link">home</span>
            <span class="seperator"> / </span>
            <span class="products-pathway__link">${product.category}</span>
            <span class="seperator"> / </span>
            <span class="products-pathway__link products-pathway__link--active">${product.title}</span>`;
    
            // Product Preview
            productPreview.src = product.imageSrc;
    
            // Product Name
            productName.innerHTML = product.title;
            
            // Other Products
            const manufacturer = manufacturers.find(m => m.id === product.manufacturerId);
            const manufacturerName = manufacturer ? manufacturer.name : 'Unknown Manufacturer';
            console.log(manufacturer);
            otherProducts.innerHTML = `
            <p>see other ${manufacturerName} Products </p>`;

            // Product Description
            productDescription.innerHTML = product.description;

            // Product Price
            if (product.discountedPrice) {
                productPriceContainer.innerHTML = `
                <p class="item__name item__price--disabled">£ ${product.price}</p>
                <p class="item__price item__price--enabled">£ ${product.discountedPrice}</p>`;
            } else {
                productPriceContainer.innerHTML = `
                <p class="item__price item__price--enabled">£ ${product.price}</p>`;
            }
        }
    });
})();