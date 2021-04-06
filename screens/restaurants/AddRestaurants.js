import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import Loading from '../../components/loading';

import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm';

export default function AddRestaurants({navigation}) {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <AddRestaurantForm
        toastRef={toastRef}
        setLoading={setLoading}
        navigation={navigation}
      />
      <Loading isVisible={loading} text="Creando Restaurante" />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
