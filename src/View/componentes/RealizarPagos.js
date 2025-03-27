import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert,  } from "react-native";
import Modal from "react-native-modalbox";
import { Card, Button, Divider, Image } from "react-native-elements";

export default class RealizarPago extends Component{
  
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }
    _showAlert = () => {
   this.refs.modal4.close();
      Alert.alert(
      'EL pago se ha realizado correctamente',
      'Gracias por su preferencia',
      [
        {text: 'OK', onPress: () =>{() => {
        this.setState({isOpen: false})
    } }},
      ],
    )
  }
    render() {
      return (
        <View style={styles.container}>
          <Card>
            <Image
              style={styles.cardImage}
              source={{
                uri:
                  "https://www.agiliacenter.com/wp-content/uploads/2018/02/1_bUtWGJQv8QFXTkLF_WBINA-1200x440.png"
              }}
            />
            <Divider
              style={{
                backgroundColor: "blue",
                marginBottom: 10,
                marginTop: 10
              }}
            />
            <Button
              title="Pagar Alquiler"
              type="outline"
              onPress={() => this.refs.modal4.open()}
              style={styles.btn}
            />
          </Card>
          <Modal style={[styles.modal4]} position={"bottom"} ref={"modal4"}>
            <View style={styles.container}>
              <Text style={styles.bntext}>
                El alquiler de este mes es de: 600 bs
              </Text>
            </View>
            <View style={styles.row}>
              <Button
                title="Cancelar"
                buttonStyle={styles.btn}
                onPress={() => this.refs.modal4.close()}
              />
              <Button
                title="Pagar"
                buttonStyle={styles.btn}
                onPress={this._showAlert}
              />
            </View>
          </Modal>
        </View>
      );
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bntext:{
    paddingTop:10,
    paddingLeft:10,
    fontSize:20,
    fontFamily: 'Clone',
  },
  row: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  cardText: {
    padding: 10,
    fontSize: 15
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  modal: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  modal4: {
    height: 150
  }
});