import fs from 'fs';

export default class ProductManager {
    constructor(path){
        this.products= [];
        this.id = 0;
        this.path = path;
    }

    addProduct(title, description, price, thumbnail, code, stock){

        if(title && description && price && thumbnail && code && stock){
            const verificationCode = this.products.find(product => product.code === code)
            if (verificationCode){
                console.error("Error, el código está repetido")
            } else{
                let id;
                this.id ++;
                id = this.id;
                const newProduct = {id, title, description, price, thumbnail, code, stock};
                this.products.push(newProduct);            
            }
        } else{
            console.log("Error, debe completar todos los campos");
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(idNumber){
        const productID = this.products.find(product => product.id === idNumber);
        if (!productID){
            return console.error("Not found")
        } else {
            return ("Producto con el ID solicitado: ", productID)
        }   
    }

    updateProduct(id, newObject) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex >= 0) {
            const updatedProduct = {
                ...this.products[productIndex],
                ...newObject
            };
            this.products[productIndex] = updatedProduct;
            console.log("Producto actualizado correctamente");
        }else{
            console.error("No se encontró el producto");
            return;    
        }

    }

    deleteProduct(idNumero){
        const productID = this.products.findIndex(product => product.id === idNumero);

        if(productID >= 0){
            const deleteProductByID = this.products.splice(productID, 1);
            console.log("Se ha borrado el producto: ", deleteProductByID);
        } else{
            console.error("No se ha encontrado el producto");
        }
    }
    
    saveProducts(){
        const jsonData = JSON.stringify(this.products);
        fs.writeFileSync(this.path, jsonData, (error)=>{
            if(error){
                console.error(error);
            }else{
                console.log("Productos archivados correctamente");
                fs.readFileSync(this.path, "utf8", (error, resultado)=>{
                    if(error){
                        console.log(error)
                    }else{
                        console.log(resultado);
                    }
                })
            }
        })
    }
}

export const nuevoProducto = new ProductManager('./productos.json');
nuevoProducto.addProduct("Campera negra", "Material Jean", 200, "sin imagen", 33, 25)
nuevoProducto.addProduct("Mochila", "De lona", 5430, "Sin imagen", 234, 15)
nuevoProducto.addProduct("Bandolera", "De lona", 5430, "Sin imagen", 235, 15)
nuevoProducto.addProduct("Riñonera", "De lona", 5430, "Sin imagen", 236, 15)
nuevoProducto.addProduct("Remera", "Argentina", 5430, "Sin imagen", 237, 15)
nuevoProducto.addProduct("Remera", "Boca Juniors", 5430, "Sin imagen", 245, 15)
nuevoProducto.addProduct("Zapatillas", "Cuero", 5430, "Sin imagen", 238, 15)
nuevoProducto.addProduct("Ojotas", "Nike", 5430, "Sin imagen", 239, 15)
nuevoProducto.addProduct("Camisa", "Seda", 5430, "Sin imagen", 249, 15)
nuevoProducto.addProduct("Riñonera", "De lona", 5430, "Sin imagen", 223, 15)
nuevoProducto.getProductById(2);
nuevoProducto.getProducts();
nuevoProducto.updateProduct(3, {title: "cartera", description: "lona", price: 250, thumbnail:"sin foto", code:56, stock:96})
nuevoProducto.saveProducts();
nuevoProducto.getProducts();
