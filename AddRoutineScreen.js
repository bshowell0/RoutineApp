import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, FAB, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddRoutineScreen = ({ route }) => {
    const navigation = useNavigation();
    const [routineName, setRoutineName] = useState('');
    const [routineImage, setRoutineImage] = useState('');
    const [routineComponents, setRoutineComponents] = useState([{ id: 1, title: '', goal: '' }]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const existingRoutines = route.params?.existingRoutines || [];

    // Function to check if a routine with the given name already exists
    const isRoutineNameDuplicate = (name) => {
        return existingRoutines.some((routine) => routine.name === name);
    };

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
        const newRoutine = {
            name: routineName,
            image: routineImage,
            components: routineComponents,
        };

        if (
            routineName.trim() === '' ||
            routineComponents.some((component) => component.title.trim() === '' || component.goal.trim() === '')
        ) {
            // Display a snackbar message to notify the user about the missing fields
            setSnackbarMessage("Please fill in all non-optional fields before saving the routine.");
            setShowSnackbar(true);
        } else if (isRoutineNameDuplicate(routineName)) {
            // Display a snackbar message to notify the user about the duplicate name
            setSnackbarMessage("Routine name already exists. Please choose a different name.");
            setShowSnackbar(true);
        } else {
            // Pass the newRoutine back to HomeScreen if it's not a duplicate
            navigation.navigate('Home', { newRoutine });
        }
    };

    // Function to handle input change for component goals
    const handleComponentGoalChange = (text, index) => {
        const goalValue = parseInt(text, 10);
        const newComponents = [...routineComponents];
        if (!isNaN(goalValue) && goalValue > 0) {
            // If the user input is a valid integer, update the goal value
            newComponents[index].goal = goalValue.toString();
        } else {
            // If the user input is not a valid integer, set the goal value to an empty string
            newComponents[index].goal = '';
        }
        setRoutineComponents(newComponents);
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
                        onChangeText={(text) => handleComponentGoalChange(text, index)}
                        keyboardType="numeric" // Set the keyboard to numeric to display a numeric keyboard
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
                    navigation.goBack();
                }}
            />
            <Snackbar
                visible={showSnackbar}
                onDismiss={() => setShowSnackbar(false)}
                duration={4000}
            >
                {snackbarMessage}
            </Snackbar>
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
