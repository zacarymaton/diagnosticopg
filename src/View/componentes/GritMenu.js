import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, TouchableOpacity, View,SafeAreaView,Image,Text ,FlatList, Dimensions} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';  

import MenuSE from './MenuSE'
import ListItem from './ListItem'

const Stack = createStackNavigator();
export default function MenuPrincipal({ navigation }) {
    return (
      <Stack.Navigator initialRouteName="FirstPage" >
          <Stack.Screen name="Menu"    component={MenuSE}
            options={{
              title: 'Menu', //Set Header Title
              headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {
                backgroundColor: '#00B8D4', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }} 
            navigationProps={navigation}
          />
         <Stack.Screen name="notifaciones"    component={NotificationsScreen} options={{
              title: 'Segunda Pantalla', //Set Header Title
              headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {
                backgroundColor: '#00B8D4', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }} 
            navigationProps={navigation}
            />
        </Stack.Navigator>
  
    );
  }

 const GritMenu = ({ navigation }) => {
    return (
      <SafeAreaView style={{ flex: 1 }} >        
        <MenuSE navigation={navigation}/>     
      </SafeAreaView >
    );
  }
  function NotificationsScreen({ navigation }) {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  const NavigationDrawerStructure = (props)=> {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer();
    };
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=> toggleDrawer()}>
          {/*Donute Button Image */}
          <Image
            source={require('../imagenes/menu.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }