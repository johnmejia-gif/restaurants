import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Restaurants from '../screens/restaurants/Restaurants'
import AddRestaurants from '../screens/restaurants/AddRestaurants';
import Prueba from '../screens/restaurants/Prueba';
import AddRestaurantForm from '../components/restaurants/AddRestaurantForm';

const Stack = createStackNavigator();
export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{title: 'Restaurantes'}}
      />
      <Stack.Screen
        name="add-restaurant"
        component={AddRestaurants}
        options={{title: 'Crear Restaurante'}}
      />
    </Stack.Navigator>
  );
}
