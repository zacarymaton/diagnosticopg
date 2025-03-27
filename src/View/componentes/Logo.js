
import React, {Component} from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';




export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}> 
	     <Text style={styles.EstiloTexto}>"Diagonosticador de Mascotas"</Text>
			<Image  style={{width: 350,height:200}} borderRadius={90} backgroundColor={'#00838F'} source={require('../imagenes/logo.png')}/>
			<Text style={styles.EstiloTexto}>Cliente</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    EstiloTexto:{
      marginVertical:15,
      color:'#ffffff',
      fontSize:20
  
    }
  });