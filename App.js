import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text,LogBox } from 'react-native'

import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
LogBox.ignoreLogs(['setting a timer']);
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyCeoCGNtFFBit48opcad_GeMTGyy9jsZLY",
  authDomain: "instagram-dev-781ba.firebaseapp.com",
  projectId: "instagram-dev-781ba",
  storageBucket: "instagram-dev-781ba.appspot.com",
  messagingSenderId: "706602460523",
  appId: "1:706602460523:web:d0917573ac89b2e88b582e",
  measurementId: "G-N8Z1XH9DG2"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'

const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }


  return(
    <Provider store= {store}>
      <NavigationContainer>

      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
        <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
      </Stack.Navigator>
      </NavigationContainer>

        </Provider>
     )
}
}

export default App
