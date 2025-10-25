import { Product, ProductImpl, ProductList } from '../../domains/models/Product';

export interface IProductRepository {
    getProducts(): Product[];
    getProductList(): ProductList;
    getProductById(id: string): Product | null;
    getProductsByCategory(category: string): Product[];
    searchProducts(query: string): Product[];
}

export class ProductRepository implements IProductRepository {
    private mockProducts: Product[] = [
        new ProductImpl(
            '1',
            'iPhone 15 Pro',
            999.99,
            'El último smartphone de Apple con chip A17 Pro',
            'Electrónicos',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
            true,
            4.8
        ),
        new ProductImpl(
            '2',
            'MacBook Air M2',
            1199.99,
            'Laptop ultradelgada con chip M2',
            'Computadoras',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
            true,
            4.7
        ),
        new ProductImpl(
            '3',
            'AirPods Pro',
            249.99,
            'Audífonos inalámbricos con cancelación activa de ruido',
            'Audio',
            'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400',
            false,
            4.6
        ),
        new ProductImpl(
            '4',
            'iPad Air',
            599.99,
            'Tablet versátil para trabajo y entretenimiento',
            'Tablets',
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
            true,
            4.5
        )
    ];

    getProducts(): Product[] {
        // Simulamos delay de red
        return this.mockProducts;
    }

    getProductById(id: string): Product | null {
        return this.mockProducts.find(product => product.id === id) || null;
    }

    getProductsByCategory(category: string): Product[] {
        return this.mockProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    searchProducts(query: string): Product[] {
        return this.mockProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    getProductList(): ProductList {
        const products = this.getProducts();
        return {
            products,
            total: products.length,
            currentPage: 1,
            totalPages: 1
        };
    }
}