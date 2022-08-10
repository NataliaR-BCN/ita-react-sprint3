'use strict'

// Exercise 7
function validate() {

    let error = 0;

    // All fields are valid by default:
    let allFeedbacks = document.querySelectorAll("input ~ div");
    let allInputs = document.querySelectorAll("input");

    for ( let i = 0; i < allFeedbacks.length; i++) {
        allFeedbacks[i].classList.replace("d-block", "d-none");
    }

    for ( let i = 0; i < allInputs.length; i++) {
        allInputs[i].className = "form-control is-valid";
    }

	// Get the input fields
	let fName = document.getElementById("fName");
    let fEmail = document.getElementById("fEmail");
    let fAddress = document.getElementById("fAddress");
    let fLastN = document.getElementById("fLastN");
    let fPassword = document.getElementById("fPassword");
    let fPhone = document.getElementById("fPhone");

	// Get the error elements
	let errorName = document.getElementById("errorName");
    let errorEmail = document.getElementById("errorEmail"); 
    let errorAddress = document.getElementById("errorAddress");
    let errorLastN = document.getElementById("errorLastN");
    let errorPassword = document.getElementById("errorPassword");
	let errorPhone = document.getElementById("errorPhone");

    //Patterns for validation:
    let patternLettersOnly = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s*]{3,}$/; //Includes compound names (with space), accents and ñ
    let patternMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let patternPassword = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]{4,8}$/;
    let patternNumbersOnly = /^[\d]{9}$/;

	// Validate fields entered by the user: name, email, address, lastname, password and phone
	if ( !patternLettersOnly.test(fName.value) ) {
        fName.classList.replace("is-valid", "is-invalid");
		errorName.classList.replace("d-none", "d-block");
        error++;
	}

	if ( !patternMail.test(fEmail.value) ) { 
        fEmail.classList.replace("is-valid", "is-invalid");
        errorEmail.classList.replace("d-none", "d-block");
        error++;
	}

	if ( fAddress.value.length < 3 ) {
        fAddress.classList.replace("is-valid", "is-invalid");
		errorAddress.classList.replace("d-none", "d-block");
        error++;
	}

    if ( !patternLettersOnly.test(fLastN.value) ) {
        fLastN.classList.replace("is-valid", "is-invalid");
		errorLastN.classList.replace("d-none", "d-block");
        error++;
	}
    
    if ( !patternPassword.test(fPassword.value) ) {
		fPassword.classList.replace("is-valid", "is-invalid");
        errorPassword.classList.replace("d-none", "d-block");
        error++;
	}

    if ( !patternNumbersOnly.test(fPhone.value) ) {
        fPhone.classList.replace("is-valid", "is-invalid");
        errorPhone.classList.replace("d-none", "d-block");
        error++;
	}

	if (error > 0) {
	    //Avoid form submission
    } else {
       document.getElementById('feedback').innerHTML = "Checkout information registered! Thank you!"
        // + Submit form
    }
}


// Functions to update promos in Checkout:
function promoLastCall(id, unitsToPromo) {

    addToCart(id);

    let iProduct =  findIndexProduct(cart, id);
   
    //Change product quantity to apply promotions conditions: 
    if (id === 1) {
        cart[iProduct].quantity = 3;
        cart[iProduct].subtotal = cart[iProduct].price * 3;
        cart[iProduct].subtotalWithDiscount = 10 * 3; 
    } else if (id === 3) {
        cart[iProduct].quantity = 10;
        cart[iProduct].subtotal = cart[iProduct].price * 10;
        cart[iProduct].subtotalWithDiscount = Number(((cart[iProduct].price * 10) * 2/3).toFixed(2));
    }

    totalItemsCart += unitsToPromo - 1;

    goToNextPage();
    recoverCart() ;
}


function promoOil() {
    
    let promoOilEnjoyed = false;
    let unitsToPromo = 3;

    let btnPromoOil = document.getElementById('btnPromoOil');
    let txtPromoOil = document.getElementById('txtPromoOil');

    // Check if promotions conditions apply: 
    let iOil =  findIndexProduct(cart, 1);
    
    if (iOil !== -1) {
        promoOilEnjoyed = (cart[iOil].quantity >= 3) ? true : false; 
        unitsToPromo = 3 - cart[iOil].quantity;
    }

    if (promoOilEnjoyed) {
        txtPromoOil.classList.replace("text-danger", "text-success");
        txtPromoOil.innerHTML = "Congrats! You're already enjoying this fabulous offer."
        btnPromoOil.className = "d-none";
    } else {
        txtPromoOil.className = "text-danger";
        txtPromoOil.innerHTML = `You still can enjoy it! Only need to add ${unitsToPromo} unit/s.`;
        btnPromoOil.setAttribute("onclick", `promoLastCall(1, ${unitsToPromo})`);
        btnPromoOil.className = "btn btn-outline-danger d-block";
        btnPromoOil.innerHTML = `Add ${unitsToPromo} unit/s to cart`;
    }
}


function promoCupcake() {
    let promoCupcakeEnjoyed = false;
    let unitsToPromo = 10;

    let btnPromoCupcake = document.getElementById('btnPromoCupcake');
    let txtPromoCupcake = document.getElementById('txtPromoCupcake');

    //Check if promotions conditions apply: 
    let iCupcake =  findIndexProduct(cart, 3);

    if (iCupcake !== -1) {
        promoCupcakeEnjoyed = (cart[iCupcake].quantity >= 10) ? true : false; 
        unitsToPromo = 10 - cart[iCupcake].quantity;
    }

    if (promoCupcakeEnjoyed) {
        txtPromoCupcake.classList.replace("text-danger", "text-success");
        txtPromoCupcake.innerHTML = "Congrats! You're already enjoying this fabulous offer."
        btnPromoCupcake.className = "d-none";
    } else {
        txtPromoCupcake.className = "text-danger";
        txtPromoCupcake.innerHTML = `You still can enjoy it! Only need to add ${unitsToPromo} unit/s.`;
        btnPromoCupcake.setAttribute("onclick", `promoLastCall(3, ${unitsToPromo})`);
        btnPromoCupcake.className = "btn btn-outline-danger d-block";
        btnPromoCupcake.innerHTML = `Add ${unitsToPromo} unit/s to cart`;
    }
}

