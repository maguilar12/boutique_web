window.addEventListener('load', function () {
    console.log('el contenido ha cargado');
    // document.slider.src = '/img/buho.jpg';
    //creamos un arreglo para guardar imagenes
    var imagenes = [];
    imagenes[0] = '/mipagina1/img/slider.png';
    imagenes[1] = '/mipagina1/img/imaghist.jpg';
    imagenes[2] = '/mipagina1/img/imgehis.jpg';

    //Se crea una funcion para cambiar las imagenes
    var indiceImagenes = 0;

    function cambiarImagenes() {
        document.slider.src = imagenes[indiceImagenes];
        if (indiceImagenes < 2) {
            indiceImagenes++;
        } else {
            indiceImagenes = 0;
        }
    }
    setInterval(cambiarImagenes, 1000)
});



