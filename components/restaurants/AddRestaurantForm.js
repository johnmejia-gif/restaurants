import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
  Alert,
  Dimensions,
} from 'react-native';
import {Avatar, Button, Icon, Input, Image} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import {filter, map, size, isEmpty} from 'lodash';
import {launchImageLibrary} from 'react-native-image-picker';
import {validateEmail} from '../../utils/helpers';

const widthScreen = Dimensions.get('window').width;

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);

  const addRestaurant = () => {
    //console.log(formData);
    if (!validForm()) {
      return;
    }
    console.log('****Todo bien*****');
  };

  const validForm = () => {
    clearErrors();
    let isValid = true;

    if (isEmpty(formData.name)) {
      setErrorName('Debes ingresar el nombre del restaurante.');
      isValid = false;
    }

    if (isEmpty(formData.address)) {
      setErrorAddress('Debes ingresar la dirección del restaurante.');
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      setErrorEmail('Debes ingresar un email de restaurante válido.');
      isValid = false;
    }

    if (size(formData.phone) < 10) {
      setErrorPhone('Debes ingresar un teléfono de restaurante válido.');
      isValid = false;
    }

    if (isEmpty(formData.description)) {
      setErrorDescription('Debes ingresar una descripción del restaurante.');
      isValid = false;
    }

    if (size(imagesSelected) === 0) {
      toastRef.current.show(
        'Debes de agregar al menos una imagen al restaurante.',
        3000,
      );
      isValid = false;
    }

    return isValid;
  };

  const clearErrors = () => {
    setErrorAddress(null);
    setErrorDescription(null);
    setErrorEmail(null);
    setErrorName(null);
    setErrorPhone(null);
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <ImageRestaurant imageRestaurant={imagesSelected[0]} />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorDescription={errorDescription}
        errorEmail={errorEmail}
        errorAddress={errorAddress}
        errorPhone={errorPhone}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <Button
        title="Crear Restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddResturant}
      />
    </ScrollView>
  );
}

function ImageRestaurant({imageRestaurant}) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{width: widthScreen, height: 200}}
        source={
          imageRestaurant
            ? {uri: imageRestaurant}
            : require('../../assets/no-image.png')
        }
      />
    </View>
  );
}

function UploadImage({toastRef, imagesSelected, setImagesSelected}) {
  const imageSelect = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    await InteractionManager.runAfterInteractions(() => {
      launchImageLibrary(options, response => {
        console.log('Response generado = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        console.log('uri -> ', response.uri);
        setImagesSelected([...imagesSelected, response.uri]);
      });
    });
  };
  const removeImage = image => {
    Alert.alert(
      'Eliminar imagen',
      '¿Está seguro de eliminar la imagen',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Si',
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, imageUrl => imageUrl !== image),
            );
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <ScrollView horizontal style={styles.viewImage}>
      {size(imagesSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imagesSelected, (imageRestaurant, index) => (
        <Avatar
          key={index}
          style={styles.miniaturaStyle}
          source={{uri: imageRestaurant}}
          onPress={() => removeImage(imageRestaurant)}
        />
      ))}
    </ScrollView>
  );
}

function FormAdd({
  formData,
  setFormData,
  errorName,
  errorDescription,
  errorEmail,
  errorAddress,
  errorPhone,
}) {
  const [country, setCountry] = useState('CO');
  const [callingCode, setCallingCode] = useState('57');
  const [phone, setPhone] = useState('');

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del Restaurante..."
        defaultFormValue={formData.name}
        onChange={e => onChange(e, 'name')}
        errorMessage={errorName}
      />
      <Input
        placeholder="Dirección del Restaurante..."
        defaultFormValue={formData.address}
        onChange={e => onChange(e, 'address')}
        errorMessage={errorAddress}
      />
      <Input
        placeholder="Email del Restaurante..."
        keyboardType="email-address"
        defaultFormValue={formData.email}
        onChange={e => onChange(e, 'email')}
        errorMessage={errorEmail}
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
            setFormData({
              ...formData,
              country: country.cca2,
              callingCode: country.callingCode[0],
            });
          }}
        />
        <Input
          placeholder="WhatsApp del restaurante..."
          keyboardType="phone-pad"
          containerStyle={styles.inputPhone}
          defaultFormValue={formData.phone}
          onChange={e => onChange(e, 'phone')}
          errorMessage={errorPhone}
        />
      </View>
      <Input
        placeholder="Descripción del restaurante..."
        multiline
        containerStyle={styles.textArea}
        defaultFormValue={formData.description}
        onChange={e => onChange(e, 'description')}
        errorMessage={errorDescription}
      />
    </View>
  );
}

const defaultFormValues = () => {
  return {
    name: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    country: 'Colombia',
    callingCode: '57',
  };
};
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
  viewImage: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3',
  },
  miniaturaStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: 'center',
    height: 200,
    marginBottom: 20,
  },
});
