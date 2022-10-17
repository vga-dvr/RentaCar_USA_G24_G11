function guardarNuevoGama() {
    //recupera información del formulario
    let nameCar = document.getElementById("name_gama").value
    let description = document.getElementById("description_gama").value
    let objeto = {

        name: nameCar,
        description: description        
    };
    console.log(objeto)
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)

    url = "http://150.136.166.43:8080/api/Gama/save";

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
        alert('Datos Guardados Con exito')
        }
    }

    peticion.open("POST", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
}
//GET 
function traerdatosGamas() {
    url = "http://150.136.166.43:8080/api/Gama/all"
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
          let id = respuesta[i].idGama;
          registros +=
            '<tr>\
                          <th scope="row">' + id +
            "</th>\
             <td>" +
            respuesta[i].name +
            "</td>\
                         <td>" +
            respuesta[i].description +
            "</td>" +          
            '<td>\
            <a class="btn btn-outline-dark" onclick="Editar('+ id +')"  href="update_gama.html" >Modificar</a>\   <button class="btn btn-outline-dark" onclick="eliminar(' +
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
  
   //recupera información del formulario idGama
    let idGamaM = document.getElementById("idGama_modif").value
   let nameCar = document.getElementById("name_modi").value
   let description = document.getElementById("description_modif").value
   let objeto = {
       idGama: idGamaM,
       name: nameCar,
       description: description        
   };

  console.log(objeto)

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  url = "http://150.136.166.43:8080/api/Gama/update"

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
          url: "http://150.136.166.43:8080/api/Gama" + "/" + id,
          type: "DELETE",
          dataType: 'json',
          contentType: 'application/json',
          complete: alert('Eliminado Con  exito'),
          error: function (xhr) { console.log('No funciona'); } // When Service call fails 
          
      })

  }

}



function traerdatosGamaEditar() {
  url = "http://150.136.166.43:8080/api/Gama/all"
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
              let id = respuesta[i].idGama;
              let gama = respuesta[i].description;
              registros += '<option value="' + id + '">' + gama+ "</option>"
          }

          document.getElementById("idGama_modif").innerHTML = registros;
      }
  };

  peticion.open("GET", url, true);
  peticion.send();
}