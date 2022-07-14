let shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem("data")) || [];
/**
 *! generate shop item
 **/

let generateShop = ()=>{
  return (shop.innerHTML= shopItemsData
    .map((x)=>{
    let{ id, name, price, desc, img}=x;
    let search = basket.find((x) => x.id === id) || [];
    return `
    <div class="item">
              <img width="200px"src=${img} alt="">
              <div class="details">
                  <h3>${name}</h3>
                  <p>${desc}</p>
                  <div class="price-quantity">
                      <h2 class="uyuy">$ ${price}</h2>
                      <div class="buttons">
                          <i onclick="decrement(${id})" class="bi bi-dash"></i>
                          <div id=${id} class="quantity">
                            ${search.item === undefined ? 0 : search.item}
                          </div>
                          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                      </div>
                  </div>
              </div>
          </div>
    `;
  }).join(""))
};
generateShop();
/**
 *? increment and decrement function
 **/
/**
 * !increment
 **/
let increment =(id)=>{
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined)
  {
    basket.push({id: selectedItem.id,
    item :1,
  })
}
  else{
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket)); 
  /**
   *?JSON.stringify(basket) ===> to read data in local storage
   **/
  update(selectedItem.id);
};
/**
 * !decrement
 **/

let decrement =(id)=>{
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return; 
  else{
    search.item -= 1;
  }
  update(selectedItem.id);
  basket= basket.filter((x) => x.item !==0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket)); 
};
/**
 * !Update
 **/

let update =(id)=>{
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};
/**
 * ?calculation function
 **/
/**
 * !reduce to add all numbers //console.log(basket.map((x)=>x.item).reduce((x, y) => x + y, 0));  x previous number and y nest number and 0 default value
 **/

let calculation =() => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML =basket.map((x)=>x.item).reduce((x, y) => x + y, 0);
};
calculation();



