const result = document.querySelector("#result");
const list = document.querySelectorAll(".options li");


axios.get('https://fakestoreapi.com/products')
  .then(res => {
    const products = res.data;
    result.innerHTML = '';
    products.forEach((product) => {
      const category = product.category.split(' ')[0].split("'")[0];
      result.innerHTML += `
            <div class="product-card ${category} all">
              <img src="${product.image}" alt="pic" />
              <h6>${product.title}</h6>
              <div class="cost-container d-flex flex-column align-items-center gap-2">
                <p class="price">
                  $${product.price}
                  <span></span>
                </p>
              </div>
              <button>BUY</button>
            </div>
          `;
    });
  }).then(res => {
    const cards = document.querySelectorAll(".product-card");
    list.forEach((listItem) => {
      listItem.addEventListener("click", (e) => {
        list.forEach(item => {
          item.style.color = "#000";
          e.target.style.color = '#00a7c8';
          cards.forEach((card) => {
            card.style.display = "none";
          })
          document.querySelectorAll(e.target.dataset.filter).forEach((card) => {
            card.style.display = 'flex';
          })
        })

      })
    })
  })

searchFilter = async (e) => {
  const productName = await document.querySelectorAll(".product-card h6");
  const text = e.target.value.toLowerCase();

  productName.forEach((product) => {
    const item = product.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      product.parentElement.style.display = "flex";
      // noResult.style.display = "none";
    } else {
      product.parentElement.style.display = "none";
      // noResult.style.display = "block";
    }
  });
}
search.addEventListener("keyup", searchFilter);


