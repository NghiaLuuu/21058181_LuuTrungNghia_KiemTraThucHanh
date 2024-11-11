import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import store from './components/Redux/store';
import ItemList from './components/Redux/itemList';  

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Danh sách xe</Text>
        <ItemList />  
      </View>
    </Provider>
  );
}
