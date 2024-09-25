import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const UserForm = ({ onAddUser, onUpdateUser, editingUser, setEditingUser, showUpdateForm, setShowUpdateForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  // Effect to set form values when editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setAge(editingUser.age.toString()); // Ensure age is a string for TextInput
    }
  }, [editingUser]);

  const validateInput = () => {
    if (name.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Name must be at least 6 characters long.',
        visibilityTime: 3000,
      });
      return false;
    }
    if (!email.endsWith('@gmail.com')) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Email must end with @gmail.com.',
        visibilityTime: 3000,
      });
      return false;
    }
    if (age < 1 || age > 100) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Age must be between 0 and 100 (inclusive).',
        visibilityTime: 3000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateInput()) {
      const userData = { name, email, age: parseInt(age) };
      if (showUpdateForm) {
        onUpdateUser(editingUser.id, userData);
      } else {
        onAddUser(userData);
      }
      clearForm();
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setAge('');
    setEditingUser(null);
    setShowUpdateForm(false);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{showUpdateForm ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
      {showUpdateForm && (
        <TouchableOpacity style={styles.cancelButton} onPress={clearForm}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '25%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
    padding: 10,
    borderRadius: 5,
    width: '25%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default UserForm;
