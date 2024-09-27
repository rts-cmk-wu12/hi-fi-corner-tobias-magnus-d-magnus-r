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
const moreViews = document.querySelector('#moreviews__image-container');
const productTable = document.querySelector('#product-table');

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

            // Product tableData
            productTable.innerHTML = `
            <tr>
                <th class="product-additional-info__table-heading">manufacturer</th>
                <td class="product-additional-info__table-data">${manufacturerName}</td>
              </tr>
              <tr>
                <th class="product-additional-info__table-heading">manufacturer link</th>
                <td class="product-additional-info__table-data">${product.specifications.manufacturerLink}</td>
              </tr>
              <tr>
              <th class="product-additional-info__table-heading">free warranty</th>
              <td class="product-additional-info__table-data">${product.specifications.warrantyYears + ' Years'}</td>
              </tr>
              <tr>
              <th class="product-additional-info__table-heading">delivery charge</th>
              <td class="product-additional-info__table-data">${product.specifications.deliveryFee}</td>
              </tr>
              <tr>
              <th class="product-additional-info__table-heading">delivery time</th>
              <td class="product-additional-info__table-data">${product.specifications.deliveryTime}</td>
              </tr>
              <tr>
              <th class="product-additional-info__table-heading">card surcharges</th>
              <td class="product-additional-info__table-data">${product.specifications.cardSurcharges}</td>
              </tr>
              `;
            // functionality to display product variants/colors
            const moreViewsContainerElement = document.querySelector('.item__more-views');
            const colors = product.colors;
            const productForm = document.querySelector('#product-form');
            if (colors) {
                const staticLabels = `
                <label class="item__color--brown option__finish">Finish<span class="options__required"> *</span></label>
                <label class="item__color--red"><span class="options__required">* </span>Required Fields</label>`;

                while (productForm.children.length > 1) {
                    productForm.removeChild(productForm.firstChild);
                }

                const labelContainer = document.createElement('div');
                labelContainer.classList.add('option__button-container');


                colors.forEach(color => {
                    moreViews.innerHTML += `
                    <img src="${color.imageSrc}" alt="product image" class="moreviews__image">
                    `;

                    // form options
                    const labelOptions = document.createElement('label');
                    labelOptions.classList.add('option__button')
                    labelOptions.setAttribute('for', color.color);
                    labelOptions.innerHTML = `<input name="optionResult" id="${color.color}" type="radio" required>${color.color}`;
                    labelContainer.appendChild(labelOptions);
                });

                productForm.insertAdjacentHTML('afterbegin', staticLabels);
                productForm.insertBefore(labelContainer, productForm.lastChild);
                console.log(labelContainer)

                labelContainer.addEventListener('click', (e) => {
                    if (e.target.tagName === 'INPUT') {
                        const selectedColor = colors.find(color => color.color === e.target.id);
                        productPreview.src = selectedColor.imageSrc;
                    }
                });
                
            } else {
                moreViewsContainerElement.style.display = 'none';
                while (productForm.children.length > 1) {
                    productForm.removeChild(productForm.firstChild);
                }
            };

            moreViewsContainerElement.addEventListener('click', (e) => {
                if (e.target.tagName === 'IMG') {
                    productPreview.src = e.target.src;
                }
            });
        }
    });
})();