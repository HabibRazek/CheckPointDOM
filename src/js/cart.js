let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation =() => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML =basket.map((x)=>x.item).reduce((x, y) => x + y, 0);
};
calculation();
/**
 * ! generate cart items
 **/

let GenerateCartItems = () => {
    if(basket.length !== 0){
        ShoppingCart.innerHTML=basket.map((x)=>{
            console.log(x);
            let {id,item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return`
            <div class="cart-item">
                <img width="115px" height="130px" src="${search.img}" alt="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x"> </i>
                    </div>
                    <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                        <div class="test">
                            <h3>$ ${item *search.price}</h3>
                            <span>Love it :   </span>  <i class="bi bi-heart-fill"></i>
                        </div>

                        
                </div>
            </div>
            `;
        }).join("");
    }
    else{
        ShoppingCart.innerHTML= ``
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
};
GenerateCartItems();
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
    GenerateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket)); 
    /**
     *?JSON.stringify(basket) ===> to read data in local storage
    **/
    };
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
    GenerateCartItems();
    localStorage.setItem("data", JSON.stringify(basket)); 
    };
    let update =(id)=>{
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
    };
    let removeItem = (id)=>{
        let selectedItem= id;
        basket= basket.filter((x) => x.id !== selectedItem.id);
        GenerateCartItems();
        TotalAmount();
        localStorage.setItem("data", JSON.stringify(basket)); 
    };
    let clearCart = () => {
        basket =[];
        GenerateCartItems();
        localStorage.setItem("data", JSON.stringify(basket)); 
    };
    let TotalAmount = ()=>{
        if (basket.length !== 0){
            let amount = basket.map((x) => {
                let {item,id }= x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return item * search.price;
            }).reduce((x,y)=> x + y, 0);
            // console.log(amount);
            label.innerHTML=`
            <h2>Total: $ ${amount}</h2>
            <button class="Checkout">Checkout</button>
            <button onclick="clearCart()" class="Remove">Clear</button>
            `
        } else return;
    };
    TotalAmount();

let likeBTN=document.querySelectorAll('.bi-heart-fill');
    for (let likes of likeBTN){
        likes.addEventListener('click', function turnRed() {
            if(likes.style.color == "red"){
                likes.style.color = "";
            }else{
                likes.style.color = "red";
            }
    })
};
