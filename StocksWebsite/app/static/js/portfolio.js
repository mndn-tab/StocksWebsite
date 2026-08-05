// source: YouTube channel for Web Dev Simplified: https://www.youtube.com/watch?v=YeFzkC2awTM&t=1462s

if (document.readyState == 'loading') { // if DOM is still loading, wait till it's loaded to call ready()
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var removeItemButtons = document.getElementsByClassName('portfolio-remove-btn') //get all the buttons
    for (var i = 0; i < removeItemButtons.length; i++) {
        var button = removeItemButtons[i]
        button.addEventListener('click', removeItem)
    }
    var quantityInputs = document.getElementsByClassName('portfolio-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged) // event = "change" of input
    }

    updatePortfolioTotal()
    document.getElementsByClassName('portfolio-add-btn')[0].addEventListener('click', addToPortfolioClicked)
    document.getElementsByClassName('portfolio-buy-btn')[0].addEventListener('click', buyClicked)
}
//TODO: add remove() to remove from session["portfolio"], as well
function removeItem(event) { // event is implicitly passed by addEventListener
    var buttonClicked = event.target // target is the button
    buttonClicked.parentElement.remove() //from portfolio.html, parent of button is <li>
    updatePortfolioTotal()
}

function quantityChanged(event){ //if input is empty or negative, then input.value=1
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatePortfolioTotal()
}

function buyClicked(){
    let quantity = document.getElementsByClassName('portfolio-total-value')[0].innerText
    alert(`Number of items purchased is ${ quantity}`) // put your variable inside text, using ${} inside backticks ``
    var portfolio = document.getElementsByClassName('portfolio')[0]
    // remove all children <li> of portfolio <ul> 
    while (portfolio.hasChildNodes()){
        portfolio.removeChild(portfolio.firstChild)
    }
    updatePortfolioTotal()
}

function updatePortfolioTotal(){
    //getElementsByClassName() returns a collection of elements,use [0] to access the first item in that list
    var portfolioItemContainer = document.getElementsByClassName('portfolio')[0]
    var portfolioItems = portfolioItemContainer.getElementsByClassName('portfolio-item')
    var total = 0
    for (var i = 0; i < portfolioItems.length; i++){
        var portfolioItem = portfolioItems[i]
        var quantityElement = portfolioItem.getElementsByClassName('portfolio-quantity-input')[0]
        var quantity = parseInt(quantityElement.value) // need to use parseInt, cause input.value returns a string
        //TODO: add price and change below formula to: total = total + (price * quantity)
        total = total + quantity 
    }
    document.getElementsByClassName('portfolio-total-value')[0].innerText = total    
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// get symbol from input
function addToPortfolioClicked(event) {
    var button = event.target
    var index = button.parentElement
    var symbol = index.getElementsByClassName('symbol-add-input')[0].value
    addItemToPortfolio(symbol)
    updatePortfolioTotal()
}

//TODO: add addItem() to add to session["portfolio"], as well
function addItemToPortfolio(symbol){
    var portfolioItem = document.createElement('li') //create an element
    portfolioItem.classList.add('portfolio-item') // add class attribute
    var portfolio = document.getElementsByClassName('portfolio')[0]
    if(! itemExists(symbol, portfolio)){   
        // create html content
        var portfolioItemContents = `           
            <span class="portfolio-symbol-value">${symbol}</span>
            <input type="number" class="portfolio-quantity-input" value="1" />
            <button type="button" class="portfolio-remove-btn">Remove</button>`
        portfolioItem.innerHTML = portfolioItemContents // add html inside the element
        portfolio.append(portfolioItem) // append the element
    
        // add event listeners for portfolioItem
        portfolioItem.getElementsByClassName('portfolio-quantity-input')[0].addEventListener('change', quantityChanged)
        portfolioItem.getElementsByClassName('portfolio-remove-btn')[0].addEventListener('click', removeItem)
    }
}

// this function checks if symbol already exists in portfolio, then return true, else return false
function itemExists(symbol, portfolio){
    portfolioItems = portfolio.getElementsByClassName('portfolio-item') 
    for (var i = 0; i < portfolioItems.length; i++){
        portfolioItemSymbol = portfolioItems[i].getElementsByClassName('portfolio-symbol-value')
        if (portfolioItemSymbol[0].innerText == symbol){
            alert('This symbol is already added to the portfolio')
            return true
        }
    }
    return false
}
