import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation, dogs, fetchDogs }) => {
  return (<>
    {
      dogs.length
        ? dogs.map(dog => <View key={dog.id}>
          <Button
            title={dog.name}
            onPress={() =>
              navigation.navigate('Profile', { dog })
            }
          />
        </View>)
        : <Button title="Show Dogs" onPress={() => fetchDogs()}></Button> 
    }
  </>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  const {dog} = route.params;
  return <>
    <Text>This is {dog.name}'s profile</Text>
    <Text>Email: {dog.email}</Text>
    <Text>{dog.isCute && 'Cute Dog'}</Text>
  </>;
};

export default function App() {
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    const resp = await fetch('https://prestons-dog-api.netlify.app/all.json');
    const data = await resp.json();
    setDogs(data);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Home" options={{ title: 'Dog List' }}>
          {props => <HomeScreen {...props} dogs={dogs} fetchDogs={fetchDogs}/>}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>

      <StatusBar style="auto" />

    </NavigationContainer>

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
