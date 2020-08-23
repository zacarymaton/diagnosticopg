import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,TouchableOpacity,Image,StatusBar} from 'react-native';


import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {Content,Header,Left,Right,Icon} from 'native-base';
import Mapa from './Mapa'
import CasasFYH from '../CasasFYH';
import Contrato from '../Contrato';
import PagosFYH from '../PagosFYH';
class NavigationDrawerStructure extends Component{
  constructor(props) {
    super(props);
}
lenvantarDrawer=(props)=>{
  // console.warn(this.navigation)
    this.props.navigation.openDrawer();
 }
  toggleDrawer=()=>{
    //this.props.navigation.dispatch(DrawerActions.openDrawer());
    this.props.navigationProps.toggleDrawer();
  };
  render(){
    return(
      <View style={{flexDirection:'row'}}>

        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../imagenes/drawer.jpg')}
            style={{width:25,height:25,marginLeft:5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const CasasUbicaciones=createStackNavigator({
  Casitas:{
    screen:Mapa,
    navigationOptions:({ navigation }) => ({
      title:'Casas  Ofertadas',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1B5E20',
      },
      headerTintColor: '#fff',
    }),
    
  }
});

const ContratoFYH=createStackNavigator({
  ContratoCasa:{
    screen:PagosFYH,
    navigationOptions:({ navigation }) => ({
      title:'Contrato de Casa FYH',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1B5E20',
      },
      headerTintColor: '#fff',
    }),
    
  }
});
const Pagos=createStackNavigator({
  PagosCasa:{
    screen:PagosFYH,
    navigationOptions:({ navigation }) => ({
      title:'Pagos de Casa FYH',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1B5E20',
      },
      headerTintColor: '#fff',
    }),
    
  }
});



const Menu=createDrawerNavigator({
  CasasFYH:{
    screen:CasasUbicaciones,
  },
  Contrato:{
    screen:ContratoFYH,
  },
  PagosFYH:{
    screen:Pagos,
  },
},
{
  initialRouteName: 'CasasFYH',
  drawerBackgroundColor:'transparent',
  drawerWidth:300,
  contentOptions:{
    activeTintColor:'#1B5E20',
    inactiveTintColor:'white',
    inactiveBackgroundColor: 'transparent',
    //activeBackgroundColor:'black'
  },

});
export default createAppContainer(Menu);


