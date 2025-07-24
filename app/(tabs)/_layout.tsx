import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// A point of sale system by Lucgecko@gmail.com


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#caa21dff',
      headerStyle: {
        backgroundColor: '#25292e',
        height: 20,
      },
      headerShadowVisible: false,
      headerTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: '#25292e',
        height: 25
      },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Breakfast/Lunch', tabBarIcon: ({ color }) => (
        <FontAwesome6 name={ "bowl-food" } size={16} color={color} />
      ),
       }} 
       />
      <Tabs.Screen name="desserts" options={{ title: 'Desserts', tabBarIcon: ({ color }) => (
        <Ionicons name={ "ice-cream-sharp" } size={16} color={color} />
      ) }} />
            <Tabs.Screen name="drinks" options={{ title: 'Drinks', tabBarIcon: ({ color }) => (
        <Entypo name={ "drink" } size={16} color={color} />
      ) }} />
                  <Tabs.Screen name="dinner" options={{ title: 'Dinner', tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name={ "food-steak" } size={16} color={color} />
      ) }} />
    </Tabs>
  );
}