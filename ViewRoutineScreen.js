import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const ViewRoutineScreen = ({ route }) => {
    const { routine } = route.params;
    const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
    const [componentCount, setComponentCount] = useState(0);

    const currentComponent = routine.components[currentComponentIndex];

    const incrementCount = () => {
        if (componentCount == 0) {
            setComponentCount(parseInt(currentComponent.goal));
        }
        else {
            setComponentCount((prevCount) => prevCount + 1);
        }
    };

    const decrementCount = () => {
        setComponentCount((prevCount) => Math.max(0, prevCount - 1));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.routineName}>{routine.name}</Text>
            <View style={styles.componentContainer}>
                <Text style={styles.componentTitle}>{currentComponent.title}</Text>
                <Text style={styles.componentGoal}>{`Goal: ${currentComponent.goal}`}</Text>
            </View>
            {currentComponent.image && <Image source={{ uri: currentComponent.image }} style={styles.image} />}
            <View style={styles.bottomContainer}>
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={decrementCount} style={styles.counterButton}>
                        <Text style={styles.counterButtonText}>–</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{componentCount}</Text>
                    <TouchableOpacity onPress={incrementCount} style={styles.counterButton}>
                        <Text style={styles.counterButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    routineName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    componentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    componentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    componentGoal: {
        fontSize: 18,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    counterButton: {
        backgroundColor: 'lightgray',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 30,
    },
    counterButtonText: {
        fontFamily: 'normal',
        fontSize: 48,
        fontWeight: 'bold',
        color: 'black',
    },
    counterText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 48,
    }
});

export default ViewRoutineScreen;
