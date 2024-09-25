import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { signInWithEmailAndPassword, signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    appId: '3544171812540224',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { token } = response.params;
      const credential = FacebookAuthProvider.credential(token);
      signInWithCredential(auth, credential)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back!',
          });
          navigation.navigate('UserManager');
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: error.message,
          });
        });
    }
  }, [response]);

  const handleLogin = async () => {
    setLoading(true);
    if (!password) {
      Toast.show({
        type: 'info',
        text1: 'No Password Entered',
        text2: 'Please sign up if you don\'t have a password.',
      });
      navigation.navigate('Signup');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
      navigation.navigate('UserManager');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message,
      });
    }
    setLoading(false);
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <LinearGradient colors={['#015C92', '#88CDF6']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={require('../assets/login.png')} style={styles.logo} />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              
            
            </View>
          )}
          
          <Text style={styles.signupPrompt} numberOfLines={1}>
  If you don't have an account, <Text style={styles.signupLink} onPress={handleSignUp}>Sign up</Text>
</Text>


          <TouchableOpacity style={styles.link} onPress={() => {/* Navigate to Reset Password */}}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()}>
            <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  
  signupPrompt: {
    marginTop: 10,
    color: '#ffffff',
    textAlign: 'center',
    flexWrap: 'nowrap',
  },
  signupLink: {
    color: 'red',
    fontWeight: 'bold',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
  input: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#ffffff',
  },
  socialButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default LoginScreen;
