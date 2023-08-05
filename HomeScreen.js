import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, List, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
    const navigation = useNavigation();
    const [routines, setRoutines] = useState([]);

    // Get the newRoutine data from AddRoutineScreen and update the routines list
    React.useEffect(() => {
        if (route.params?.newRoutine) {
            const newRoutine = route.params.newRoutine;
            setRoutines([...routines, newRoutine]);
        }
    }, [route.params?.newRoutine]);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="My Routines" />
            </Appbar.Header>
            <FlatList
                data={routines}
                renderItem={({ item }) => <List.Item title={item.name} />}
                keyExtractor={(item) => item.name}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => {
                    navigation.navigate('AddRoutine');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default HomeScreen;
