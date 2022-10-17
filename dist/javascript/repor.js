/**
const endpoint = "http://150.136.166.43:8080/api/Client"

$(document).ready(function() {
    getCliente()

})


 * funcion para mostrar los registros del cliente

function getCliente() {
    let tam = 0
    $.ajax({
        url: endpoint + "/all",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data)
            tam = data.length
            let registro = ""
            if (tam == 0) {
                $("#contenedor").hide()
                $("#mensaje").show()
            } else {
                $("#contenedor").show()
                $("#mensaje").hide()
                $("#numregistro").html("Numero de Registros: " + tam)
                $.each(data, function(index, client) {
                    registro += "<tr>" +
                        "<td>" + client.idClient + "</td>" +
                        "<td>" + client.email + "</td>" +
                        "<td>" + client.password + "</td>" +
                        "<td>" + client.name + "</td>" +
                        "<td>" + client.age + "</td>" +
                        "<td>" +
                        "<button class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalactualizar'" +
                        "onclick=\"ver('" + client.idClient + "','" + client.email + "','" + client.password + "','" + client.name + "','" + client.age + "')\"" +
                        ">Actualizar</button>&nbsp;" +
                        "<button class='btn btn-danger ml' " +
                        "onclick=\"eliminar('" + client.idClient + "')\"" +
                        ">Eliminar</button>" +
                        "</td>" +
                        "</tr>"
                })
                $("#tbody").html(registro)
            }
        }
    });
}

 * actualizar registro

function ver(idClient, email, password, name, age) {

    $("#idclient").val(idClient)
    $("#email").val(email)
    $("#password").val(password)
    $("#name").val(name)
    $("#age").val(age)


}

function actualizar() {

    let cliente = {
        idClient: $("#idclient").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    }
    let dataJson = JSON.stringify(cliente)

    if (confirm("Desea Actualizar el Registo ?")) {
        $.ajax({
            url: endpoint + "/update",
            type: 'PUT',
            data: dataJson,
            dataType: 'json',
            contentType: 'application/json',
            complete: function(data) {
                if (data.status == "201") {
                    alert("Actualio Cliente con exito!!")
                } else {
                    alert("Problemas al Actualizar consulte con el Administrador!!")
                }
                getCliente()
            }
        })

    }
}


 *Eliminar registro del cliente por id primary key 
function eliminar(idClient) {
    if (confirm("Desea Eliminar el Registro Id " + idClient + " ?.")) {
        console.log(idClient)
        $.ajax({
            url: endpoint + "/" + idClient,
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json',
            complete: function(data) {
                getCliente()
            }
        })
    }

}

*/


function traerdatosCar() {
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
          let id = respuesta[i].idClient;
          registros +=
            '<tr>\
                          <th scope="row">' + id +
            "</th>\
             <td>" +
            respuesta[i].name +
            "</td>\
                          <td>" +
            respuesta[i].email +
            "</td>\
                          <td>" +
            respuesta[i].age +
            "</td>" +          
            '<td>\
              <button class="btn btn-outline-dark" onclick="editar(' +
            id +
            ')" disabled>Modificar</button>\
                              <button class="btn btn-outline-dark" onclick="eliminar(' +
            id +
            ')" disabled>Borrar</button>\
                          </td>\
                          </tr>';
        }
  
        document.getElementById("registros").innerHTML = registros;
      }
    };
  
    peticion.open("GET", url, true);
    peticion.send();
  }