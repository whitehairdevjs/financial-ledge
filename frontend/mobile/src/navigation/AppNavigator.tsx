import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Financial Ledge</Text>
        <Text style={styles.drawerSubtitle}>금융 관리 앱</Text>
      </View>
      <View style={styles.drawerContent}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.drawerItemText}>🏠 홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Transactions')}>
          <Text style={styles.drawerItemText}>💰 거래 내역</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#3b82f6',
          drawerInactiveTintColor: '#6b7280',
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            drawerLabel: '홈',
          }}
        />
        <Drawer.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={{
            title: '거래 내역',
            drawerLabel: '거래 내역',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  drawerHeader: {
    backgroundColor: '#3b82f6',
    padding: 24,
    paddingTop: 60,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  drawerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 16,
  },
  drawerItem: {
    padding: 16,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#171717',
  },
});

