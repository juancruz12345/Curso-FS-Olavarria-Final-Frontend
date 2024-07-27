
'use strict'

    const products = [
        {
            nombre : "Pan Mendia p/ hamburguesas",
            precio : 1180,
            imagen : "imgs/pan.webp",
            cantidad: 200
    
        },
        {
            nombre : "leche TASerenisima",
            precio : 1500,
            imagen : 'imgs/leche-serenisima.webp',
            cantidad: 200
        },
        {
            nombre : "Hamburguesas PATY",
            precio : 10500,
            imagen : 'imgs/hamburguesas.webp',
            cantidad: 100
        },
        {
            nombre : "Queso mozzarela",
            precio : 7000,
            imagen : 'imgs/mozzarela.webp',
            cantidad: 300
        },
        {
            nombre : "Cerveza Stella Artois",
            precio : 1050,
            imagen : 'imgs/cerveza.webp',
            cantidad: 200
        },
        {
            nombre : "Galletitas",
            precio : 1025,
            imagen : 'imgs/galletitas.webp',
            cantidad: 400
        },
        {
            nombre : "Yerba Playadito",
            precio : 3800,
            imagen : 'imgs/yerba.webp',
            cantidad: 500
        },
        {
            nombre : "Jamon cocido Tandileros",
            precio : 3000,
            imagen : 'imgs/jamon.webp',
            cantidad: 200
        }
        
    ]
    const productosOferta = [
        {
            nombre : "Sopa crema Knorr",
            precio: 1430,
            descuento: 0.3,
            imagen : 'imgs/sopa-crema.webp',
            cantidad: 500
        },
        {
            nombre : "Harina Blancaflor",
            precio: 1110,
            descuento: 0.15,
            imagen : 'imgs/harina.webp',
            cantidad: 300
        },
        {
            nombre : "Shampoo Pantene",
            precio: 6250,
            descuento: 0.5,
            imagen : 'imgs/shampoo.webp',
            cantidad: 600
        },
        {
            nombre : "Fideos Lucchetti",
            precio: 1200,
            descuento: 0.33,
            imagen : 'imgs/fideos.webp',
            cantidad: 400
        }
        ]
    
    
    const btnCompra = document.getElementById('btn-compra')
    const listaProductos = document.getElementById('lista-productos')

    for(let i=0;i<productosOferta.length;i++){
        let descuento = productosOferta[i].precio-(productosOferta[i].precio*productosOferta[i].descuento)
       
        listaProductos.innerHTML += `<article>
        <h2>${productosOferta[i].nombre}</h2>
        <img loading="lazy" src=${productosOferta[i].imagen}><div>Descuento del ${productosOferta[i].descuento*100}%</div></img>
        <h3><div class="precio-anterior">$${productosOferta[i].precio}</div> $<span>${descuento}</span></h3>
        
        <input min=0 type="number">
        <h4>Stock unidades: <span>${productosOferta[i].cantidad}</span></h4>
        </article>`
    }
    for(let i=0;i<products.length;i++){
        listaProductos.innerHTML += `<article>
        <h2>${products[i].nombre}</h2>
        <img src=${products[i].imagen}></img>
        <h3>$<span>${products[i].precio}</span></h3>
        <input min=0 type="number">
        <h4>Stock unidades: <span>${products[i].cantidad}</span></h4>
        </article>`
    }

    btnCompra.addEventListener('click',calcularTotalCompra)
    
    
    function calcularTotalCompra(){
        
        const totalSpan= document.getElementById('total-span')
        const article = listaProductos.getElementsByTagName('article')
     
        let compraTotal = 0
        let valores = []
        let pago = false

        const mensajeError = document.getElementById('mensaje-error')
     
        for(let i=0;i<article.length;i++){
            
            let nombreProducto = article[i].getElementsByTagName('h2')[0].textContent
            let inputValue = article[i].getElementsByTagName('input')[0].value
            let precioProducto = parseInt(article[i].getElementsByTagName('span')[0].textContent)
            let stockProducto = parseInt(article[i].getElementsByTagName('span')[1].textContent)
            
            
            if(inputValue<=stockProducto){
                mensajeError.hidden= true
                let totalProducto = precioProducto*inputValue
                valores.push(totalProducto)
                compraTotal += valores[i] 
                pago=true
            }
            
            else{
                
                compraTotal = 0
                totalSpan.textContent = ''
                mensajeError.hidden= false
                mensajeError.style.background= "#fdbbbb";
                mensajeError.innerHTML = `<h3>no hay suficiente stock de ${nombreProducto}, el maximo es: ${stockProducto}</h3>`
                pago=false
                MetodoDePago(pago)
                return
            }
            }
        
        if(compraTotal>0){
            totalSpan.textContent = `${compraTotal}`
            MetodoDePago(pago)
        }else{
            totalSpan.textContent = ''
            pago=false
            MetodoDePago(pago)
        }
    } 

    function MetodoDePago(pago){
        const inputPagoDiv = document.getElementById('input-pago')
        const pagoTxt = document.getElementById('pago-txt')
        const tarjetas = document.querySelectorAll(".tarjeta")
        const cuentaDni = document.getElementsByClassName("cuentaDni")[0]
        const paypal= document.getElementsByClassName("paypal")[0]
    
        if(pago){
            pagoTxt.hidden=false
            tarjetas.forEach( (e)=>{
                e.hidden = false
                e.addEventListener('click',()=>{
                    inputPagoDiv.getElementsByTagName('label')[0].hidden=false
                    inputPagoDiv.getElementsByTagName('input')[0].hidden=false
                    inputPagoDiv.getElementsByTagName('label')[1].hidden=true
                    inputPagoDiv.getElementsByTagName('input')[1].hidden=true
                    inputPagoDiv.getElementsByTagName('label')[2].hidden=true
                    inputPagoDiv.getElementsByTagName('input')[2].hidden=true
                    inputPagoDiv.getElementsByTagName('label')[3].hidden=true
                    inputPagoDiv.getElementsByTagName('input')[3].hidden=true
                })
            })
            
            cuentaDni.hidden=false
            cuentaDni.addEventListener('click',()=>{
                inputPagoDiv.getElementsByTagName('label')[0].hidden=true
                inputPagoDiv.getElementsByTagName('input')[0].hidden=true
                inputPagoDiv.getElementsByTagName('label')[1].hidden=false
                inputPagoDiv.getElementsByTagName('input')[1].hidden=false
                inputPagoDiv.getElementsByTagName('label')[2].hidden=true
                inputPagoDiv.getElementsByTagName('input')[2].hidden=true
                inputPagoDiv.getElementsByTagName('label')[3].hidden=true
                inputPagoDiv.getElementsByTagName('input')[3].hidden=true
                
            })
            
            paypal.hidden=false
            paypal.addEventListener('click',()=>{
                inputPagoDiv.getElementsByTagName('label')[0].hidden=true
                inputPagoDiv.getElementsByTagName('input')[0].hidden=true
                inputPagoDiv.getElementsByTagName('label')[1].hidden=true
                inputPagoDiv.getElementsByTagName('input')[1].hidden=true
                inputPagoDiv.getElementsByTagName('label')[2].hidden=false
                inputPagoDiv.getElementsByTagName('input')[2].hidden=false
                inputPagoDiv.getElementsByTagName('label')[3].hidden=false
                inputPagoDiv.getElementsByTagName('input')[3].hidden=false
            })
        }
        else{
            pagoTxt.hidden=true
            tarjetas.forEach( (e)=>{
                e.hidden = true
            })
            cuentaDni.hidden=true
            paypal.hidden=true

            inputPagoDiv.getElementsByTagName('label')[0].hidden=true
            inputPagoDiv.getElementsByTagName('input')[0].hidden=true
            inputPagoDiv.getElementsByTagName('label')[1].hidden=true
            inputPagoDiv.getElementsByTagName('input')[1].hidden=true
            inputPagoDiv.getElementsByTagName('label')[2].hidden=true
            inputPagoDiv.getElementsByTagName('input')[2].hidden=true
            inputPagoDiv.getElementsByTagName('label')[3].hidden=true
            inputPagoDiv.getElementsByTagName('input')[3].hidden=true
        }


    }
    
    
    
    







