
const loadProducts = async () => {
  const url = 'https://fakestoreapi.com/products';
  const res = await fetch(url);
  const data = await res.json();
  showProducts(data);
};


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("single-product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Rating: ${product.rating["rate"]}  Reviews: ${product.rating["count"]}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button data-bs-toggle="modal" data-bs-target="#detail-modal" onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
// add to cart:
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};
// show details of a product:
const loadDetails = async (id) =>{
  document.getElementById('details').textContent = '';
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showDetail(data);
  // console.log('details btn clicked');
}
const showDetail = detail =>{
console.log(detail);
  const singleDetails = document.getElementById('details');
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = 
      `
          <img src="${detail.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title style="font-weight: bold">${detail.category}</h5>
            <p class="card-text">${detail.description}</p>
            <a href="#" class="btn btn-primary">Buy Now</a>
          </div>
        
      `;
      singleDetails.appendChild(div);
  
}
// get input value:
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  // called to update grandTotal:
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
loadProducts();
