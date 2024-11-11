import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { useDispatch } from 'react-redux'; 
import { fetchItems } from './Redux/itemSlide'; 
import { addItem } from './Redux/itemSlide'; 
const AddItemScreen = ({ navigation }) => {
  const dispatch = useDispatch(); 
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleAddItem = () => {
    const itemData = {
      name: name,
      price: parseFloat(price),
      image_link: imageLink,
    };

    fetch('https://645b030265bd868e9328a7a2.mockapi.io/Cau1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    })
      .then((response) => response.json())
      .then((data) => {
        
        dispatch(addItem(data)); 

        Alert.alert('Thành công', 'Xe đã được thêm thành công');
        navigation.goBack(); 
      })
      .catch((error) => {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm xe');
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Thêm xe mới</Text>
      <TextInput
        placeholder="Tên xe"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Giá"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        placeholder="Link ảnh"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={imageLink}
        onChangeText={setImageLink}
      />
      <Button title="Thêm xe" onPress={handleAddItem} />
    </View>
  );
};

export default AddItemScreen;
