const data= [
    {
        id : 0,
        img : 'images/1.jpg',
        name : 'Gray Corner Sofa',
        price : 2000,
        save : 25,
        delivery : 'FAST SHIPPING In 1 - 2 days',
        itemInCart: false
    },
    {
        id : 1,
        img : 'images/2.jpg',
        name : 'Dark Green Corner Sofa',
        price : 2150,
        save : 50,
        delivery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 2,
        img : 'images/3.jpg',
        name : 'Black Corner Sofa',
        price : 2370,
        save : 30,
        delivery : 'In 8 - 10 days',
        itemInCart: false
    },
    {
        id : 3,
        img : 'images/4.jpg',
        name : 'Dark Gray Corner Sofa',
        price : 970,
        save : 30,
        delivery : 'In 15 - 20 days',
        itemInCart: false
    },
    {
        id : 4,
        img : 'images/5.jpg',
        name : 'White Corner Sofa',
        price : 1300,
        save : 100,
        delivery : 'FAST SHIPPING In 1 days',
        itemInCart: false
    },

    {
        id : 5,
        img : NaN,
        name : 'Coming Soon',
        price : NaN,
        save : NaN,
        delivery : NaN,
        itemInCart: false
    },
    
];

let cartList=[];

var i;
var detail =document.getElementsByClassName('card-item');
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var delivery = document.getElementById('delivery')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('back')
back.addEventListener('click',refreshPage)
var addToCarts = document.querySelectorAll('#add-to-cart')
var cart = document.getElementById('cart');

cart.addEventListener('click',displayCart)

var carts = document.getElementById('carts');

carts.addEventListener('click',()=>addToCart(getId))

var home = document.getElementById('logo');
var home2 = document.getElementById('home');
var home3 = document.getElementById('goback');

home.addEventListener('click',hideCart);
home2.addEventListener('click',hideCart);
home3.addEventListener('click',hideCart);

document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        var itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})

for(i=0;i<data.length;i++){
    detail[i].addEventListener('click',handleDetail)
}

var getId;

addToCarts.forEach(val=>val.addEventListener('click',()=>addToCart(val.parentNode.id)));

function handleDetail(e){
    detailsPage.style.display = 'block'
    getId= this.parentNode.id;
    detailsImg.src= data[getId].img;
    detailTitle.innerHTML=   data[getId].name;
    detailPrice.innerHTML= 'Price : $ ' +data[getId].price;
    youSave.innerHTML= 'You save : ($ ' + data[getId].save + ')';
    delivery.innerHTML= 'Delivery :  ' +data[getId].delivery;
}

function addToCart(id) {
    if(!data[id].itemInCart){
        cartList= [...cartList,data[id]];
        addItem()
        
        alert('Item added to your cart')

    }
    else{

        alert('Your item is already in your cart.')
    }
    data[id].itemInCart= true
}

function refreshPage(){
    detailsPage.style.display = 'none'
}

function hideCart(){
    document.getElementById('main').style.display= "block";
    document.getElementById('cart-container').style.display= "none";
}

function displayCart(){
    document.getElementById('main').style.display= "none";
    document.getElementById('details-page').style.display= "none";
    document.getElementById('cart-container').style.display= "block";
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
    else{
        document.getElementById('empty-cart').style.display= "none";
        document.getElementById('cart-with-items').style.display= "block";
        
    }
}

var totalAmount;
var totalItems;
var totalSaving;

function addItem(){
    totalAmount=0;
    totalItems = 0;
    totalSaving=0
    var clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        console.log(clrNode.childNodes)
        cartList.map((cart)=>
        {
            var cartCont = document.getElementById('item-body');
            totalAmount = totalAmount + cart.price
            totalSaving = totalSaving + cart.save
            totalItems = totalItems + 1;

            var tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            var listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            var listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)

            var listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            var listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            var listTrash = document.createElement('i');
            listTrash.setAttribute('class', "remove");
            listTrash.setAttribute('id','remove');
            listTrash.innerHTML = '<img src="images/trash.png" alt="" srcset="" width="20" height="20" style="margin-left: 15px; margin-bottom: 500px;">';
            tempCart.appendChild(listTrash);
            cartCont.appendChild(tempCart)
            
        })
        document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
        document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
        document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalSaving;
        document.getElementById('total').style.display= "block";
}

function addBuy() {
    document.getElementById('buy').style.display = 'block';
  }

  function addWire() {
    document.getElementById('wire').style.display = 'block'
    document.getElementById('credit').style.display = 'none';
  }

  function addCredit() {
    document.getElementById('credit').style.display = 'block'
    document.getElementById('wire').style.display = 'none';
  }

  function buySuccessWire() {
    alert("Your order is almost complete. We will send all necessary informations for payment via e-mail.");
  }

  function buySuccessCredit() {
    alert("Your order is complete. We will send your order and track number via e-mail.");
  }

function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=>list.id!=itemId);
    addItem()
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
}

