/*asi obtenemos los datos ingresados en esos campos a traves de nuestro documneto, 
le cambiamos el nombre a la variable txtName porque son palabras reservadas*/

const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const contadorProductos =document.getElementById("contadorProductos");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont=0;
let costoTotal=0;
let totalEnProductos= 0;

let datos = new Array();

function validarCantidad() {
    if (txtNumber.value.length <= 0) {
        return false;

    }// legth<=0
    if (isNaN(txtNumber.value)) {
        return false;
    }//isNaN, indica is not a number 
    /*Primero aseguramos que sea un numero y despues lo cambiamos de ser un 
    string a ser un numero, porque si llegamos a sumar un string mas un numero en lugar de sumarlo se va a concatenar*/

    if (Number(txtNumber.value) <= 0) {
        return false;
    }// >0
  return true;
}//validarCantidad

function getPrecio(){
     return Math.round(Math.random()*10000)/100;
}//get precio


btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    //Bandera al ser true permite agregar los datos a la tabla
    let isValid = true;

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    /* Ponemos en el if que el valor de la variables txtName */
    if (txtName.value.length < 3) {
        //1. Mostrar la alerta con error
        //2. Norde de color rojo
        txtName.style.border = "solid red medium"; //medium, thick = px
        //Es para resaltar el texto
        alertValidacionesTexto.innerHTML = "<strong>El Nombre del producto no es correcto. </strong>";
        //el elemento sea visible y ocupe toda la anchura disponible (un bloque).
        alertValidaciones.style.display = "block";
        isValid= false;
    }//length<3

    if (!validarCantidad()) { //Si regresa false
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "</br><strong>La cantidad no es correcta. </strong>";
        alertValidaciones.style.display = "block";
        isValid= false;
    }//!validarCantidad

    if(isValid){
        cont++;
        let precio = getPrecio();
        let row=`<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
        
                 </tr>`;
        let elemento = {
            "cont": cont,
            "nombre" :txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio
        };
        datos.push(elemento);
        /*guardamos el arreglo en la base de datos, que 
        en este caso solo acepta strings por lo que lo convertimosde 
        un objeto a un atring con JSON*/
        localStorage.setItem("datos",JSON.stringify(datos));


        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText ="$" + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText =  totalEnProductos;

        localStorage.setItem("costoTotal",costoTotal);
        localStorage.setItem("totalEnProductos",totalEnProductos);
        localStorage.setItem("cont",cont);


        txtName.value="";
        txtNumber.value="";
        txtName.focus();

    }//isValid
    



});// btAgregar

btnClear.addEventListener("click",function(event) {
    event.preventDefault();
    txtName.value = "";
    txtNumber.value = "";
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.focus();

    cont=0;
    costoTotal=0;
    totalEnProductos= 0;
    precioTotal.innerText ="$" + costoTotal;
    productosTotal.innerText =  totalEnProductos;
    contadorProductos.innerText = cont;

    cuerpoTabla.innerHTML="";



})//Click Limpiar btnClear

//nos pone el this 
window.addEventListener("load", function(evenet){
    if(this.localStorage.getItem("costoTotal")!=null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));


    }//!null
    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }
    if(this.localStorage.getItem("cont")!=null){
        cont = Number(this.localStorage.getItem("cont"));
    }//!null

    if(this.localStorage.getItem("datos")!=null){
        //convertimos el string en un objeto en este caso un arrey con parse
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//!null
    datos.forEach((r)=>{
        let row=`<tr>
                    <td>${r.cont}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
        
                 </tr>`;
         cuerpoTabla.insertAdjacentHTML("beforeend",row);

    });
        

    precioTotal.innerText ="$" + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText =  totalEnProductos;
})//window load
