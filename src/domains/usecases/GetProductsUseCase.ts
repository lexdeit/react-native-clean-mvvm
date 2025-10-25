import { ProductList } from '../models/Product';
import { IProductRepository } from '@/src/data/repositories/ProductRepository';

export class GetProductsUseCase {
    constructor(private productRepository: IProductRepository) { }

    execute(): ProductList {
        return this.productRepository.getProductList();
    }
}

export default GetProductsUseCase;