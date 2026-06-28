
async function get_symbols(){
    try{
        const response = await fetch('/symbols');
        const symbols = await response.json();
        return symbols;
    }
    catch(error){
        console.error('Error:', error);
        return []; 
    }
}

async function autocomplete(){
    symbols = await get_symbols(); //get_symbols() is an async function and needs await. Otherwise, it immidiately returns a Promise rather than the actual data

    let input = document.querySelector("#index input"); // querySelector("#index input") = querySelector("#index").querySelector("input")
    input.addEventListener("keyup", function (event)  // keyup = when keyboard is pressed
    {
        let html = ""; 
        if (input.value) {
        symbols.forEach(symbol =>{
            if (symbol.startsWith(input.value)) { //autocomplete: if symbol starts with typed value, add it to the list
                html += `<li>${symbol}</li>`
                }
            });
        }
        document.querySelector('#index ul').innerHTML = html;
    });
}
autocomplete();
