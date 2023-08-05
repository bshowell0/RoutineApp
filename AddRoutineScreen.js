import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddRoutineScreen = () => {
    const navigation = useNavigation();
    const [routineName, setRoutineName] = useState('');
    const [routineImage, setRoutineImage] = useState('');
    const [routineComponents, setRoutineComponents] = useState([{ id: 1, title: '', goal: '' }]);

    // Function to handle adding a new component to the routine
    const addComponent = () => {
        const newComponent = {
            id: routineComponents.length + 1,
            title: '',
            goal: '',
        };
        setRoutineComponents([...routineComponents, newComponent]);
    };

    // Function to handle saving the new routine
    const saveRoutine = () => {
        // Save the routine data to your backend or storage (you can implement this part later)
        const newRoutine = {
            name: routineName,
            image: routineImage,
            components: routineComponents,
        };

        // Pass the newRoutine back to HomeScreen
        navigation.navigate('Home', { newRoutine });
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Routine Name"
                value={routineName}
                onChangeText={(text) => setRoutineName(text)}
                style={styles.input}
            />
            <TextInput
                label="Routine Image URL (Optional)"
                value={routineImage}
                onChangeText={(text) => setRoutineImage(text)}
                style={styles.input}
            />
            {routineComponents.map((component, index) => (
                <View key={component.id}>
                    <TextInput
                        label={`Component ${index + 1} Title`}
                        value={component.title}
                        onChangeText={(text) => {
                            const newComponents = [...routineComponents];
                            newComponents[index].title = text;
                            setRoutineComponents(newComponents);
                        }}
                        style={styles.input}
                    />
                    <TextInput
                        label={`Component ${index + 1} Goal`}
                        value={component.goal}
                        onChangeText={(text) => {
                            const newComponents = [...routineComponents];
                            newComponents[index].goal = text;
                            setRoutineComponents(newComponents);
                        }}
                        style={styles.input}
                    />
                </View>
            ))}
            <Button onPress={addComponent}>Add Component</Button>
            <Button onPress={saveRoutine}>Save Routine</Button>
            <FAB
                style={styles.fab}
                icon="close"
                onPress={() => {
                    // Go back to the HomeScreen without saving
                    navigation.goBack();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default AddRoutineScreen;
