import  React ,{Component}from 'react';
import { Button, Text, View ,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu'
import MenuSE from './MenuSE'
import { Header , Left , Right } from 'native-base'

function HomeScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      
      <View>
      <Text>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Citas Medicas')}
      />
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

          if (route.name === 'Historial Clinico') {
            iconName = focused ? 'md-document-attach' : 'md-document-attach-outline';
          } else if (route.name === 'Citas Medicas') {
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
        <Tab.Screen name="Historial Clinico" component={HomeScreen} />
        <Tab.Screen name="Citas Medicas" component={SettingsScreen} />
      
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
