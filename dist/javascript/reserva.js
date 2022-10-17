



function guardarNuevoReserva() {
    //recupera información del formulario
    let id_client_reserva = document.getElementById("idclient_reserva").value
    let idcar_reserva = document.getElementById("idcar_reserva").value
    let startDateVal = document.getElementById("date_start").value
    let devolutionDateVal = document.getElementById("date_end").value
    let objeto = {

        startDate: startDateVal,
        devolutionDate: devolutionDateVal,
        client:{idClient: parseInt(id_client_reserva)},
        car:{idCar: parseInt(idcar_reserva)},        
    };
    console.log(objeto)
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)

    url = "http://150.136.166.43:8080/api/Reservation/save";

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

function traerdatosreservas() {
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();
    url = "http://150.136.166.43:8080/api/Reservation/all"
  
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      //almacena el html para generar los registros de la tabla
      let registros = "";
      //valida si la peticion fue exitosa
      if (this.readyState == 4 && this.status == 200) {
        let respuesta = JSON.parse(this.responseText);
        //console.log("Respuesta despues de convertir a JSON: " + respuesta);
  
        //crear html usando los datos de la respuesta que me da el servicio
        //variable 'respuesta'
        for (let i in respuesta) {
          let id = respuesta[i].idReservation;
          //var inicio = format(new Date(respuesta[i].startDate));
          //var fin = format(new Date(respuesta[i].devolutionDate));
          
          registros +=
            '<tr>\
                          <th scope="row">' +
                          id +
            "</th>\
            <td>" +respuesta[i].startDate+ "</td>\
            <td>" + respuesta[i].devolutionDate+"</td>\
            <td>" + respuesta[i].status + "</td>\
            <td>" + respuesta[i].car.name + " - " + respuesta[i].car.gama.name +"</td>\
            <td>" + respuesta[i].client.email + "</td>\
           <td>" + respuesta[i].score + '</td>\
                           </td>\
                          </tr>';
        }
  
        document.getElementById("registros").innerHTML = registros;
      }
    };
  
    peticion.open("GET", url, true);
    peticion.send();
  }
  



  function traerdatosclientes() {
    url = "http://150.136.166.43:8080/api/Client/all"
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();
  
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      //almacena el html para generar los registros de la tabla
      let registros = "";
      //valida si la peticion fue exitosa
      if (this.readyState == 4 && this.status == 200) {
        let respuesta = JSON.parse(this.responseText);
        
        //crear html usando los datos de la respuesta que me da el servicio
        //variable 'respuesta'
        for (let i in respuesta) {
          let id = respuesta[i].idClient;
          let clientes = respuesta[i].name;
          
          registros += '<option value="' + id + '">' + clientes + "</option>"
        }
  
        document.getElementById("idclient_reserva").innerHTML = registros;
      }
    };
  
    peticion.open("GET", url, true);
    peticion.send();
  }





  function traerdatosCarros() {
    url = "http://150.136.166.43:8080/api/Car/all"
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();

    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
        //almacena el html para generar los registros de la tabla
        let registros = "";
        //valida si la peticion fue exitosa
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            //crear html usando los datos de la respuesta que me da el servicio
            //variable 'respuesta'
            for (let i in respuesta) {
                let id = respuesta[i].idCar;
                let clientes = respuesta[i].name;
                registros += '<option value="' + id + '">' + clientes + "</option>"
            }

            document.getElementById("idcar_reserva").innerHTML = registros;
        }
    };

    peticion.open("GET", url, true);
    peticion.send();
}

