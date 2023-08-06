import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
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

    // Custom component for rendering each routine as a pressable box
    const RoutineItem = ({ routine }) => (
        <Pressable
            onPress={() => {
                // Navigate to the routine details screen (future implementation)
                console.log('Pressed Routine:', routine.name);
            }}
            style={({ pressed }) => [
                styles.routineItem,
                { backgroundColor: pressed ? '#EFEFEF' : 'white' },
            ]}
        >
            <Text style={styles.routineName}>{routine.name}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Remove Appbar.Header */}
            <FlatList
                data={routines}
                renderItem={({ item }) => <RoutineItem routine={item} />}
                keyExtractor={(item) => item.name}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => {
                    navigation.navigate('AddRoutine', { existingRoutines: routines });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8, // To avoid overlapping the status bar
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    routineItem: {
        width: Dimensions.get('window').width,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    routineName: {
        fontSize: 18,
    },
});

export default HomeScreen;
