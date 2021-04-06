import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {firebaseApp} from '../../utils/firebase';

import Loading from '../../components/loading';

export default function Restaurants({navigation}) {
  const db = firebase.firestore(firebaseApp);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      <Text>Restaurants... </Text>
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#442484"
          reverse={true}
          containerStyle={styles.btncontainer}
          onPress={() => navigation.navigate('add-restaurant')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  btncontainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
  },
});
