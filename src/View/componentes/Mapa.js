import React, {Component} from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
console.disableYellowBox = true;
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

const Images = [
  { uri: "https://clasificados.eldeber.com.bo/sites/default/files/styles/classified_big/public/0000199588.JPG?itok=Hd9pp1CP" },
  { uri: "https://clasificados.eldeber.com.bo/sites/default/files/styles/classified_big/public/0000199624_0.JPG?itok=RTk1UFxT" },
  { uri: "https://clasificados.eldeber.com.bo/sites/default/files/styles/fotos_web_principal_722x542_/public/0000200171.JPG?itok=58DWDc3W" },
  { uri: "https://clasificados.eldeber.com.bo/sites/default/files/styles/classified_big/public/imagenes_clasificados/2019_09/W004361207.jpg?itok=pWptT9B6" }
]


const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class Mapa extends Component {
state = {
  markers: [
    {
      coordinate: {
        latitude: -17.7832,
        longitude: -63.182,
      },
      title: "Casa en Alquiler",
      description: "Casa Amplia con finos acabados a tan solo 500 Bs",
      image: Images[0],
    },
    {
      coordinate: {
        latitude: -17.8055082,
        longitude: -63.1660259,
      },
      title: "Casa en Venta",
      description: "Casa con Amplio patio",
      image: Images[1],
    },
    {
      coordinate: {
        latitude: -17.7758102,
        longitude: -63.1738498,
      },
      title: "Third Best Place",
      description: "This is the third best place in Portland",
      image: Images[2],
    },
    {
      coordinate: {
        latitude: -17.7813,
        longitude: -63.173,
      },
      title: "Fourth Best Place",
      description: "This is the fourth best place in Portland",
      image: Images[3],
    },
  ],
  region: {
    latitude: -17.7832,
    longitude: -63.182,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  },
};

componentWillMount() {
  this.index = 0;
  this.animation = new Animated.Value(0);
}
componentDidMount() {
  // We should detect when scrolling has stopped then animate
  // We should just debounce the event listener here
  this.animation.addListener(({ value }) => {
    let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
    if (index >= this.state.markers.length) {
      index = this.state.markers.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }

    clearTimeout(this.regionTimeout);
    this.regionTimeout = setTimeout(() => {
      if (this.index !== index) {
        this.index = index;
        const { coordinate } = this.state.markers[index];
        this.map.animateToRegion(
          {
            ...coordinate,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          },
          350
        );
      }
    }, 10);
  });
}

render() {
  const interpolations = this.state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = this.animation.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp",
    });
    const opacity = this.animation.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp",
    });
    return { scale, opacity };
  });


  return (
    <View style={styles.container}>
      <MapView
        ref={map => this.map = map}
        initialRegion={this.state.region}
        style={styles.container}
      >
        {this.state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const opacityStyle = {
            opacity: interpolations[index].opacity,
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate}
            image={require("../imagenes/icono.png")}
            >
              <Animated.View style={[styles.markerWrap, opacityStyle]}>
                <Animated.View style={[styles.ring, scaleStyle]} />
                <View style={styles.marker} />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {this.state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 6,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 4,
    //backgroundColor: "rgba(187, 47, 47, 0.9)",
  },
  ring: {
    width: 30,
    height: 30,
    borderRadius: 20,
//    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
//    borderColor: "rgba(130,4,150, 0.5)",
  },
});