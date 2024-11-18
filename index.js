// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
// import {createStackNavigator} from "@react-navigation/stack";

// // import Splash from "../../Screens/Splash";
// import Chat from "../../Screens/Chat";

// import Login from "../../Screens/Login";
// import SignUp from "../../Screens/SignUp";

// const Stack = createStackNavigator();

// function ChatStack() {
//   return(
//     <Stack.Navigator screenOptions={{headerShown:false}}>
//     <Stack.Screen name='Login' component={Login} />
//     <Stack.Screen name='SignUp' component={SignUp} />
//     </Stack.Navigator>
//   )
// }

// function RootNavigator() {
//   return(
//     <NavigationIndependentTree>
//     <NavigationContainer>
//     <ChatStack />
//     </NavigationContainer>
//     </NavigationIndependentTree>
//   )
// }

// export default function index() {
//   return <RootNavigator />
// }

import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Login from '../../Screens/Login';
import SignUp from '../../Screens/SignUp';
import Chat from '../../Screens/Chat';
import Home from '../../Screens/Home';
import Splash from '../../Screens/Splash';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home} screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} defaultScreenOptions={Splash}>
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        {user ? <ChatStack /> : <AuthStack />}
      </NavigationContainer>
    </NavigationIndependentTree>

  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, ActivityIndicator } from 'react-native';
// import { createStackNavigator } from "@react-navigation/stack";
// import ChatScreen from '../../Screens/ChatScreen';
// import HomeScreen from '../../Screens/HomeScreen';
// import LoginScreen from '../../Screens/LoginScreen';
// import {auth} from "../../config/firebase";
// import SignUpScreen from "../../Screens/SignUpScreen";
// import SplashScreen from "../../Screens/SplashScreen";
// import 'react-native-get-random-values';
// // import { AppRegistry } from 'react-native';
// // import { name as ChatApp } from '../../app.config';


// const Stack = createStackNavigator();
// const AuthenticatedUserContext = createContext({});

// const AuthenticatedUserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     return (
//         <AuthenticatedUserContext.Provider value={{ user, setUser }}>
//             {children}
//         </AuthenticatedUserContext.Provider>
//     );
// };

// function ChatStack() {
//     return (
//         <Stack.Navigator defaultScreenOptions={HomeScreen} >
//             <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
//             <Stack.Screen name='ChatScreen' component={ChatScreen} />
//         </Stack.Navigator>
//     );
// }

// function AuthStack() {
//     return (
//         <Stack.Navigator defaultScreenOptions={LoginScreen} screenOptions={{headerShown:false}} >
//         <Stack.Screen name='SplashScreen' component={SplashScreen} />
//         <Stack.Screen name='LoginScreen' component={LoginScreen} />
//         <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
//         </Stack.Navigator>
//     );
// }

// function RootNavigator() {
//     const { user, setUser } = useContext(AuthenticatedUserContext);
//     const [isLoading, setIsLoading] = useState(true);
//     useEffect(() => {
//         // onAuthStateChanged returns an unsubscriber
//         const unsubscribeAuth = onAuthStateChanged(auth,
//             async authenticatedUser => {
//               authenticatedUser ? setUser(authenticatedUser) : setUser(null);
//               setIsLoading(false);
//             }
//           );
//       // unsubscribe auth listener on unmount
//           return unsubscribeAuth;
//         }, [user]);
//       if (isLoading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//               <ActivityIndicator size='large' />
//             </View>
//           );
//         }
//     return (
//         <NavigationContainer>
//         {user ? <ChatStack /> : <AuthStack />}
//       </NavigationContainer>
//     );
//   }


// export default function index() {
//     return(
//     <AuthenticatedUserProvider>
//       <RootNavigator />
//     </AuthenticatedUserProvider>
//     )
// }

// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, ActivityIndicator } from 'react-native';
// import { createStackNavigator } from "@react-navigation/stack";
// import ChatScreen from "../../Screens/ChatScreen";
// import LoginScreen from "../../Screens/LoginScreen";
// import SignUpScreen from "../../Screens/SignUp";
// import HomeScreen from "../../Screens/HomeScreen";

// const Stack = createStackNavigator();
// const AuthenticatedUserContext = createContext({});

// const AuthenticatedUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthenticatedUserContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthenticatedUserContext.Provider>
//   );
// };

// function ChatStack() {
//   return (
//     <Stack.Navigator initialRouteName="Home"> {/* Changed to 'initialRouteName' */}
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="ChatScreen" component={ChatScreen} /> {/* Ensure 'Chat' is capitalized */}
//     </Stack.Navigator>
//   );
// }

// function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <ChatStack />
//     </NavigationContainer>
//   );
// }

// function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="LoginScreen" component={LoginScreen} />
//       <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function Index() {
//   return (
//     <AuthenticatedUserProvider>
//       <RootNavigator />
//     </AuthenticatedUserProvider>
//   );
// }

// import Constants from 'expo-constants';
// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, ActivityIndicator } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import ChatScreen from '../../Screens/Chat';
// import HomeScreen from '../../Screens/Home';
// import LoginScreen from '../../Screens/Login';
// import SignUpScreen from '../../Screens/SignUp';
// import SplashScreen from '../../Screens/Splash';
// import { auth } from '../../config/firebase';
// import 'react-native-get-random-values';


// const Stack = createStackNavigator();
// const AuthenticatedUserContext = createContext({});

// const AuthenticatedUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   return (
//     <AuthenticatedUserContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthenticatedUserContext.Provider>
//   );
// };

// function ChatStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//       <Stack.Screen name="Chat" component={Chat} />
//     </Stack.Navigator>
//   );
// }

// function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Splash" component={Splash} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//     </Stack.Navigator>
//   );
// }

// function RootNavigator() {
//   const { user, setUser } = useContext(AuthenticatedUserContext);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(auth, async (authenticatedUser) => {
//       authenticatedUser ? setUser(authenticatedUser) : setUser(null);
//       setIsLoading(false);
//     });

//     return unsubscribeAuth;
//   }, [user]);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       {user ? <ChatStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }

// export default function index() {
//   return (
//     <AuthenticatedUserProvider>
//       <RootNavigator />
//     </AuthenticatedUserProvider>
//   );
// }
