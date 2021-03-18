import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import favorites from '../screens/Favorites';

const Stack = createStackNavigator();
export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={favorites}
        options={{title: 'Favoritos'}}
      />
    </Stack.Navigator>
  );
}
