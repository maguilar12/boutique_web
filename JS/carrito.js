   // el load se refiere a que funcion queremos que se ejecute primero.  
        window.onload = function () {
            // Variables 
            let baseDeDatos = [ 
                {//Es estructura JSON.
                    id: 1,
                    nombre: 'blusa',
                    precio: 150,
                    imagen: 'img/blusa.jpg'
                },
                {
                    id: 2,
                    nombre: 'blusa casual',
                    precio: 200,
                    imagen: 'img/blusa4.jpg'
                },
                {
                    id: 3,
                    nombre: 'blusa deportiva',
                    precio: 160,
                    imagen: 'img/blusa2.jpg'
                },
                {
                    id: 4,
                    nombre: 'blusa corporativa',
                    precio: 175,
                    imagen: 'img/blusa3.jpg'
                },
                {
                    id: 5,
                    nombre: 'blusa ',
                    precio: 100,
                    imagen: 'img/blusa5.jpg'
                },
                {
                    id: 6,
                    nombre: 'blusa corporativa',
                    precio: 5,
                    imagen: 'img/blusa6.jpg'
                }

            ]
            //el simbolo de -->$ es un identificador
            //'#items' representa que esta llamando un ID de la etiquet html con el respectivo nombre.
            let $items = document.querySelector('#items');
            let carrito = [];
            let total = 0;
            //document.querySelector SE OBTIENEN O SELECCIONA LOS ELEMENTOS DE LA CLASE/ID -->'#carrito'.
            let $carrito = document.querySelector('#carrito');//'#carrito' captura lo ingresado en la etiqueta ID.
            let $total = document.querySelector('#total');
            // Funciones
            function renderItems () {
                for (let info of baseDeDatos) {
                    // Estructura document.createElement CREA UN ELEMENTO HTML EN LA PAGINA.         
                    let miNodo = document.createElement('div');
                    miNodo.classList.add('card', 'col-sm-4');
                    // Body
                    let miNodoCardBody = document.createElement('div');
                    miNodoCardBody.classList.add('card-body');
                    // Titulo
                    let miNodoTitle = document.createElement('h5');
                    miNodoTitle.classList.add('card-title');
                    miNodoTitle.textContent = info['nombre'];//textContent DEVUELDE EL TEXTO QUE ESTA DENTRO DE UN NODE
                    // Imagen
                    let miNodoImagen = document.createElement('img');
                    miNodoImagen.classList.add('img-fluid');
                    miNodoImagen.setAttribute('src', info['imagen']);
                    // Precio
                    let miNodoPrecio = document.createElement('p');
                    //classList.add DEBUELVE UNA LISTA DE CLASES A UN ELEMENTO O CADENA DE TEXTO.
                    miNodoPrecio.classList.add('card-text');
                    miNodoPrecio.textContent = info['precio'] + 'Q';
                    // Boton 
                    let miNodoBoton = document.createElement('button');
                    miNodoBoton.classList.add('btn', 'btn-primary');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', info['id']);//setAttribute PARA OBTENER UN VALOR ACTUAL DE UN ATRIBUTO.
                    miNodoBoton.addEventListener('click', anyadirCarrito);//addEventListener ES PARA  REGISTRAR UN EVENTO A UN OBJETO ESPECIFICO.
                    // Insertamos
                    //appendChild DEBUELVE UN ELEMENTO HIJO DE LA CLASE PADRE.
                    miNodoCardBody.appendChild(miNodoImagen);
                    miNodoCardBody.appendChild(miNodoTitle);
                    miNodoCardBody.appendChild(miNodoPrecio);
                    miNodoCardBody.appendChild(miNodoBoton);
                    miNodo.appendChild(miNodoCardBody);
                    $items.appendChild(miNodo);
                }
            }

            function anyadirCarrito () {
                // Anyadimos el Nodo a nuestro carrito
                carrito.push(this.getAttribute('marcador'))
                // Calculo el total
                calcularTotal();
                // Renderizamos el carrito 
                renderizarCarrito();
            }

            function renderizarCarrito () {
                // Vaciamos todo el html
                $carrito.textContent = '';
                // Quitamos los duplicados
                let carritoSinDuplicados = [...new Set(carrito)];
                // Generamos los Nodos a partir de carrito
                carritoSinDuplicados.forEach(function (item, indice) {
                    // Obtenemos el item que necesitamos de la variable base de datos
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    // Cuenta el número de veces que se repite el producto
                    let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    // Creamos el nodo del item del carrito
                    let miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}Q`;
                    // Boton de borrar
                    let miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.setAttribute('item', item);
                    miBoton.addEventListener('click', borrarItemCarrito);
                    // Mezclamos nodos
                    miNodo.appendChild(miBoton);
                    $carrito.appendChild(miNodo);
                })
            }

            function borrarItemCarrito () {
                console.log()
                // Obtenemos el producto ID que hay en el boton pulsado
                let id = this.getAttribute('item');
                // Borramos todos los productos
                carrito = carrito.filter(function (carritoId) {
                    return carritoId !== id;
                });
                // volvemos a renderizar
                renderizarCarrito();
                // Calculamos de nuevo el precio
                calcularTotal();
            }

            function calcularTotal () {
                // Limpiamos precio anterior
                total = 0;
                // Recorremos el array del carrito
                for (let item of carrito) {
                    // De cada elemento obtenemos su precio
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    total = total + miItem[0]['precio'];
                }
                // Formateamos el total para que solo tenga dos decimales
                let totalDosDecimales = total.toFixed(2);
                // Renderizamos el precio en el HTML
                $total.textContent = totalDosDecimales;
            }
            // Eventos

            // Inicio
            renderItems();
        } 