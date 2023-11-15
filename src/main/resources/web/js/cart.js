docReady(function () {
    getCartInfo();
});

function drawCartInfo(json) {

    var cart = document.getElementById("cart");
    var productFlexItem = document.createElement("div");
    productFlexItem.className = "flex-item-cart-header";

    var productNameHeader = document.createElement("div");
    productNameHeader.className = "product-name-header";

    var img = document.createElement("div");
    img.className = "product-img";

    var nameBlock = document.createElement("div");
    nameBlock.className = "product-name";
    nameBlock.innerHTML = "<span>Name</span>";

    productNameHeader.appendChild(img);
    productNameHeader.appendChild(nameBlock);

    var productPriceHeader = document.createElement("div");
    productPriceHeader.className = "product-price-header";
    productPriceHeader.innerHTML = "<span>Price</span>";

    var productQuantityHeader = document.createElement("div");
    productQuantityHeader.className = "product-quantity-header";
    productQuantityHeader.innerHTML = "<span>Quantity</span>";

    var productTotalPriceHeader = document.createElement("div");
    productTotalPriceHeader.className = "product-total-price-header";
    productTotalPriceHeader.innerHTML = "<span>Total price</span>";

    var productUpdateHeader = document.createElement("div");
    productUpdateHeader.className = "product-update-header";

    var productRemoveHeader = document.createElement("div");
    productUpdateHeader.className = "product-remove-header";

    productFlexItem.appendChild(productNameHeader);
    productFlexItem.appendChild(productPriceHeader);
    productFlexItem.appendChild(productQuantityHeader);
    productFlexItem.appendChild(productTotalPriceHeader);
    productFlexItem.appendChild(productUpdateHeader);
    productFlexItem.appendChild(productRemoveHeader);

    cart.appendChild(productFlexItem);

    var cartItems = json.cartInfo.cartItems;

    for (var k in cartItems) {

        var id = cartItems[k].product.id;
        var name = cartItems[k].product.name;
        var price = cartItems[k].product.price;
        var quantity = cartItems[k].quantity;
        var totalPrice = cartItems[k].totalPrice;

        var productFlexItem = document.createElement("div");
        productFlexItem.className = "flex-item-cart-product";
        productFlexItem.id = "flex-item-cart-product_" + id;

        var productImgName = document.createElement("div");
        productImgName.className = "product-img-name";

        var name_formatted = name.replaceAll(" ", "_");

        var img = document.createElement("div");
        img.id = "img_" + name_formatted;
        img.className = "product-img";
        img.setAttribute("style", "background-image:url(img/products/" + name_formatted + ".png)");

        var nameBlock = document.createElement("div");
        nameBlock.className = "product-name";
        nameBlock.innerHTML = "<span>" + name + "</span>";

        var priceBlock = document.createElement("div");
        priceBlock.className = "product-price";
        priceBlock.innerHTML = "<span>" + price + "</span>";

        var quantityBlock = document.createElement("div");
        quantityBlock.id = "product-" + id + "-quantity";
        quantityBlock.className = "product-quantity";
        quantityBlock.innerHTML = '<input id="quantity_' + id + '" type="number" value="' + quantity + '">';

        var totalPriceBlock = document.createElement("div");
        totalPriceBlock.id = "product-" + id + "-total-price";
        totalPriceBlock.className = "product-total-price";
        totalPriceBlock.innerHTML = "<span>" + totalPrice + "</span>";

        var updateQuantityBlock = document.createElement("div");
        updateQuantityBlock.className = "product-update";
        updateQuantityBlock.innerHTML = '<button onclick="updateQuantity(' + id + ');">Update</button>';
        
        var removeItemBlock = document.createElement("div");
        removeItemBlock.className = "product-remove";
        removeItemBlock.innerHTML = '<button onclick="removeItem(' + id + ');">Remove</button>';

        productImgName.appendChild(img);
        productImgName.appendChild(nameBlock);

        productFlexItem.appendChild(productImgName);
        productFlexItem.appendChild(priceBlock);
        productFlexItem.appendChild(quantityBlock);
        productFlexItem.appendChild(totalPriceBlock);
        productFlexItem.appendChild(updateQuantityBlock);
        productFlexItem.appendChild(removeItemBlock);

        cart.appendChild(productFlexItem);
    }

    var productNameHeader = document.createElement("div");
    productNameHeader.className = "product-name-header";

    var productPriceHeader = document.createElement("div");
    productPriceHeader.className = "product-price-header";

    var productQuantityHeader = document.createElement("div");
    productQuantityHeader.className = "product-quantity-header";

    var itemsInCartValue = json.cartInfo.itemsInCart;

    var itemsInCart = document.createElement("div");
    itemsInCart.id = "product-items-in-cart";
    itemsInCart.className = "product-items-in-cart";
    itemsInCart.innerHTML = "<span>" + itemsInCartValue + "</span>";

    var subTotalPriceValue = json.cartInfo.subtotalPrice;
    var subTotalPrice = document.createElement("div");
    subTotalPrice.id = "products-sub-total-price";
    subTotalPrice.className = "product-total-price";
    subTotalPrice.innerHTML = "<span>" + subTotalPriceValue + "</span>";

    var productUpdateHeader = document.createElement("div");
    productUpdateHeader.className = "product-update-header";

    var productRemoveHeader = document.createElement("div");
    productRemoveHeader.className = "product-remove-header";

    var productFlexItem = document.createElement("div");
    productFlexItem.className = "flex-item-cart-footer";

    productFlexItem.appendChild(productNameHeader);
    productFlexItem.appendChild(productPriceHeader);
    productFlexItem.appendChild(itemsInCart);
    productFlexItem.appendChild(subTotalPrice);
    productFlexItem.appendChild(productUpdateHeader);
    productFlexItem.appendChild(productRemoveHeader);

    cart.appendChild(productFlexItem);

    if (itemsInCartValue > 0) {
        drawCartOptions(true);
    } else {
        drawCartOptions(false);
    }
}
;

