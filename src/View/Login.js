import React, {Component} from 'react';
import { StyleSheet, Text,TouchableOpacity, View,StatusBar, AsyncStorage} from 'react-native';

import Logo from './componentes/Logo';
import Form from './componentes/Form';
import LogoCorreo from './componentes/LogoCorreo';


export default class Login extends Component {
	constructor(props) {
        super(props);
    }

    async leer() {
      console.log("empzo a guardar-......")
      try {
        const value = await AsyncStorage.getItem('JUAN');
        if (value !== null) {
          // We have data!!
          console.log("VALOR LEIDO ===> ", value);
        } else {
          console.log("VALOR LEIDO ===> ", value);
        }
      } catch (error) {
        // Error retrieving data
      }
    }

    async guardar() {
      console.log("empzo a guardar-......")
      try {
        await AsyncStorage.setItem('JUAN', 'hola mundo');
      } catch (error) {
        // Error saving data
      }
    }
  
    componentDidMount() {
      this.leer();
      this.guardar();
      this.leer();

    }
	
  RegistroCorreo=(props)=>{
  //  console.warn(this.props)
    
    this.props.navigation.navigate('Registrate');
  }
  render() {
	  const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
       <StatusBar
        backgroundColor='#003300' barStyle='light-content'/>
        <Logo/>
        <Form style="Login" navigation={this.props.navigation}  />
            <View style={styles.RegistrateAhora}>
              <Text style={styles.signupText}>Aun no tienes cuenta? </Text>
              <TouchableOpacity onPress={this.RegistroCorreo} navigation={this.props.navigation} >
              <Text style={styles.signupButton}>Registrate</Text>
              </TouchableOpacity>
          </View>             
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1B5E20',
    },
    RegistrateAhora: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical:16,
      alignItems: 'flex-end',
      flexDirection:'row'
    },
    EstiloTexto:{
      color: '#ffffff',
      fontSize:18
  
    },
    signupText:{
      color:'rgba(255,255,255,0.7)',
      fontSize:16,
    },
    signupButton:{
      color: '#ffffff',
      fontSize:19,
      fontWeight:'500',
    },
  });