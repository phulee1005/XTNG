// ProtectedRoute.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserManagerScreen from './screens/UserManagerScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';


const Stack = createStackNavigator();

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (user === undefined) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="UserManager" component={UserManagerScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProtectedRoute;
