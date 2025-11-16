import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack'
import { MealsOverviewScreen } from './screens/MealsOverviewScreen';
import MealsDetailsScreen from './screens/MealDetailsScreen';

import {createDrawerNavigator} from '@react-navigation/drawer'
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/context/favorites-context';


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#3f2f25' },
        drawerContentStyle: { backgroundColor: '#351401' },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1',
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <FavoritesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#693E3E' },
          headerTintColor: 'white',
          cardStyle: { backgroundColor: '#4B2D2D' }
        }}>
          <Stack.Screen
            name='MealsCategories'
            component={DrawerNavigator}
            options={{
              title: 'All Categories',
              headerShown : false,
            }}
          />
          <Stack.Screen
            name='MealsOverview'
            component={MealsOverviewScreen}
          //  options={({route , navigation})=> {
          //   const catId = route.params.categoryId ; 
          //   return {
          //     title : catId
          //   }
          //  }}
          />
          <Stack.Screen
           name='MealDetails' 
            component={MealsDetailsScreen} 
            options={{
              title: 'About the Meal',
            }}
            // if you don't need direct comunication with MealsDetailsScreen
            // options={{
            //   headerRight : () =>{
            //     return <Button title='tap me' />
            //   }
            // }}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
