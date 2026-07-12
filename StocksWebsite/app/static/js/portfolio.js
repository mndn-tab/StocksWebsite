if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeItemButtons = document.getElementsByClassName('btn-remove') //get all the buttons
    for (var i = 0; i < removeItemButtons.length; i++) {
        var button = removeItemButtons[i]
        button.addEventListener('click', removeItem)
    }
}

function removeItem(event) { // event is implicitly passed by addEventListener
    var buttonClicked = event.target // target is the button
    buttonClicked.parentElement.remove() //from portfolio.html, parent of button is <li>
}

