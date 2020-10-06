import React from 'react';
import {  StyleSheet, Text, View,StatusBar, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  nombre: t.String,              // a required string  // an optional string
  tipo: t.Number,               // a required number
  fechanacimiento: t.String,               // a required number
  color:t.String,
  nota: t.String,	//requiere de una cadena
  sexo: t.String

  
  //requiere de una cadena 
//  AceptarTerminos: t.Boolean        // a boolean
})

var options = {
 fields: {
    nombre: {
	  placeholder: 'Ingresa el Nombre de la mascota',
      error: 'no inserto nombre'
    },
    tipo: {
		placeholder: 'Ingresa el tipo de animal',
      error: 'no inserto el tipo',
    },
	color: {
		
		placeholder: 'Ingresa el color',
      error: 'no ingreso el color ',
    },
    sexo: {
		placeholder: 'Ingresa macho o hembra',
      error: 'no ingreso el sexo ',
    },
 /*  AceptarTerminos: {
      label: 'Aceptar Los Terminos',
    },*/
	nota: {
      label: 'Nota',
	  placeholder: 'no ingreso ',
    },
  },
  
	
} // optional rendering options (see documentation)

class RegistroMascota extends React.Component {
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
    if (Person) { // if validation fails, value will be null
       // value here is an instance of Person
      fetch("http://192.168.0.10:8000/api/registromascota", {
     
        method: "POST",
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        //  idusuario: 29,
          NombreMascota: value.nombre ,
          Tipo: value.tipo,
          FechaNacimiento: value.fechanacimiento,
          Color: value.color,
          Nota: value.nota,
          Sexo: value.sexo
          
        })
      })
      .then((response) => response.json())
      .then((resp) => {
        if (resp.values) {
        
          alert("Registro Satisfactorio");
          this.props.navigation.navigate('Home');
        } else {
       console.log("LLEGO ==> ", resp.values); 
  
          alert( "Error Ocurrio un problema al registrar");
        }
      })
      .catch((error) => {
        console.log("ERROR ==> ", error);
        alert("Error no se pudo conectar con el servidor");
      })
      
    }else{
      alert("Error");
    }
    console.log("value ===> ",value);
    console.log("PERSONA ===> ",Person);
    
    
 

	//this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <StatusBar
        backgroundColor='#00838F' barStyle='light-content'/>
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
    alignSelf: 'center',
    borderRadius:25,
  },
  button: {
    height: 36,
    backgroundColor: '#00838F',
    borderColor: '#003300',
    borderWidth: 1,
    borderRadius:25,    
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

export default RegistroMascota