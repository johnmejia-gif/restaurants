import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {InteractionManager} from 'react-native';

import {cualquierCosa, loadImageFromGalery} from '../../utils/helpers';
import {updateProfile, uploadImage} from '../../utils/actions';


export default function InfoUser({user, setLoading, setLoadingText}) {
  const [filePath, setFilePath] = useState({});
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  const changePhoto = async () => {
    console.log('va pedir la funcion de cargar la foto');
    //const result = async () => {
    //  cualquierCosa();
    //};
    //const result = await cualquierCosa();
    //loadingImageFromGalery();
    const result = await loadImageFromGalery();
    //const result = await loadingImageFromGalery();
    
    console.log('**** devolvió desde el helpers= ', result);
    if (!result.status) {
      return;
    }
    setLoadingText('Actualizando imagen...');
    setLoading(true);
    const resultUploadImage = await uploadImage(
      result.image,
      'avatars',
      user.uid,
    );
    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      Alert.alert('Ha ocurrido un error al almacenar la foto de perfil.');
      return;
    }
    const resultUpdateProfie = await updateProfile({
      photoURL: resultUploadImage.url,
    });
    setLoading(false);
    if (resultUpdateProfie.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
    } else {
      Alert.alert('Ha ocurrido un error al actualizar la foto de perfil.');
    }
  };
  const navigation = useNavigation();

  const chooseFile = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    (async () => {
      async function dos() {
        setTimeout(async function () {
          console.log('********* en función 2');
          setLoadingText('Actualizando imagen...');
          setLoading(true);
          const resultUploadImage = await uploadImage(
            filePath.uri,
            'avatars',
            user.uid,
          );
          if (!resultUploadImage.statusResponse) {
            setLoading(false);
            Alert.alert('Ha ocurrido un error al almacenar la foto de perfil.');
            return;
          }
          const resultUpdateProfie = await updateProfile({
            photoURL: resultUploadImage.url,
          });
          setLoading(false);
          if (resultUpdateProfie.statusResponse) {
            setPhotoUrl(resultUploadImage.url);
          } else {
            Alert.alert(
              'Ha ocurrido un error al actualizar la foto de perfil.',
            );
          }
          console.log('foto que mostrará', photoUrl);
          console.log('la dirección es= ', filePath.uri);
        }, 0);
      }
      async function uno() {
        console.log('entró a funcion 1');
        console.log('---- filepath al empezar=', filePath.uri);
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
            console.log('++++ el filepath anterior es=', filePath.uri);
            filePath.uri = response.uri;
            setFilePath(response);
            console.log('**** el filepath es=', filePath.uri);
            dos();
          });
        });
        console.log('****tres***');
      }
      await uno();
      
      console.log('******** fin **********');
    })();

    // InteractionManager.runAfterInteractions(() => {
    //   launchImageLibrary(options, response => {
    //     console.log('Response generado = ', response);

    //     if (response.didCancel) {
    //       alert('User cancelled camera picker');
    //       return;
    //     } else if (response.errorCode == 'camera_unavailable') {
    //       alert('Camera not available on device');
    //       return;
    //     } else if (response.errorCode == 'permission') {
    //       alert('Permission not satisfied');
    //       return;
    //     } else if (response.errorCode == 'others') {
    //       alert(response.errorMessage);
    //       return;
    //     }
    //     console.log('base64 -> ', response.base64);
    //     console.log('uri -> ', response.uri);
    //     console.log('width -> ', response.width);
    //     console.log('height -> ', response.height);
    //     console.log('fileSize -> ', response.fileSize);
    //     console.log('type -> ', response.type);
    //     console.log('fileName -> ', response.fileName);
    //     setFilePath(response);

    //   });
    // });

    // setTimeout(function () {
    //   console.log('hola');
    // }, 10000);

    // setLoadingText('Actualizando imagen...');
    // setLoading(true);
    // const resultUploadImage = await uploadImage(
    //   filePath.uri,
    //   'avatars',
    //   user.uid,
    // );
    // if (!resultUploadImage.statusResponse) {
    //   setLoading(false);
    //   Alert.alert('Ha ocurrido un error al almacenar la foto de perfil.');
    //   return;
    // }
    // const resultUpdateProfie = await updateProfile({
    //   photoURL: resultUploadImage.url,
    // });
    // setLoading(false);
    // if (resultUpdateProfie.statusResponse) {
    //   setPhotoUrl(resultUploadImage.url);
    // } else {
    //   Alert.alert('Ha ocurrido un error al actualizar la foto de perfil.');
    // }
    // console.log('foto que mostrará', photoUrl);
    // console.log('la dirección es= ', filePath.uri);
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded={true}
        size="large"
        // onPress={changePhoto}
        onPress={async () => {
          await chooseFile('photo');
        }}
        containerStyle={styles.avatar}
        source={
          photoUrl
            ? {uri: photoUrl}
            : require('../../assets/avatar-default.jpg')
        }
      />
      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {user.displayName ? user.displayName : 'Anónimo'}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    paddingVertical: 30,
  },
  infoUser: {
    marginLeft: 20,
  },
  displayName: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
});
