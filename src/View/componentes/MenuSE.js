import React, {Component} from 'react';
import { StyleSheet,Text,View, FlatList, Image,Dimensions } from "react-native";
import ListItem from './ListItem'
const dataList=[{key:'1'}, {key:'2'}, {key:'3'}, {key:'4'} , {key:'5'},{key:'6'}]
const numColumns=2
const WIDTH=Dimensions.get('window').width
import { createStackNavigator } from '@react-navigation/stack';
import TabSE from './TabSE';
const StackSE = createStackNavigator();

function mystackSE() {
  return (
    <StackSE.Navigator
    >
      <StackSE.Screen name="Home" component={MenuSE} options={{  headerShown: false}} />     
      <StackSE.Screen name="TabSE" component={TabSE} options={{ headerShown:false  }}/>
    </StackSE.Navigator>
  );
}


export default class MenuSE extends Component{
  state={
    columns:2
    
  }
  
  formatData=(dataList,numColumns)=>{     
    const totalRows=Math.floor(dataList.length/numColumns)
    let totalLastRow=dataList.length-(totalRows*numColumns)

    while(totalLastRow !== 0 && totalLastRow !== numColumns){
      dataList.push({key:'blank',empty:true})
      totalLastRow++ 
    }
    return dataList
  }

  _renderItem = ({item,index,separators}) => {
    /*const [images, setimages] = useState([
      require('../imagenes/mascota.png'),
      require('../imagenes/mascota.png'),
      require('../imagenes/mascota.png'),
      require('../imagenes/mascota.png'),
      require('../imagenes/mascota.png')
    ]);*/




    let {itemStyle, itemText,itemInvisible}= styles
    if (item.empty){
      return <View style={[itemStyle,itemInvisible]}/>
    }

    return(
      <View style={itemStyle}>
       
      <Text style={itemText}>{item.key}</Text>
      </View>
    )
  }

render(){
  let {container}= styles;
  const {columns}=this.state;
  const {navigate}=this.props.navigation;
  return(
    <View  style={container}>
  <FlatList
   numColumns={columns}
   data={[
     require("../imagenes/mascota.png"),
     require("../imagenes/citaselectronicas.jpg"),
     require("../imagenes/profesionales.png"),
     require("../imagenes/diagnosticos.png"),
     require("../imagenes/adopciones.jpg"),
     require("../imagenes/cuidado.png")
   ]}
   renderItem={({item})=>{
     return <ListItem   navigation={this.props.navigation} itemWidth={(WIDTH-(10*columns))/columns} image={item}  />
   }}  
   keyExtractor={
     (index)=>{return index}
   } 
   
  />
</View>
  )

}

}
const styles=StyleSheet.create({
  container:{
    flex:1,
    paddingTop:0
  },
  itemStyle:{
    backgroundColor:'#3232ff',
    alignItems:'center',
    justifyContent:'center',
    flex: 1,
    margin: 1,
    height: WIDTH / numColumns
  },
  itemText:{
    color:'#fff',
    fontSize:30
  },
  itemInvisible:{
    backgroundColor:'transparent'
  }
})