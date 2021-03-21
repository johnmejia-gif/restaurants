import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import {firebaseApp} from '../../utils/firebase';
import Loading from '../../components/loading';

export default function Account() {
  const [login, setLogin] = useState(null);

  firebaseApp.auth().onAuthStateChanged(user => {
    user !== null ? setLogin(true) : setLogin(false);
  });

  if (login == null) {
    return <Loading isVisible={true} text={'cargando..'} />;
  }

  return login ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
