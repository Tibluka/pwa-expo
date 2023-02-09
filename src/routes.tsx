import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Camera from './pages/Camera';
import Main from './pages/Main';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { View, Button, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Routes() {
    const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
    const [type, setType] = useState(CameraType.back);

    if (!permission) {
        // Camera permissions are still loading
        return <View>
            <Text>Permission still loading {type}</Text>
        </View>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Main"
                    component={Main}
                    options={{
                        tabBarIcon: ({ color }) => <Feather name="home" size={20} color={color} />
                    }}
                />
                <Tab.Screen
                    name="Camera"
                    component={Camera}
                    options={{
                        tabBarIcon: ({ color }) => <Feather name="camera" size={20} color={color} />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    }
})