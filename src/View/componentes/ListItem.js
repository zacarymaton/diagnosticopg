import React, {Component} from 'react';
import { StyleSheet,Text,View, FlatList, Image,Dimensions,TouchableWithoutFeedback,Animated } from "react-native";

export default class ListItem extends Component{
    state={
        animatePress: new Animated.Value(1)
    }
    animateIn(){
        Animated.timing(this.state.animatePress,{
            toValue:0.4,
            duration:200,
            useNativeDriver:true
        }).start()
    }
    animateOut(){
        Animated.timing(this.state.animatePress,{
            toValue:1,
            duration:200,
            useNativeDriver:true
        }).start()
    }
    _onPress=(props)=>{
      
      //navigation.navigate('notifaciones')
    }
    render(){
        const {itemWidth}=this.props;
        return(
            <TouchableWithoutFeedback
             onPressIn={()=>this.animateIn()}
             onPressOut={()=>this.animateOut()}
             onPress={()=>this._onPress()}            
            >
                <Animated.View style={{
                    margin:5,
                    transform:[
                        {
                            scale:this.state.animatePress
                        }
                    ]
                }}>
                    <Image style={{width:itemWidth,height:150}} source={this.props.image} ></Image>
                </Animated.View>
            </TouchableWithoutFeedback>
        )

    }

}