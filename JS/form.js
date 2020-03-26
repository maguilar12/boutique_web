function valida(formulario) {
    if ((formulario.campo1.value.length == 0) || (formulario.campo2.value.length == 0)) {
        alert('falta informacion');
        return false
        
    }
    if(formulario.campo2.value.length <= 7){
        alert('su contraseña debe de tener igual o mas de 8 caracteres')
        return false
        }
    
    if (formulario.campo1.value == formulario.campo2.value) {
        alert('¡La contraseña no puede ser igual al usuario!');
        formulario.campo1.focus();
        return false;
    } else {
        alert('¡Todo está bien, continue!');
        formulario.submit;
    }

    return true
}
