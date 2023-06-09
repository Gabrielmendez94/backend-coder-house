const socket = io();

let $productList = document.getElementById("container")

socket.on('addProducts', async (products)=>{
    $productList.innerHTML = "";
    products.forEach((product)=>{
        const title = product.title;
        const pElement = document.createElement("p");
        pElement.textContent = title;
        $productList.appendChild(pElement);
    })
    await console.log(products);
})