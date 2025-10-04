const form = document.getElementById("checkout-form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = form.nombre.value;
    const email = form.email.value;
    const direccion = form.direccion.value;
    const telefono = form.telefono.value;
    const metodoPago = form.metodoPago.value;
    const comentarios = form.comentarios.value;
    const numeroTarjeta = form.numeroTarjeta ? form.numeroTarjeta.value : "";
    const vencimiento = form.vencimiento ? form.vencimiento.value : "";
    const cvv = form.cvv ? form.cvv.value : "";

    // Guardar o mostrar en consola (puedes reemplazar por localStorage o enviar a servidor)
    const compra = {
        nombre,
        email,
        direccion,
        telefono,
        metodoPago,
        comentarios,
        numeroTarjeta,
        vencimiento,
        cvv
    };

    console.log("Compra realizada:", compra);
    alert("Gracias por tu compra, " + nombre + "!");

    form.reset();
    document.getElementById("datos-tarjeta").style.display = "none"; // Oculta campos de tarjeta al reiniciar
});

// Mostrar/ocultar campos de tarjeta según método de pago
const metodoPagoSelect = document.getElementById("metodoPago");
const datosTarjeta = document.getElementById("datos-tarjeta");

metodoPagoSelect.addEventListener("change", function() {
    if(this.value === "tarjeta") {
        datosTarjeta.style.display = "block";
    } else {
        datosTarjeta.style.display = "none";
    }
});
