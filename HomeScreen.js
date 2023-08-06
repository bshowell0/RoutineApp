import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { Appbar, List, FAB, IconButton, TouchableRipple } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
    const navigation = useNavigation();
    const [routines, setRoutines] = useState([]);

    // Effect to update routines when the route params change
    useEffect(() => {
        if (route.params?.routines) {
            setRoutines(route.params.routines);
        }
    }, [route.params]);

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

    // Function to handle editing a routine
    const editRoutine = (routine) => {
        navigation.navigate('AddRoutine', { routine, existingRoutines: routines });
    };

    // Function to handle deleting a routine
    const deleteRoutine = (routine) => {
        const updatedRoutines = routines.filter((item) => item.name !== routine.name);
        setRoutines(updatedRoutines);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={routines}
                renderItem={({ item }) => (
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.routineItem}>
                            <View style={styles.routineInfo}>
                                <List.Item
                                    title={item.name}
                                    description={item.components.length + (item.components.length != 1 ? ' tasks' : ' task')}
                                />
                            </View>
                            <View style={styles.iconButtons}>
                                <IconButton icon="pencil" onPress={() => editRoutine(item)} />
                                <IconButton icon="delete" onPress={() => deleteRoutine(item)} />
                            </View>
                        </View>
                    </TouchableRipple>
                )}
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
    },
    routineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    routineInfo: {
        flex: 1,
        marginRight: 16,
    },
    iconButtons: {
        flexDirection: 'row',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default HomeScreen;
