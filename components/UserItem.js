import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const UserItem = ({ user, onEditUser, onDeleteUser }) => {
  return (
    <View style={styles.userRow}>
      <Text style={styles.userText}>{user.name}</Text>
      <Text style={styles.userText}>{user.email}</Text>
      <Text style={styles.userText}>{user.age}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => onEditUser(user)}>
        <FontAwesome name="edit" size={24} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDeleteUser(user.id)}>
        <Ionicons name="trash-outline" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  userText: {
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 10,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#edb100',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
});

export default UserItem;
