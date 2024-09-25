import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet, Image, Text, Alert, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import Toast from 'react-native-toast-message';

const UserManagerScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Could not fetch users. Please try again later.');
    }
    setLoading(false);
  };

  const handleAddUser = async (newUser) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'users'), newUser);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User added successfully!',
        visibilityTime: 3000,
      });
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Could not add user. Please try again.');
    }
    setLoading(false);
  };

  const handleUpdateUser = async (id, updatedUser) => {
    setLoading(true);
    setError(null);
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, updatedUser);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User updated successfully!',
        visibilityTime: 3000,
      });
      fetchUsers();
      clearEdit();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Could not update user. Please try again.');
    }
    setLoading(false);
  };

  const clearEdit = () => {
    setEditingUser(null);
    setShowUpdateForm(false);
  };

  const handleDeleteUser = (id) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => await deleteUser(id) }
      ]
    );
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, 'users', id));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User deleted successfully!',
        visibilityTime: 3000,
      });
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Could not delete user. Please try again.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => {
          try {
            await signOut(auth);
            Toast.show({
              type: 'success',
              text1: 'Logged out successfully!',
              visibilityTime: 3000,
            });
            navigation.navigate('Login'); // Navigate to LoginScreen
          } catch (error) {
            console.error(error.message);
          }
        }}
      ]
    );
  };

  return (
    <LinearGradient colors={['#015C92', '#88CDF6']} style={styles.gradientBackground}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout}>
          <Image 
            source={require('../assets/logout.png')} // Update path to your logout image
            style={styles.logoutImage}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/users.png')} style={styles.image} />
        <UserForm 
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          showUpdateForm={showUpdateForm}
          setShowUpdateForm={setShowUpdateForm}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <UserList 
            users={users} 
            onEditUser={(user) => {
              setEditingUser(user);
              setShowUpdateForm(true);
            }} 
            onDeleteUser={handleDeleteUser} 
          />
        )}
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  logoutImage: {
    width: 30,
    height: 30,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  error: {
    color: '#ff0000',
    marginBottom: 10,
  },
});

export default UserManagerScreen;
