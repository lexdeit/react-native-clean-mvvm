import { useState, useEffect } from 'react';
import { Product, ProductList } from '@/src/domains/models/Product';
import { ProductRepository, IProductRepository } from '../../data/repositories/ProductRepository';
import GetProductsUseCase from '@/src/domains/usecases/GetProductsUseCase';
import GetProductDetailUseCase from '@/src/domains/usecases/GetProductDetailUseCase';


export interface ProductViewModelType {
    products: Product[];
    productList: ProductList | null;
    selectedProduct: Product | null;
    isLoading: boolean;
    error: string | null;
    loadProducts: () => void;
    loadProductDetail: (productId: string) => void;
    searchProducts: (query: string) => void;
    clearSelection: () => void;
}

export class ProductViewModel {
    private productRepository: IProductRepository;
    private getProductsUseCase: GetProductsUseCase;
    private getProductDetailUseCase: GetProductDetailUseCase;

    constructor() {
        this.productRepository = new ProductRepository();
        this.getProductsUseCase = new GetProductsUseCase(this.productRepository);
        this.getProductDetailUseCase = new GetProductDetailUseCase(this.productRepository);
    }

    getProducts(): ProductList {
        return this.getProductsUseCase.execute();
    }

    getProductDetail(productId: string): Product | null {
        return this.getProductDetailUseCase.execute(productId);
    }

    searchProducts(query: string): Product[] {
        return this.productRepository.searchProducts(query);
    }
}

// Hook personalizado para el ViewModel de Producto
export const useProductViewModel = (): ProductViewModelType => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productList, setProductList] = useState<ProductList | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [viewModel] = useState<ProductViewModel>(new ProductViewModel());

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = (): void => {
        setIsLoading(true);
        setError(null);

        setTimeout(() => {
            try {
                const productData = viewModel.getProducts();
                setProductList(productData);
                setProducts(productData.products);
            } catch (err) {
                setError('Error al cargar los productos');
                console.error('Error loading products:', err);
            } finally {
                setIsLoading(false);
            }
        }, 1000); // Simulamos delay de red
    };

    const loadProductDetail = (productId: string): void => {
        setIsLoading(true);
        setError(null);

        setTimeout(() => {
            try {
                const product = viewModel.getProductDetail(productId);
                setSelectedProduct(product);
                if (!product) {
                    setError('Producto no encontrado');
                }
            } catch (err) {
                setError('Error al cargar el detalle del producto');
                console.error('Error loading product detail:', err);
            } finally {
                setIsLoading(false);
            }
        }, 500);
    };

    const searchProducts = (query: string): void => {
        if (!query.trim()) {
            loadProducts();
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            try {
                const searchResults = viewModel.searchProducts(query);
                setProducts(searchResults);
            } catch (err) {
                setError('Error en la búsqueda');
                console.error('Error searching products:', err);
            } finally {
                setIsLoading(false);
            }
        }, 300);
    };

    const clearSelection = (): void => {
        setSelectedProduct(null);
        setError(null);
    };

    return {
        products,
        productList,
        selectedProduct,
        isLoading,
        error,
        loadProducts,
        loadProductDetail,
        searchProducts,
        clearSelection
    };
};

export default ProductViewModel;