async function getCartInfo() {

    let response = await fetch('control/cart/getinfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    if (response.ok) {
        let json = await response.json();
        drawCartInfo(json);
    } else {
        alert("Error HTTP: " + response.status);
    }
}
;

function drawUpdatedQuantity(json) {

    try {
        var cartItems = json.cartInfo.cartItems;
        for (var k in cartItems) {

            var id = cartItems[k].product.id;
            var quantityValue = cartItems[k].quantity;
            var totalPriceValue = cartItems[k].totalPrice;

            var quantity = document.getElementById("product-" + id + "-quantity");
            quantity.innerHTML = '<input id="quantity_' + id + '" type="number" value="' + quantityValue + '">';

            var totalPrice = document.getElementById("product-" + id + "-total-price");
            totalPrice.innerHTML = "<span>" + totalPriceValue + "</span>";
        }

        var itemsInCartValue = json.cartInfo.itemsInCart;
        var itemsInCart = document.getElementById("product-items-in-cart");
        itemsInCart.innerHTML = "<span>" + itemsInCartValue + "</span>";

        var subTotalPriceValue = json.cartInfo.subtotalPrice;
        var subTotalPrice = document.getElementById("products-sub-total-price");
        subTotalPrice.innerHTML = "<span>" + subTotalPriceValue + "</span>";

        deleteRowWithZeroQuantity();

    } catch (e) {
        alert("Error : " + e);
    }
}
;

function deleteRowWithZeroQuantity() {

    var children = document.getElementById("cart").children;

    for (var i = 1; i < children.length - 1; i++) {

        var id = children[i].id.replace("flex-item-cart-product_", "");

        var quantity = document.getElementById("quantity_" + id).value;

        if (quantity == 0) {
            document.getElementById(children[i].id).remove();
        }
        ;
    }
}
;

function removeProductFromPage(fId) {
    var children = document.getElementById("cart").children;

    for (var i = 1; i < children.length - 1; i++) {
        var id = children[i].id.replace("flex-item-cart-product_", "");

        if (id == fId) {
            document.getElementById(children[i].id).remove();
        }
        ;
    }
}

function drawCartAfterRemove(json) {
    try {
        var fId = json.removedProductId;
        removeProductFromPage(fId);

        var itemsInCartValue = json.cartInfo.itemsInCart;
        var itemsInCart = document.getElementById("product-items-in-cart");
        itemsInCart.innerHTML = "<span>" + itemsInCartValue + "</span>";

        var subTotalPriceValue = json.cartInfo.subtotalPrice;
        var subTotalPrice = document.getElementById("products-sub-total-price");
        subTotalPrice.innerHTML = "<span>" + subTotalPriceValue + "</span>";
    } catch (e) {
        alert("Error : " + e);
    }
}
;

async function removeItem(item_id){
    var product_id = item_id;

    let data = {
        "id": Number(product_id),
    };

    let response = await fetch('control/cart/removeitem', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    
    if (response.status == 200) {
        let json = await response.json();
        drawCartAfterRemove(json);
    } else {
        alert("Error HTTP: " + response.status);
    };
};

async function updateQuantity(quantity_id) {

    var unput = document.getElementById("quantity_" + quantity_id);

    var product_id = quantity_id;

    let data = {
        "id": Number(product_id),
        "quantity": Number(unput.value)
    };

    let response = await fetch('control/cart/updatequantity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        let json = await response.json();
        drawUpdatedQuantity(json);

    } else {
        alert("Error HTTP: " + response.status);
    };
}
;

function drawCartOptions(bool) {
    var cartOptions = document.getElementById("cart-options");
    if (bool == true) {
        var continueShopping = document.createElement("div");
        continueShopping.innerHTML = '<a href="/eshop">continue shopping</a>';
        continueShopping.id = "continue-shopping";
        cartOptions.appendChild(continueShopping);

        var cleanCart = document.createElement("div");
        cleanCart.innerHTML = "<button id=\"button_clean_cart\" onclick=\"cleanCart();\">clean cart</button>";
        cleanCart.id = "clean-cart";
        cartOptions.appendChild(cleanCart);

        var proceedToCheckout = document.createElement("div");
        proceedToCheckout.innerHTML = '<a href="/eshop/checkout">proceed to checkout</a>';
        proceedToCheckout.id = "proceed-to-checkout";
        cartOptions.appendChild(proceedToCheckout);
    } else {
        var continueShopping = document.createElement("div");
        continueShopping.innerHTML = '<a href="/eshop">continue shopping</a>';
        continueShopping.id = "continue-shopping";
        cartOptions.appendChild(continueShopping);
    }
};

async function cleanCart() {
    try {
        // Wait for the fetch operation to complete
        var cartInfo = await getCartInfoRequest();
        var ids = cartInfo.cartInfo.cartItems.map(item => item.product.id);

    } catch (error) {
        console.error("Error fetching cart info:", error);
    }
    ids.forEach(id => {
        removeItem(id);
    });
};

async function  getCartInfoRequest(){

    try {
        let response = await fetch('control/cart/getinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        var res = await response.json();
        // return await response.json();
        return res;
    } catch (error) {
        console.error("Error in getCartInfoRequest:", error);
        throw error;
    }
};



function docReady(fn) {
    if (document.readyState == "complete" || document.readyState == "interactive" || window.onload == "") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
;