import React from 'react';
import { ScrollView, StyleSheet, View, Image, Button, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default function LinksScreen() {
  return (
   
      <PokemonCardGetter/>
  );
}

LinksScreen.navigationOptions = {
  title: 'Trading Cards',
  header: null
};


class MainCardView extends React.Component{
  render(){
    return(
      <ScrollView>
        <View  style={cardStyles.container}>
        <Image
          source={ require('../assets/images/pokemon-logo-vector.png')}
          style={cardStyles.welcomeImage}/>
        <Button
            style={cardStyles.welcomeButton}
            title="Get Your Pokemon Card"
            onPress={() => this.props.navigation.navigate('GetPokemonCard')}/>

        </View>
      </ScrollView>
    );
    
  }
   
}

class CardGet extends React.Component{
    state = {
      pokemonCards: []
  }
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,

    };
  }

  componentDidMount() {

    //assign move to random number for object
        let moveNumberOne = Math.floor(Math.random() * 35) + 1;
        let moveNumberTwo = Math.floor(Math.random() * 20) + 11;
        let moveNumberThree = Math.floor(Math.random() * 30) + 12;
        let moveNumberFour = Math.floor(Math.random() * 30) + 13;
        //assign end of api call to random number
        let APINumber = Math.floor(Math.random() * 40) + 1;
        let APIString = String(APINumber);
        let baseSetNumberAPI = Math.floor(Math.random() * 6) + 1;
        let baseSetNumber = String(baseSetNumberAPI);
        
        //console.log(APIString);
    axios
    // make the call to the pokemon api
        .get(`https://api.pokemontcg.io/v1/cards/base` + baseSetNumber + `-` + APIString, {
          // headers: {
          //   Count: 10,  
          // }
        })
        .then(res => {
            const cards = res.data;
            console.log(cards);
            this.setState({
              pokemonCardImage: cards.card.imageUrl,
              pokemonName: cards.card.name,
              isLoading: false,
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
          <View style={cardStyles.container}>
              <Text style={cardStyles.cardTitle}>YOU GOT {this.state.pokemonName}</Text>
              <Image source={{uri: this.state.pokemonCardImage}} style={cardStyles.pokemonImage}/>
              {/* <Text style={cardStyles.infoText}>Height: ft</Text>
              <Text style={cardStyles.infoText}>Weight:  pounds</Text>
              <View  style={cardStyles.moveButtonLayout}>
                  <View style={cardStyles.moveButtonsOuter}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                    <Text style={cardStyles.moveButtonsInner}>
                      
                    </Text>
                  </TouchableOpacity>
                  </View>
                  <View style={cardStyles.moveButtonsOuter}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                      <Text style={cardStyles.moveButtonsInner}>
                      
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View  style={cardStyles.moveButtonLayout}> 
                  <View style={cardStyles.moveButtonsOuter}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                      <Text style={cardStyles.moveButtonsInner}>
                      
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={cardStyles.moveButtonsOuter}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                      <Text style={cardStyles.moveButtonsInner}>
                       
                      </Text>
                    </TouchableOpacity>
                  </View>

              </View> */}
          </View>

      );
    }
  }

}

const CardPages = createStackNavigator({CardHome: MainCardView, GetPokemonCard: CardGet});

const PokemonCardGetter = createAppContainer(CardPages);

const cardStyles = StyleSheet.create({
  container: {
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginHorizontal: 50
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
  cardTitle: {
    marginBottom: 0,
    marginTop: 8,
    color: 'rgba(96,100,109, 1)',
    fontFamily: 'sans-serif',
    fontSize: 15,
    lineHeight: 20,
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
       height: 275,
      resizeMode: 'contain',
      marginTop: 10,
      marginLeft: -10
  }
});

