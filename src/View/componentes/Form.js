import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,TouchableOpacity,StatusBar} from 'react-native';

export default class Form extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
        };
    }


    Acceso=(props)=>{
      console.log("ENTRO AL LOGIN===========================================");
      //this.props.navigation.navigate('Tab');
    //   console.warn(this.props) con esto puedo mostrar en pantalla lo que deseo mostrar
    //Aca diseñaremos el login que hara la autentificacion con firebase
    console.log("ENTRO AL LOGIN===========================================0");
    console.log('EMAIL ==> ', this.state.email);
    console.log('PASS ==> ', this.state.password);
    fetch("http://192.168.0.14:8000/api/Login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        NombreUsuario: this.state.email,
        Password: this.state.password
      })
    })
    .then((response) => {
      //console.warn("RESPONSE TOTAL ", response);
      return response.json();
    })
    .then((resp) => {
      console.log("============ ", resp);
      //resp = JSON.parse(resp);
      if (resp.values) {
       // this.props.navigation.navigate('Menu');
        this.props.navigation.navigate('Tab');
      } else {
        alert("Error Correo o contrasenia incorrectos");
      }
    })
    .catch((error) => {
      alert(error);
      console.log("Error ==> " , error.TypeError);
    })
    
      //this.props.navigation.navigate('Menu');
    }
  
    onChangeEmail(value) {
      console.log("VA EMAIL ", value);
      this.setState({
        email: value
      })
    }

    onChangePassword(value) {
      this.setState({
        password: value
      })
    }
  render() {
    return (
      <View style={styles.container}> 
	      
        <TextInput 
          style={styles.inputBox} 
          placeholder="Email " 
          keyboardType="email-address" 
          placeholderTextColor="#ffffff"
          onSubmitEditing={()=>this.password.focus()}
          onChangeText={this.onChangeEmail.bind(this)}
        />
        <TextInput 
          style={styles.inputBox} 
          placeholder="Password" 
          secureTextEntry={true} 
          placeholderTextColor="#ffffff"
          ref={(input)=>this.password=input}
          onChangeText={this.onChangePassword.bind(this)}
        />
        <TouchableOpacity style={styles.Button} onPress={this.Acceso} navigation={this.props.navigation}>
            <Text style={styles.ButtonText}>{this.props.type}Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox:{
        width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical:10,
    },
    Button:{
        width:300,
        backgroundColor:'#00838F',
        borderColor: '#003300',
        borderRadius:25,
        marginVertical:10,
        paddingVertical:13,
    },
    ButtonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    }
  });