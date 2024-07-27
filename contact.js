'use strict'

const form = document.getElementById('form-contact')



form.addEventListener('submit',(e)=>{
    let datos = []
    e.preventDefault() 
    const nombre = "Nombre: " + form[0].value
    const apellido = "Apellido: " + form[1].value
    const email = "Email: " + form[2].value
    const mensaje = "Mensaje: " + form[3].value
    datos.push(nombre, apellido, email, mensaje)
    let blob = new Blob([datos],{type: "text/plain;charset=utf-8"})
    saveAs(blob,'datos-contacto.txt')
})
