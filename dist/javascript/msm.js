function guardarNuevoMensaje() {
    //recupera información del formulario
    let msmCar = document.getElementById("name_msn").value
    let idMsm = document.getElementById("idClient").value
    let carId = document.getElementById("car_id_msn").value
    let objeto = {

        messageText: msmCar,
        client:{idClient: parseInt(idMsm)},
        car:{idCar: parseInt(carId)},        
    };
    console.log(objeto)
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)

    url = "http://150.136.166.43:8080/api/Message/save";

    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()

    /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
    peticion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

        //Configura el aspecto de la pagina
        alert("Registros Guardados Con exito")
        }
    }

    peticion.open("POST", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
}


function traerdatosmsm() {
    let registros = ""
    let id = ""
    url = "http://150.136.166.43:8080/api/Message/all"

    let xhttp = new XMLHttpRequest();
    let salida = "<strong>Texto del mensaje :</strong>";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            for (let i in respuesta) {
                id = respuesta[i].idMessage
                registros += "<tr>\
                        <th scope=\"row\">" + id + "</th>\
                        <td>" + respuesta[i].messageText + "</td>\
                        <td>" + respuesta[i].car.idCar + "</td>\
                        <td>" + respuesta[i].car.name + "</td>\
                        <td>" + respuesta[i].car.description + " - " + respuesta[i].car.gama.name +"</td>\
                        <td>" + respuesta[i].client.name + "</td>\
                        <td>\
                        </tr>"

            }

            document.getElementById("registros").innerHTML = registros;

            
        }
    };
    xhttp.open(
        "GET",
        url,
        true
    );
    xhttp.send();
}





function Editar(id) {
    alert('Recuerda que tu ID es'+ id )
    //1 crear un objeto XMLHttpRequest
    }
  



  function guardarEditar() {
    
    //recuperar la informacion ingresada en el formulario
    //recupera información del formulario
    let msmCar = document.getElementById("name_msn").value
    let idMsm = document.getElementById("idClient").value
    let carId = document.getElementById("car_id_msn").value
    let objeto = {

        messageText: msmCar,
        client:{idClient: parseInt(idMsm)},
        car:{idCar: parseInt(carId)},        
    };
    console.log(objeto)

    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)
  
    url = "http://150.136.166.43:8080/api/Client/update"
  
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()
  
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 201) {
  
        //Configura el aspecto de la pagina
      alert('Registro Cambiado')
      }
    }
  
    peticion.open("PUT", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
  }


  function eliminarclient(id) {
    if (confirm("Desea Eliminar el Registro Id " + id + " ?.")) {
        console.log(id)
        
        $.ajax({
            url: "http://150.136.166.43:8080/api/Client" + "/" + id,
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json',
            complete: alert('Eliminado Con  exito'),
            error: function (xhr) { console.log('No funciona'); } // When Service call fails 
            
        })
  
    }

}

