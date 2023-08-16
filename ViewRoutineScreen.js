import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { IconButton, FAB, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

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
        if (componentCount == 0) {
            setComponentCount(parseInt(currentComponent.goal) - 1);
        }
        else {
            setComponentCount((prevCount) => Math.max(0, prevCount - 1));
        }

    };

    const handleGestureStateChange = (event) => {
        if (event.nativeEvent.state === State.END) {
            const dx = event.nativeEvent.translationX;
            if (dx > 100 && currentComponentIndex > 0) {
                setCurrentComponentIndex(currentComponentIndex - 1);
                setComponentCount(0);
            } else if (dx < -100 && currentComponentIndex < routine.components.length - 1) {
                setCurrentComponentIndex(currentComponentIndex + 1);
                setComponentCount(0);
            }
        }
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
                <PanGestureHandler onHandlerStateChange={handleGestureStateChange}>
                    <View style={styles.counterContainer}>
                        <TouchableOpacity onPress={decrementCount} style={styles.counterButton}>
                            <Text style={styles.counterButtonText}>–</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>{componentCount}</Text>
                        <TouchableOpacity onPress={incrementCount} style={styles.counterButton}>
                            <Text style={styles.counterButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </PanGestureHandler>
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
        backgroundColor: 'blue',
    },
});

export default ViewRoutineScreen;
