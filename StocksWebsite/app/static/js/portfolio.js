if (document.readyState == 'loading') { // if DOM is still loading, wait till it's loaded to call ready()
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    updatePortfolioTotal()

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
    document.getElementsByClassName('portfolio-total-price')[0].innerText = total    
}

