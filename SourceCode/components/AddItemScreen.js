import React, { useState } from 'react';
import { View, TextInput, Alert, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from './Redux/itemSlide'; 

const AddItemScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleAddItem = () => {
    if (!name || !price || !imageLink) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (isNaN(price) || price <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập giá hợp lệ!');
      return;
    }

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
        setName('');
        setPrice('');
        setImageLink('');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm xe');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Thêm xe mới</Text>
      <TextInput
        placeholder="Tên xe"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Giá"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        placeholder="Link ảnh"
        style={styles.input}
        value={imageLink}
        onChangeText={setImageLink}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Thêm xe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#F0F0F0',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  input: {
    height: 50,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: '#1E90FF',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddItemScreen;
