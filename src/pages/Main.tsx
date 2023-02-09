import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native'
import { Camera as ExpoCamera, CameraType } from 'expo-camera';


interface Member {
    login: string;
    avatar_url: string;
}

const Main: React.FC = () => {
    const [type, setType] = useState(CameraType.back);
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/members').then((response) => {
            response.json().then((data) => {
                setMembers(data);
            })
        })
    }, [])

    return (
        <View>

            <FlatList
                data={members}
                keyExtractor={member => member.login}
                renderItem={({ item: member }) => (
                    <View style={styles.members}>
                        <Image style={styles.avatar_logo}
                            source={{ uri: member.avatar_url }}
                        />
                        <Text>
                            {member.login}
                        </Text>

                    </View>
                )}
            />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    camera: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    avatar_logo: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 10
    },
    members: {
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    }
});


export default Main
