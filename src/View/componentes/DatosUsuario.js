//React Native FlatList
//https://aboutreact.com/react-native-flatlist/

//import React in our code
import React, {useState} from 'react';
import { Avatar ,Tooltip ,Divider,ListItem , Text,} from 'react-native-elements';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';




//import all the components we are going to use
import {
    FlatList,
    Picker,
    View,
    Button,
    
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';

import Tts from 'react-native-tts';


class Diagnostico extends React.Component {
      constructor() {
        super();
        this.state = {
            dataSource: [],
            datosusuario: [],
            mismascotas: [],
            toxicidades: [],
            diagnosticomascota: [],
            
            user:'',
            mascota:'',
            textorespuesta:'',
            
        }
        
    }
    
    updateUser = (user) => {
      this.setState({ user: user })
     

   }
   updatemascota = (mascotaelegida) => {
     console.log(mascotaelegida);
    this.setState({ mascota: mascotaelegida })
    
    fetch("http://192.168.0.14:8000/api/diagnostico", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IdDiagnostico:  mascotaelegida, 
    
        
      })
    })
    .then((response) => {
    return response.json();
    })
    .then((resp) => {


      this.setState({diagnosticomascota: resp.values })
      console.log("ERROR ==> ", resp.values);
    })
    .catch((error) => {
      console.log("ERROR ==> ", error);

    })



  }
  
    componentWillMount() {        

      fetch("http://192.168.0.14:8000/api/gettoxicidad", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            NombreUsuario: 'leo',
        
            
          })
        })
        .then((response) => {
        return response.json();
        })
        .then((resp) => {
    

          this.setState({toxicidades: resp.values })
        })
        .catch((error) => {
          console.log("ERROR ==> ", error);

        })
    



      }

      componentDidMount()
      {

        fetch("http://192.168.0.14:8000/api/diagnostico", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            IdDiagnostico: 1,
        
            
          })
        })
        .then((response) => {
        return response.json();
        })
        .then((resp) => {
    
    
          this.setState({diagnosticomascota: resp.values })
          console.log("Diagnostico==> ", resp.values);
        })
        .catch((error) => {
          console.log("ERROR ==> ", error);
    
        })
      
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
    

          this.setState({mismascotas: resp.values })
        })
        .catch((error) => {
          console.log("ERROR ==> ", error);

        })


    

        



      }

            
  
      Mascotas=()=>{
      
        console.log("entro al ditmount ===> ",this.state.dataSource);
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
     
  
          this.setState({mismascotas: resp.values })
        })
        .catch((error) => {
          console.log("ERROR ==> ", error);

        })
        console.log("Leo ===> ",this.state.mismascotas);
      }

      Usuario=()=>{
      
       
        fetch("http://192.168.0.14:8000/api/Login", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            NombreUsuario: 'leo',
            Password: '123456',
            
          })
        })
        .then((response) => {
         return response.json();
        })
        .then((resp) => {
     
  
          this.setState({datosusuario: resp.values })
        })
        .catch((error) => {
          console.log("ERROR ==> ", error);

        })
        console.log("Leoy  ===> ",this.state.datosusuario);
      }
      

      GETTOXICIDADES=()=>{
      
       
        fetch("http://192.168.0.14:8000/api/gettoxicidad", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            NombreUsuario: 'leo',
         
            
          })
        })
        .then((response) => {
         return response.json();
        })
        .then((resp) => {
     
  
          this.setState({toxicidades: resp.values })
        })
        .catch((error) => {
          console.log("ERROR ==> ", error);

        })
        console.log("Leoy  ===> ",this.state.toxicidades);
      }
      
      Habla=()=>{
        Tts.speak('La mascota tiene este sintoma y debe  ir al medico ', {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
      
      
       
      }
      Diagnostico=()=>{
        var numero_aleatorio = Math.random();

        numero_aleatorio = Math.floor(numero_aleatorio * 10);
    
       console.log(numero_aleatorio);
        const cadena ='La mascota llamada '+  this.state.mismascotas[this.state.mascota].NombreMascota + ' segun lo que usted selecciono puede tener   , '+ this.state.toxicidades[this.state.user].ObservacionesMedicas + 'Se recomienda '+ this.state.toxicidades[this.state.user].Notas+ 'acertado un '+numero_aleatorio+'por ciento' ;
        Tts.speak(cadena, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
      /*  
        $Nombre= $request->input('NombreDiagnostico');
        $Resultado= $request->input('Resultado');
        $Notas= $request->input('Notas');
        $IdMascota= $request->input('IdMascota');
        
        
      */
      
      fetch("http://192.168.0.14:8000/api/registrardiagnostico", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          NombreDiagnostico: this.state.toxicidades[this.state.user].ObservacionesMedicas ,
          Resultado: cadena,
          Notas: this.state.toxicidades[this.state.user].Notas ,
          IdMascota: this.state.mismascotas[this.state.mascota].Idmascota   , 

        })
      })
      .then((response) => {
       return response.json();
      })
      .then((resp) => {
        console.log("Leo ===> ",resp);

        
      })
      .catch((error) => {
        console.log("ERROR ==> ", error);

      })
      
      
       
      }
      
      
      
      
  render() {
    
      return (
        
        <ScrollView >
   
        <View  style={{    flex: 1, paddingTop: 40,alignItems: "center" ,   }}>
         <View  >
           <Picker  selectedValue = {this.state.idtoxicidad} 
                    style={{ height: 70, width: 350 ,color: 'blue' ,   justifyContent: 'center',   }}
                    onValueChange = {this.updateUser}
                    mode="dropdown"
                    >
                {this.state.toxicidades.map( (item , index) => {
              return <Picker.Item label={ item['TipoDeToxicidad']} value={ index} /> ;
                })}
            </Picker>
            <Picker  selectedValue = {this.state.mascota} 
                    style={{ height: 70, width: 350 ,  color: 'blue' ,   justifyContent: 'center',   }}
                    onValueChange = {this.updatemascota}
                    mode="dropdown"
                    >
                {this.state.mismascotas.map( (item, index) => {
              return <Picker.Item label={ item['NombreMascota']} value= { index} /> ;
                })}
            </Picker>
            <Button
                title="Realizar Diagnostico"    onPress={this.Diagnostico}
              />
              </View>



       <View  style={{   height:500, alignItems: "center" ,   }}>
       <FlatList
        data= {this.state.diagnosticomascota}
        renderItem={({item}) => <Text >{item.NombreDiagnostico}--- {item.FechaD}       </Text>}
      />
       
                
                      
        </View>  
                
        </View> 
        
       
      </ScrollView>
          
        
      )
   
    }


  }
  
  export default Diagnostico