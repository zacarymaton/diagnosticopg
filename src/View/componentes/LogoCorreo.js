import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity} from 'react-native';




export default class LogoCorreo extends Component {
	   constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
        };
    }


    Acceso=(props)=>{
    //   console.warn(this.props) con esto puedo mostrar en pantalla lo que deseo mostrar
    //Aca diseñaremos el login que hara la autentificacion con firebase
    
    
    this.props.navigation.navigate('Home');
      }
  render() {
    return (
      <View style={styles.container}> 
      <Image style={{width: 350,height:200}} borderRadius={40} source={require('../imagenes/correoIcono.png')}/>
      <Text style={styles.EstiloTexto}>Para Registrarte Envianos tu Correo Electronico</Text>
	    <TextInput 
        style={styles.inputBox} 
        placeholder="Email" 
        keyboardType="email-address" 
        placeholderTextColor="#ffffff"
        />
		<TouchableOpacity style={styles.Button} onPress={this.Acceso} navigation={this.props.navigation}>
            <Text style={styles.ButtonText}>{this.props.type}enviar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
	  backgroundColor: '#1B5E20'
    },
    EstiloTexto:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
  
    },
	 Button:{
        width:300,
        backgroundColor:'#003300',
        borderRadius:25,
        marginVertical:10,
        paddingVertical:13,
    },
	    ButtonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    },
	inputBox:{
        width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical:10,
    }
  });