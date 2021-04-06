import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {
  const addRestaurant = () => {
    console.log('****Todo bien*****');
  };

  return (
    <View style={styles.viewContainer}>
      <FormAdd />
      <Button
        title="Crear Restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddResturant}
      />
    </View>
  );
}

function FormAdd() {
  const [country, setCountry] = useState('CO');
  const [callingCode, setCallingCode] = useState('57');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.viewForm}>
      <Input placeholder="Nombre del Restaurante..." />
      <Input placeholder="Dirección del Restaurante..." />
      <Input
        placeholder="Email del Restaurante..."
        keyboardType="email-address"
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStyle={styles.countryPicker}
          countryCode={country}
          onSelect={country => {
            setCountry(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />
        <Input
          placeholder="WhatsApp del restaurante..."
          keyboardType="phone-pad"
          containerStyle={styles.inputPhone}
        />
      </View>
      <Input
        placeholder="Descripción del restaurante..."
        multiline
        containerStyle={styles.textArea}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
  },
  viewForm: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: '100%',
  },
  phoneView: {
    width: '80%',
    flexDirection: 'row',
  },
  inputPhone: {
    width: '80%',
  },
  btnAddResturant: {
    margin: 20,
    backgroundColor: '#442484',
  },
});
