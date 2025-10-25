import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    Dimensions
} from 'react-native';
import { useUserViewModel } from '../viewmodels/UserViewModel';

const { width, height } = Dimensions.get('window');

const UserScreen: React.FC = () => {
    const { user, edad, isLoading, refreshData } = useUserViewModel();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#667eea"
                />
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Cargando datos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#667eea"
                translucent={false}
            />

            {/* Header con gradiente */}
            <View style={styles.header}>
                <Text style={styles.welcomeText}>¡Bienvenido!</Text>
                <Text style={styles.userName}>{user?.name}</Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Tarjeta de información principal */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Información del Usuario</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Nombre:</Text>
                        <Text style={styles.infoValue}>{user?.name}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Edad desde User:</Text>
                        <Text style={styles.infoValue}>{user?.age} años</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Edad desde UseCase:</Text>
                        <Text style={styles.infoValue}>{edad} años</Text>
                    </View>

                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>
                            ✅ Demostrando Clean Architecture + MVVM en React Native
                        </Text>
                    </View>
                </View>

                {/* Tarjeta de arquitectura */}
                <View style={[styles.card, styles.architectureCard]}>
                    <Text style={styles.architectureTitle}>Arquitectura Utilizada</Text>
                    <View style={styles.architectureItem}>
                        <Text style={styles.architectureDot}>•</Text>
                        <Text style={styles.architectureText}>MVVM Pattern</Text>
                    </View>
                    <View style={styles.architectureItem}>
                        <Text style={styles.architectureDot}>•</Text>
                        <Text style={styles.architectureText}>Clean Architecture</Text>
                    </View>
                    <View style={styles.architectureItem}>
                        <Text style={styles.architectureDot}>•</Text>
                        <Text style={styles.architectureText}>Separación de Capas</Text>
                    </View>
                    <View style={styles.architectureItem}>
                        <Text style={styles.architectureDot}>•</Text>
                        <Text style={styles.architectureText}>Use Cases Independientes</Text>
                    </View>
                </View>
            </ScrollView>

           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#667eea',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    header: {
        backgroundColor: '#667eea',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    welcomeText: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        marginBottom: 4,
    },
    userName: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    cardHeader: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2d3748',
        textAlign: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    infoLabel: {
        fontSize: 16,
        color: '#718096',
        fontWeight: '500',
        flex: 1,
    },
    infoValue: {
        fontSize: 18,
        color: '#2d3748',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 8,
    },
    noteContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#edf2f7',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#48bb78',
    },
    noteText: {
        fontSize: 14,
        color: '#4a5568',
        fontWeight: '500',
        textAlign: 'center',
    },
    architectureCard: {
        backgroundColor: '#4fd1c7',
    },
    architectureTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    architectureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    architectureDot: {
        fontSize: 20,
        color: '#FFFFFF',
        marginRight: 12,
    },
    architectureText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    refreshButton: {
        backgroundColor: '#667eea',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        minWidth: 200,
    },
    refreshButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default UserScreen;