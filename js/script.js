const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.product-input');
const productList = document.querySelector('.product-list');
const searchWord = document.querySelector('.search-word')

function reset() {
    searchInput.value = '';
}


searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const inputValue = event.target[0].value;


    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`);
    const products = (await data.json()).results.slice(0, 12)
    console.log(products)
    displayItens(products)
})

function displayItens(products){ 
    searchWord.innerHTML = `Resultados para: ${searchInput.value}`
    productList.innerHTML = products.map( product => `
        <a href="${product.permalink}" target="_blank">
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="product-price">${product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
            <p class="product-store">Loja: ${product.seller.nickname}</p>
        </div>
        </a>
        `).join('')
        reset();
}

