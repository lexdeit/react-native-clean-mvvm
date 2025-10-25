import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    TextInput,
    Image,
    RefreshControl
} from 'react-native';
import { useProductViewModel } from '../viewmodels/ProductViewModel';
import { Product } from '@/src/domains/models/Product';

const ProductScreen: React.FC = () => {
    const {
        products,
        isLoading,
        error,
        loadProducts,
        searchProducts
    } = useProductViewModel();

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        searchProducts(query);
    };

    const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
        <View style={styles.productCard}>
            <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
                defaultSource={require('../../../assets/images/placeholder.png')}
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                </Text>
                <View style={styles.productDetails}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <View style={styles.productMeta}>
                        <Text style={styles.productCategory}>{product.category}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>⭐ {product.rating}</Text>
                        </View>
                    </View>
                </View>
                <View style={[
                    styles.stockBadge,
                    product.inStock ? styles.inStock : styles.outOfStock
                ]}>
                    <Text style={styles.stockText}>
                        {product.inStock ? 'En Stock' : 'Agotado'}
                    </Text>
                </View>
            </View>
        </View>
    );

    if (isLoading && products.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <ActivityIndicator size="large" color="#667eea" />
                <Text style={styles.loadingText}>Cargando productos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nuestros Productos</Text>
                <Text style={styles.headerSubtitle}>
                    {products.length} productos encontrados
                </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#999"
                />
            </View>

            {/* Error Message */}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={loadProducts}
                    >
                        <Text style={styles.retryButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Product List */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading && products.length > 0}
                        onRefresh={loadProducts}
                        colors={['#667eea']}
                    />
                }
            >
                <View style={styles.productsGrid}>
                    {products.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            onPress={() => {/* Navegar a detalle */ }}
                            activeOpacity={0.7}
                        >
                            <ProductCard product={product} />
                        </TouchableOpacity>
                    ))}
                </View>

                {products.length === 0 && !isLoading && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            {searchQuery ? 'No se encontraron productos' : 'No hay productos disponibles'}
                        </Text>
                    </View>
                )}
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
        backgroundColor: '#ffffff',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#667eea',
        fontWeight: '500',
    },
    header: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#718096',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
    },
    searchInput: {
        backgroundColor: '#f7fafc',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 16,
        color: '#2d3748',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    content: {
        flex: 1,
    },
    productsGrid: {
        padding: 16,
    },
    productCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    productImage: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
    },
    productInfo: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 8,
        lineHeight: 18,
    },
    productDetails: {
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: 4,
    },
    productMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productCategory: {
        fontSize: 12,
        color: '#a0aec0',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 12,
        color: '#f6ad55',
        fontWeight: '600',
    },
    stockBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    inStock: {
        backgroundColor: '#c6f6d5',
    },
    outOfStock: {
        backgroundColor: '#fed7d7',
    },
    stockText: {
        fontSize: 12,
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: '#fed7d7',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    errorText: {
        color: '#c53030',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#c53030',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 18,
        color: '#a0aec0',
        textAlign: 'center',
    },
});

export default ProductScreen;