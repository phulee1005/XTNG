import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UserItem from './UserItem';

const UserList = ({ users, onEditUser, onDeleteUser }) => {
  // Render a message when the user list is empty
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No users found.</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UserItem 
          user={item} 
          onEditUser={onEditUser} 
          onDeleteUser={onDeleteUser} 
        />
      )}
      ListEmptyComponent={renderEmptyComponent} // Show when no users are available
      contentContainerStyle={users.length === 0 ? styles.emptyListContainer : null}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserList;
