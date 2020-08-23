import React, {Component} from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';




export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}> 
	     <Text style={styles.EstiloTexto}>"Find your house"</Text>
			<Image  style={{width: 350,height:200}} borderRadius={40} source={require('../imagenes/logo.png')}/>
			<Text style={styles.EstiloTexto}>Arrendador</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    EstiloTexto:{
      marginVertical:15,
      color: 'rgba(255,255,255,0.7)',
      fontSize:18
  
    }
  });