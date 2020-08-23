import React from 'react';
import {  StyleSheet, Text, View,StatusBar, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  nombre: t.String,              // a required string
  usuario: t.maybe(t.String),  // an optional string
  edad: t.Number,               // a required number
  correo: t.String,	//requiere de una cadena
  contrasenia: t.String, 			//requiere de una cadena 
//  AceptarTerminos: t.Boolean        // a boolean
})

var options = {
 fields: {
    nombre: {
	  placeholder: 'Ingresa su Nombre Completo',
      error: 'Tu no has registrado tu nombre'
    },
    correo: {
		placeholder: 'Ingresa su Direccion de Correo Preferida',
      error: 'ingrese una direccion de correo Electronico',
    },
	contrasenia: {
		password: true,
	secureTextEntry: true,
		placeholder: 'Ingresa su contraseña',
      error: 'ingrese una contraseña',
    },
 /*  AceptarTerminos: {
      label: 'Aceptar Los Terminos',
    },*/
	usuario: {
      label: 'Nombre de Usuario (Opcional)',
	  placeholder: 'Ingresa su Nombre de Usuario',
    },
  },
  
	
} // optional rendering options (see documentation)

class Registro extends React.Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
	
  }
  limpiarEdit(){
    this.setState({value:null});
  }

  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log("PERSONA ===> ",value) // value here is an instance of Person
    }

  fetch("http://findyourhousesw1.000webhostapp.com/WS/registrar_usuario.php", {
     
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      //  idusuario: 29,
        correo: value.correo,
        contrasenia: value.contrasenia,
        nombre: value.nombre,
        usuario: value.usuario,
        edad: value.edad
      })
    })
    .then((response) => response.json())
    .then((resp) => {
      if (resp.ok) {
		  
        alert("Registro Satisfactorio");
        this.props.navigation.navigate('Home');
      } else {
		 console.log("LLEGO ==> ", resp.ok); 
        alert( "Error Ocurrio un problema al registrar");
      }
    })
    .catch((error) => {
      console.log("ERROR ==> ", error);
      alert("Error no se pudo conectar con el servidor");
    })

	//this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
		     <StatusBar
        backgroundColor='#003300' barStyle='light-content'/>
        <Form
          ref="form"
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#003300',
    borderColor: '#003300',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

export default Registro