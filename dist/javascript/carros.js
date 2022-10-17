function guardarNuevo() {
    //recupera información del formulario
    let nameCar = document.getElementById("name").value
    let gamaCar = document.getElementById("gama").value
    let brandCar = document.getElementById("brand").value
    let descriptioncar = document.getElementById("description").value
    let year = document.getElementById("year").value

    let objeto = {
        name: nameCar,
        brand: brandCar,
        year: parseInt(year),
        description: descriptioncar,
        gama: { idGama: parseInt(gamaCar) }


    };

    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)
    console.log(objetoJson)

    url = "http://150.136.166.43:8080/api/Car/save";

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
            alert('Guardado Con exito Verifica la tabla')
        }
    }

    peticion.open("POST", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
}

//Funcio para traer 
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
                registros +=
                    '<tr>\
                          <th scope="row">' + id +
                    "</th>\
                     <td>" +
                    respuesta[i].name +
                    "</td>\
                    <td>" +
                    respuesta[i].brand +
                    "</td>\
                    <td>" +
                    respuesta[i].year +
                    "</td>\
                          <td>" +
                    respuesta[i].description +
                    "</td>" +
                    '<td>\
                    <a class="btn btn-outline-dark" onclick="Editar('+ id +')"  href="update_car.html" >Modificar</a>\
                              <button class="btn btn-outline-dark" onclick="eliminar(' +
                    id +
                    ')" >Borrar</button>\
                          </td>\
                          </tr>';
            }

            document.getElementById("registros").innerHTML = registros;
        }
    };

    peticion.open("GET", url, true);
    peticion.send();
}






function Editar(id) {
    alert('Recuerda que tu ID es'+ id )
    //1 crear un objeto XMLHttpRequest
    }
  



  function guardarEditar() {
    
    //recuperar la informacion ingresada en el formulario
    
    let idModif = document.getElementById("idModif").value
    let nameCar = document.getElementById("nameModif").value
    let gamaCar = document.getElementById("gamaModif").value
    let brandCar = document.getElementById("brandModif").value
    let descriptioncar = document.getElementById("description").value
    let year = document.getElementById("yearModif").value

    let objeto = {
        idCar: idModif,  
        name: nameCar,
        brand: brandCar,
        year: parseInt(year),
        description: descriptioncar,
        gama: { idGama: parseInt(gamaCar) }


    };








    console.log(objeto)

    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)
  
    url = "http://150.136.166.43:8080/api/Car/update"
  
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


  function eliminar(id) {
    if (confirm("Desea Eliminar el Registro Id " + id + " ?.")) {
        console.log(id)
        
        $.ajax({
            url: "http://150.136.166.43:8080/api/Car" + "/" + id,
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json',
            complete: alert('Eliminado Con  exito'),
            error: function (xhr) { console.log('No funciona'); } // When Service call fails 
            
        })
  
    }

}





function traerdatosCarrosEditar() {
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

            document.getElementById("idModif").innerHTML = registros;
        }
    };

    peticion.open("GET", url, true);
    peticion.send();
}