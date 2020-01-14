import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    View
} from 'react-native';
import axios from 'axios';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default function HomeScreen() {
    return <AppContainer/>;

}

HomeScreen.navigationOptions = {
    header: null
};
//Main PokeDex page
class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={ require('../assets/images/pokemon-logo-vector.png')}
                            style={styles.welcomeImage}/>
                        <View
                            style={{
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                          <Text style={styles.getStartedText}>
                            Click on the button below to get your random Pokemon
                          </Text>
                          <View  style={styles.welcomeButton}>
                            <Button
                                style={styles.welcomeButton}
                                title="Get Your Pokemon"
                                onPress={() => this.props.navigation.navigate('GetPokemon')}/>
                          </View>
                        </View>

                    </View>

                </ScrollView>

            </View>
        );
    }
}

class PokemonGet extends React.Component {
    // set state object of pokemon
    state = {
        pokemon: []
    }
    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          msElapsed: 0,
          random: 0,
          pokemonSprite: '',
      };
    }
    componentDidMount() {
      //assign move to random number for object
        let moveNumberOne = Math.floor(Math.random() * 10) + 1;
        let moveNumberTwo = Math.floor(Math.random() * 20) + 11;
        let moveNumberThree = Math.floor(Math.random() * 30) + 12;
        let moveNumberFour = Math.floor(Math.random() * 30) + 13;
        //assign end of api call to random number
        let APINumber = Math.floor(Math.random() * 300) + 1;
        let APIString = String(APINumber);
        console.log(APIString);
        axios
        // make the call to the pokemon api
            .get(`https://pokeapi.co/api/v2/pokemon/` + APIString)
            .then(res => {
                const pokemon = res.data;
                console.log(pokemon);
                this.setState({
                    pokemonName: pokemon.species.name,
                    pokemonSprite: pokemon.sprites.front_default,
                    moveOne: pokemon.moves[moveNumberOne].move.name,
                    moveTwo: pokemon.moves[moveNumberTwo].move.name,
                    moveThree: pokemon.moves[moveNumberThree].move.name,
                    moveFour: pokemon.moves[moveNumberFour].move.name,
                    color: pokemon.species.id,
                    isLoading: false,
                    pokemonHeight: pokemon.height,
                    pokemonWeight: pokemon.weight,
                    pokemonTypeOne: pokemon.types[0].type.name,
                    //pokemonTypeTwo: pokemon.types[1].type.name,
                });
            })
    }
    render() {
      // show loading animation while waiting on axios 
      if (this.state.isLoading == true ){
        return (
          <ActivityIndicator size="large" color="#0000ff" />
        );

        // return pokemon and move set from api
      }else if (this.state.isLoading == false){
          return (
            <View style={styles.getStartedContainer}>
                <Text style={styles.developmentModeText}>{this.state.pokemonName}</Text>
                <Text style={styles.infoText}>Type: {this.state.pokemonTypeOne}</Text>
                <Image source={{uri: this.state.pokemonSprite}} style={styles.pokemonImage}/>
                <Text style={styles.infoText}>Height: {this.state.pokemonHeight}ft</Text>
                <Text style={styles.infoText}>Weight: {this.state.pokemonWeight} pounds</Text>
                <View  style={styles.moveButtonLayout}>
                    <View style={styles.moveButtonsOuter}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                      <Text style={styles.moveButtonsInner}>
                        {this.state.moveOne}
                      </Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.moveButtonsOuter}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                        <Text style={styles.moveButtonsInner}>
                          {this.state.moveTwo}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View  style={styles.moveButtonLayout}> 
                    <View style={styles.moveButtonsOuter}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                        <Text style={styles.moveButtonsInner}>
                          {this.state.moveThree}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.moveButtonsOuter}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                        <Text style={styles.moveButtonsInner}>
                          {this.state.moveFour}
                        </Text>
                      </TouchableOpacity>
                    </View>

                </View>
            </View>

        );
      }
      
    }
}

const RootStack = createStackNavigator({Home: Main, GetPokemon: PokemonGet});

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    developmentModeText: {
        marginBottom: 0,
        marginTop: 10,
        color: 'rgba(0,0,0,1)',
        fontFamily: 'sans-serif',
        fontSize: 30,
        lineHeight: 29,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    infoText: {
      marginBottom: 0,
      marginTop: 8,
      color: 'rgba(96,100,109, 1)',
      fontFamily: 'sans-serif',
      fontSize: 15,
      lineHeight: 18,
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    moveButtonLayout: {
        flexDirection: 'row',
        marginRight: 5,
    },  
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 200,
        height: 100,
        marginTop: 3,
        marginLeft: -10
    },
    welcomeButton: {
      width: 200,
      height: 100,
      marginTop: 30,
      marginLeft: -10
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50
    },
    getStartedText: {
        fontSize: 15,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        padding: 20,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: -3
                },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center'
    },
    navigationFilename: {
        marginTop: 5
    },
    moveButtonsOuter: {
        marginTop: 5,
        marginRight: 5,
        
       // flex: 1
    },
    moveButtonsInner:{
        backgroundColor: '#333',
        fontSize: 17,
        textAlign: 'center',
        padding: 12,
        color: '#fff',
        textTransform: 'uppercase',
        borderRadius: 10,
    },
    pokemonImage: {
        width: 200,
        height: 200,
        //resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10
    }
});
