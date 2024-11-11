import React from 'react';
import { Provider } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './components/Redux/store';
import ItemList from './components/Redux/itemList';
import AddItemScreen from './components/AddItemScreen';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ItemList">
          <Stack.Screen 
            name="ItemList" 
            component={ItemList} 
            options={({ navigation }) => ({
              title: 'Danh sách xe',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('AddItemScreen')}
                  title="Thêm xe"
                  color="#00f"
                />
              ),
            })}
          />
          <Stack.Screen 
            name="AddItemScreen" 
            component={AddItemScreen} 
            options={{ title: 'Thêm xe' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
