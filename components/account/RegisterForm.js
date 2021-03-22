import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaulFormValues);

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <View style={styles.form}>
      <Input
        placeholder="Ingresa tu email..."
        containerStyle={styles.input}
        onChange={e => onChange(e, 'email')}
      />
      <Input
        placeholder="Ingresa tu contraseña..."
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        onChange={e => onChange(e, 'password')}
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
        onChange={e => onchange(e, 'confirm')}
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
        onPress={() => console.log('hola')}
      />
    </View>
  );
}

const defaulFormValues = () => {
  return {emali: '', password: '', confrim: ''};
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
