import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, TouchableOpacity, View,SafeAreaView,Image,Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
  import { createStackNavigator } from '@react-navigation/stack';  
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import  MenuPrincipal from '../componentes/GritMenu';
const Stack = createStackNavigator();
function HomeScreen({ navigation }) {
  
  return (
    <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="Menu"
          component={FirstPage}
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
        />
          
      </Stack.Navigator>

  );
}
function Notifacaciones({navigation}){

}
function NotificationsScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


const FirstPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 , padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
           Aca Se Realizara el Menu del Sistema Experto
          </Text>
          <Button
            onPress={() => navigation.navigate('SecondPage')}
            title="Go to Second Page"
          />
          <Button
            onPress={() => navigation.navigate('ThirdPage')}
            title="Go to Third Page"
          />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Navigate Drawer
        </Text>
        <Text
          style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
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
function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{height:150, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
      <Image style={{height:120,width:120,borderRadius:60}} source={require('../imagenes/logo.png')}/>
      </View>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Perfil de Usuario"
        onPress={() => props.navigation.closeDrawer()}  icon={({tintColor})=>(
          <Icon name='people-sharp' style={{fontSize:24,color:tintColor}}/>
        )}

      />
      <DrawerItem
        label="Configuracion"
        /* toggle drawer*/
        onPress={() => props.navigation.toggleDrawer()} icon={({tintColor})=>(
          <Icon name='settings-outline' style={{fontSize:24,color:tintColor}}/>
        )}
      />
      <DrawerItem label="Cerrar Sesion" 
      onPress={() => props.navigation.navigate('Home')} icon={({tintColor})=>(
        <Icon name='close-circle-sharp' style={{fontSize:24,color:tintColor}}/>
      )}
      />
    
    </DrawerContentScrollView>
    </SafeAreaView>
  );
}


const Drawer = createDrawerNavigator();

export default function Menu() {
  
  return (
  
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor:'#00838F',
        itemStyle:{marginVertical:5}
      }}
      >
        <Drawer.Screen name="Mis Mascotas" component={MenuPrincipal}    options={{
              headerShown: true,          
              drawerIcon:({tintColor})=>(
                <Icon name='home-sharp' style={{fontSize:24,color:tintColor}}/>
              ),
              activeTintColor:'#00838F',
          }}/>
        <Drawer.Screen name="Notificaciones" component={NotificationsScreen}    options={{
              headerShown: true,    
              drawerIcon:({tintColor})=>(
                <Icon name='ios-barcode' style={{fontSize:24,color:tintColor}}/>
              ),        
             
          }}/>
     
      </Drawer.Navigator>
  
  );
}
