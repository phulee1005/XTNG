// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import UserManagerScreen from './screens/UserManagerScreen'; // Ensure this path is correct
import SignupScreen from './screens/SignupScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} // Optional: Set header title
        />
        <Stack.Screen 
          name="UserManager" 
          component={UserManagerScreen} 
          options={{ title: 'User Management' }} // Optional: Set header title
        />
        <Stack.Screen name="Signup" component={SignupScreen}
        options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
