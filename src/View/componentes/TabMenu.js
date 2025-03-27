import  React ,{Component}from 'react';
import { Button, Text, Picker ,View ,StyleSheet ,FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu'
import MenuSE from './MenuSE'
import { Header , Left , Right } from 'native-base'

  
let mismascotas2 = [];
fetch("http://192.168.0.14:8000/api/obtenermascotas", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      IdCliente: '1',
    })
  })
  .then((response) => {
   return response.json();
  })
  .then((resp) => {
    console.log("resp ==> ", mismascotas2);
    mismascotas2= resp.values;
    
     console.log("resp ==> ", mismascotas2);
    
    })
  .catch((error) => {
    console.log("ERROR ==> ", error);

  })
function HomeScreen({ navigation }) {


  



  console.log("afuera ==> ", mismascotas2);
  return (
    
    
    <View style={styles.container}>
      
      <View>
    
    
                {mismascotas2.map( (item, index) => {
              return  <Picker.Item label={ item['NombreMascota']} value= { index} /> ;
                })}
         
      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Historial Clinico')} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabMenu() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Registrar  Mascotas') {
            iconName = focused ? 'md-document-attach' : 'md-document-attach-outline';
          } else if (route.name === 'Mis Macotas') {
            iconName = focused ? 'list-sharp' : 'list-outline';
          }else if (route.name === 'Menu') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            }


          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00838F',
        inactiveTintColor: 'gray',
      }}
      > 
        <Tab.Screen name="Menu" component={Menu} />
        <Tab.Screen name="Mis Macotas" component={HomeScreen} />
        <Tab.Screen name="Registrar  Mascotas" component={SettingsScreen} />
      
      </Tab.Navigator>
   
  );
  
}
const styles=StyleSheet.create({
container:{
  flex:1,
  justifyContent: 'center',
   alignItems: 'center',
   backgroundColor:'#ffff'
}

})
