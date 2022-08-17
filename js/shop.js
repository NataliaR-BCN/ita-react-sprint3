"use strict";

let counter = 0; 

// Array with products (objects) added directly with push(). Products in this array are repeated.
const cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart = [];

let total = 0;

let totalItemsCart = 0;

//Generic functions

//Find product in array and return its index
function findIndexProduct(array, id) {
   
    let arrayLength = array.length;
    let i;

    for (i = 0; i < arrayLength; i++) {
        if (array[i].id === id) {
            return i;
        }
    }

    return -1;
}


//Updates the cart number:
function updateItemsCart() {
    
    let counterHtml =  document.getElementById('count_product');

    totalItemsCart = 0;

    let arrayCartLength = cart.length;

    if (arrayCartLength !== 0) {
        
        for (let i = 0; i < arrayCartLength; i++) {
            totalItemsCart += cart[i].quantity;
        }
    }

    counterHtml.innerHTML = totalItemsCart;

}


function checkCartContent() {

    if (cart.length !== 0) {
        document.getElementById('cart-empty').className = "d-none";
        document.getElementById('cart-full').className = "d-block";
        printCart();

    } else {
        document.getElementById('cart-empty').className = "d-block";
        document.getElementById('cart-full').className = "d-none";
    }
    
}


//Auxiliar functions to evaluate exercises 1 - 5:
function viewcartList() {
    console.log("The cartList array contains the next products:" , cartList);
}


// Exercise 1
function buy(id) {

    // 1. Loop for to the array products to get the item to add to cart

    let indexProduct, purchasedProduct;

    indexProduct = findIndexProduct(products, id);

    purchasedProduct = products[indexProduct];

    // 2. Add found product to the cartList array

    cartList.push(purchasedProduct);

    //Updates the Cart number:
    document.getElementById('count_product').innerHTML = cartList.length;
}


// Exercise 2
function cleanCart() {

    cartList.length = 0;
   
    //cartList = []; not available when using const.  

    //From exercise 8 on - activated by button in My Cart:
    
    //cart = [];

    cart.length = 0;

    sessionStorage.clear();

    checkCartContent();
   
    updateItemsCart();

}


// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array

    let arrayCartListLength = cartList.length;
    let i;
    let value = 0;

    for (i = 0; i < arrayCartListLength; i++) {   
        value = cartList[i].price; 
        total += value;
    }

    //Result on the console:
    console.log("Total price of products in the cartList array: ", total);

}


// Exercise 4
function generateCart() {
    /* Using the "cartlist" array that contains all the items in the shopping cart, 
    generate the "cart" array that does not contain repeated items, 
    instead each item of this array "cart" shows the quantity of product. */

    cart = [];

    let arrayCartListLength = cartList.length;
  
    let i = 0;
    let j;
    let arrayCartLength = cart.length;

    //Insert the first item of cartList in cart:
    if (arrayCartLength === 0) {
        cartList[i].quantity = 1;
        cartList[i].subtotal = cartList[i].price;
        cartList[i].subtotalWithDiscount = cartList[i].subtotal; 
        cart.push(cartList[i]); 
    }

    //Insert other items (from index 1):
    for (i = 1; i < arrayCartListLength; i++) {
   
        let idProduct = cartList[i].id;
        let productExists = false;
 
        for (j = 0; j < cart.length; j++) { 

            if (idProduct === cart[j].id) {
                cart[j].quantity++;
                cart[j].subtotal += cart[j].price;
                cart[j].subtotalWithDiscount = cart[j].subtotal;  
                productExists = true;
                break;
            }            
        }   
            
        if (!productExists) { 
            cartList[i].quantity = 1;
            cartList[i].subtotal = cartList[i].price;
            cartList[i].subtotalWithDiscount = cartList[i].subtotal;  
            cart.push(cartList[i]); 
        }
    }

    console.log("The new cart array contains the next products:" , cart);
}


// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    //1. Search for products with discounts (Oil and Cupcake mixture) in cart:
    let iOil =  findIndexProduct(cart, 1);

    let iCupcake =  findIndexProduct(cart, 3);

    //2. Check if promotions conditions apply: 
    if (iOil !== -1 && cart[iOil].quantity >= 3) {
        cart[iOil].subtotalWithDiscount = 10 * cart[iOil].quantity;
    }

    if (iCupcake !== -1 && cart[iCupcake].quantity >= 10) {
        cart[iCupcake].subtotalWithDiscount = Number(((cart[iCupcake].price * cart[iCupcake].quantity) * 2/3).toFixed(2));
    }

    console.log("The cart shows promos in Oil and Cupcakes subtotalWithDiscount:", cart);
}


// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom //

    let myCartList = document.getElementById('cart_list');

    myCartList.innerHTML = '';
    
    applyPromotionsCart();

    cart.sort(function(a, b){return a.id - b.id}); 

    let arrayCartLength = cart.length;
    let totalPrice = 0;

    for (let i = 0; i < arrayCartLength; i++) {

        myCartList.innerHTML += `<tr>
                            <th scope="row" class="align-middle">${cart[i].name}</th>
                            <td class="align-middle">$${cart[i].price}</td>
                            <td class="align-middle text-center">${cart[i].quantity}</td>
                            <td class="align-middle px-0"><i class="fa fa-plus-square" onclick="addFromCart(${cart[i].id})"></i> <br/><i class="fa fa-minus-square" onclick="removeFromCart(${cart[i].id})"></i></td>
                            <td class="align-middle"><span class="ps-3">$${cart[i].subtotalWithDiscount}</span></td>
                            </tr>`;

        totalPrice += cart[i].subtotalWithDiscount;                     
    }
   
    document.getElementById('total_price').innerHTML = totalPrice.toFixed(2); 

    if ( document.URL.includes("checkout.html") ) {
        promoOil();
        promoCupcake();
    }
}

// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 

    // 1. Loop for to the array products to get the item to add to cart

    let indexProduct, newPurchasedProduct;

    indexProduct = findIndexProduct(products, id);

    newPurchasedProduct = products[indexProduct];

    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    let j;
    let arrayCartLength = cart.length;
    let productUpdated = false;

    if (arrayCartLength === 0) { //Add first product
        newPurchasedProduct.quantity = 1;
        newPurchasedProduct.subtotal = newPurchasedProduct.price;
        newPurchasedProduct.subtotalWithDiscount = newPurchasedProduct.subtotal;
        cart.push(newPurchasedProduct);
    } else {
        for (j = 0; j < arrayCartLength; j++) { //Update product
            if (cart[j].id === newPurchasedProduct.id) {
                cart[j].quantity++;
                cart[j].subtotal += cart[j].price;
                cart[j].subtotalWithDiscount = cart[j].subtotal;
                productUpdated = true;
                break;
            } 
        }
        
        if (!productUpdated) { //Add new product
            newPurchasedProduct.quantity = 1;
            newPurchasedProduct.subtotal = newPurchasedProduct.price;
            newPurchasedProduct.subtotalWithDiscount = newPurchasedProduct.subtotal;
            cart.push(newPurchasedProduct);
        }
    }
 
    //Updates the Cart number (!after is added to cart):
    updateItemsCart();
}


// Exerxise 9 complement
function addFromCart(id) {
    addToCart(id);  
    printCart();
}


// Exercise 9
function removeFromCart(id) {

    // 1. Loop for to the array cart to get the item to remove from cart
    
    let indexProduct, selectedProduct;

    indexProduct = findIndexProduct(cart, id);

    selectedProduct = cart[indexProduct];

    // 2. Decrease quantity or remove found product from the cart array 
    if (selectedProduct.quantity !== 1) {
        selectedProduct.quantity--;
        selectedProduct.subtotal -= selectedProduct.price;
        selectedProduct.subtotalWithDiscount = selectedProduct.subtotal;
    } else {
        cart.splice(indexProduct, 1);
        checkCartContent(); 
    }

    updateItemsCart();

    printCart();

}


/* Functions to save and recover info into pages */

//Save cart data on sessionStorage before exit page:
function goToNextPage() {

    //Save info to sessionStorage to be accessible from next page:

    let arrayCartInJson = JSON.stringify(cart);

    sessionStorage.setItem('arrayCart', arrayCartInJson);
    sessionStorage.setItem('numberItemsCart', totalItemsCart);

}


//Recover cart data from sessionStorage:
function recoverCart() {

    let newCart = sessionStorage.getItem('arrayCart');

    const temporaryCart = JSON.parse(newCart);

    let tCartLength = temporaryCart.length;
    
    cart.length = 0;

    for (let i = 0; i < tCartLength ; i++) {
        let value = temporaryCart[i];
        cart.push(value);
    }

    totalItemsCart  = sessionStorage.getItem('numberItemsCart');

    document.getElementById('count_product').innerHTML = totalItemsCart;

    printCart();
  
    if (document.URL.includes("checkout.html")) {
        promoOil();
        promoCupcake(); 
    }
}

//Check data saved in sessionStorage:
function checkStorage() {
    if (sessionStorage.getItem('arrayCart')) {
        recoverCart();
    }     

    updateItemsCart();
}


function open_modal() {
	console.log("Open Modal");

    checkCartContent();

}