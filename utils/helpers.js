import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {InteractionManager} from 'react-native';

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/*export const loadImageFromGalery2 = async Array => {
  const response = {status: false, image: null};
  const resultPermisions = await Permissions.askAsync(Permissions.CAMERA);
  if (resultPermisions.status === 'denied') {
    Alert.alert('Debes dar permiso para acceder a las imágenes del teléfono');
    return response;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEdite: true,
    aspect: array,
  });
  if (result.cancelled) {
    return response;
  }
  response.status = true;
  response.image = result.uri;

  return response;
}; */

export async function loadImageFromGalery() {
  const resp = {status: false, image: null};
  let validar = 0;
  let filePath = {};
  let options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };

  await launchImageLibrary(options, response => {
    console.log('Response generado = ', response);

    if (response.didCancel) {
      alert('User cancelled camera picker');

      return resp;
    } else if (response.errorCode == 'camera_unavailable') {
      alert('Camera not available on device');

      return resp;
    } else if (response.errorCode == 'permission') {
      alert('Permission not satisfied');

      return resp;
    } else if (response.errorCode == 'others') {
      alert(response.errorMessage);

      return resp;
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
    resp.status = true;
    resp.image = response.uri;
    console.log('**** el filepath es=', filePath.uri);
    console.log('------ la respuesta debe ser: ', resp);
  });

  return resp;
}

export const cualquierCosa = async () => {
  let respuesta = {status: false, image: null};
  const entrada = 0;
  let filePath = {};
  console.log(
    'entro al helper y a tratar de cargar la imagen en cualquier cosa',
  );

  //console.log('entró a chooseFile');
  let options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };

  await launchImageLibrary(options, response => {
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
    console.log('uri -> ', response.uri);
    console.log('width -> ', response.width);
    console.log('height -> ', response.height);
    console.log('fileSize -> ', response.fileSize);
    console.log('type -> ', response.type);
    console.log('fileName -> ', response.fileName);
    filePath = response;
    console.log(filePath);
    console.log('uri imagen: ', filePath.uri);
    respuesta.image = filePath.uri;
    console.log('respuesta . imagen =', respuesta.image);
    respuesta.status = true;
    console.log('status=  ', respuesta.status);
    respuesta.image = filePath.uri;
    console.log('respuesta que entrega  es= ', respuesta);
    return;
  });

  return respuesta;
};

export const fileToBlob = async path => {
  const file = await fetch(path);
  const blob = await file.blob();
  return blob;
};
