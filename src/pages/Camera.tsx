import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';

interface Member {
    login: string;
    avatar_url: string;
}

const Camera: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/members').then((response) => {
            response.json().then((data) => {
                setMembers(data);
            })
        })
    }, [])

    function alertQr(qrCode: any) {
        alert(`Code of type ${qrCode.type} containing the following data: ${qrCode.data}`)
    }

    function onError(error: any) {
        alert(error)
    }


    return (
        <View style={styles.container}>
        <ExpoCamera style={styles.camera} type={type}
            onBarCodeScanned={(qrCode) => alertQr(qrCode)}
            barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onMountError={(error) => onError(error)}>
        </ExpoCamera>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Camera
