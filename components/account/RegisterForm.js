import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {size} from 'lodash';
import {useNavigation} from '@react-navigation/native';

import {validateEmail} from '../../utils/helpers';
import {registerUser} from '../../utils/actions';
import Loading from '../loading';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaulFormValues);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const doRegisterUser = async () => {
    if (!validateData()) {
      return;
    }
    setLoading(true);

    const result = await registerUser(formData.email, formData.password);
    setLoading(false);
    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }
    navigation.navigate('account');
  };

  const validateData = () => {
    setErrorConfirm('');
    setErrorEmail('');
    setErrorPassword('');
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail('Debes ingresar un mail válido');
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorPassword('Debes ingresar una contraseña de almenos 6 caracteres');
      isValid = false;
    }
    if (size(formData.confirm) < 6) {
      setErrorPassword(
        'Debes ingresar una confirmación de contraseña de almenos 6 caracteres',
      );
      isValid = false;
    }
    if (formData.confirm !== formData.password) {
      setErrorConfirm('La contraseña y la confirmación no coinciden');
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.form}>
      <Input
        placeholder="Ingresa tu email..."
        containerStyle={styles.input}
        onChange={e => onChange(e, 'email')}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        placeholder="Ingresa tu contraseña..."
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        onChange={e => onChange(e, 'password')}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Confirma tu contraseña..."
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        onChange={e => onChange(e, 'confirm')}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Registrar nuevo usuario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doRegisterUser()}
      />
      <Loading isVisible={loading} text="Creando Cuenta" />
    </View>
  );
}

const defaulFormValues = () => {
  return {email: '', password: '', confirm: ''};
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  input: {
    width: '100%',
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: '#442484',
  },
  icon: {
    color: '#c1c1c1',
  },
});
