import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, FAB, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddRoutineScreen = ({ route }) => {
    const navigation = useNavigation();
    const [routineName, setRoutineName] = useState('');
    const [routineComponents, setRoutineComponents] = useState([{ id: 1, title: '', goal: '', image: '' }]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const existingRoutines = route.params?.existingRoutines || [];
    const editingRoutine = route.params?.routine || null;

    useEffect(() => {
        // If editingRoutine exists, pre-fill the form with its details
        if (editingRoutine) {
            setRoutineName(editingRoutine.name);
            setRoutineComponents(editingRoutine.components);
        }
    }, [editingRoutine]);

    // Function to check if a routine with the given name already exists
    const isRoutineNameDuplicate = (name) => {
        return existingRoutines.some((routine) => routine.name === name && routine.name !== editingRoutine?.name);
    };

    // Function to handle adding a new component to the routine
    const addComponent = () => {
        const newComponent = {
            id: routineComponents.length + 1,
            title: '',
            goal: '',
            image: '',
        };
        setRoutineComponents([...routineComponents, newComponent]);
    };

    // Function to handle saving the new routine
    const saveRoutine = () => {
        const newRoutine = {
            name: routineName,
            components: routineComponents,
        };

        if (
            routineName.trim() === '' ||
            routineComponents.some((component) => component.title.trim() === '' || component.goal.trim() === '')
        ) {
            // Display a snackbar message to notify the user about the missing fields
            setSnackbarMessage('Please fill in all non-optional fields before saving the routine.');
            setShowSnackbar(true);
        } else if (isRoutineNameDuplicate(routineName)) {
            // Display a snackbar message to notify the user about the duplicate name
            setSnackbarMessage('Routine name already exists. Please choose a different name.');
            setShowSnackbar(true);
        } else {
            const newRoutine = {
                name: routineName,
                components: routineComponents,
            };
            if (editingRoutine) {
                // If editingRoutine exists, update the routine in the list
                const updatedRoutines = existingRoutines.map((routine) =>
                    routine.name === editingRoutine.name ? newRoutine : routine
                );
                navigation.navigate('Home', { routines: updatedRoutines });
            } else {
                // If editingRoutine doesn't exist, add the new routine to the list
                navigation.navigate('Home', { routines: [...existingRoutines, newRoutine] });
            }
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
            <FlatList removeClippedSubviews={false}
                data={routineComponents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View key={item.id}>
                        <TextInput
                            label={`Component ${index + 1} Title`}
                            value={item.title}
                            onChangeText={(text) => {
                                const newComponents = [...routineComponents];
                                newComponents[index].title = text;
                                setRoutineComponents(newComponents);
                            }}
                            style={styles.input}
                        />
                        <TextInput
                            label={`Component ${index + 1} Goal`}
                            value={item.goal}
                            onChangeText={(text) => handleComponentGoalChange(text, index)}
                            keyboardType="numeric" // Set the keyboard to numeric to display a numeric keyboard
                            style={styles.input}
                        />
                        <TextInput
                            label={`Component ${index + 1} Image URL (Optional)`}
                            value={item.image}
                            onChangeText={(text) => {
                                const newComponents = [...routineComponents];
                                newComponents[index].image = text;
                                setRoutineComponents(newComponents);
                            }}
                            style={styles.input}
                        />
                    </View>
                )}
            />
            <Button onPress={addComponent}>Add Component</Button>
            <Button onPress={saveRoutine}>Save Routine</Button>
            <FAB
                style={styles.fab}
                icon="close"
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Snackbar visible={showSnackbar} onDismiss={() => setShowSnackbar(false)} duration={4000}>
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        padding: 16,
        height: 500
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
