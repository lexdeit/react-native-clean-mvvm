import { Product } from '../models/Product';
import { IProductRepository } from '@/src/data/repositories/ProductRepository';

export class GetProductDetailUseCase {
    constructor(private productRepository: IProductRepository) { }

    execute(productId: string): Product | null {
        return this.productRepository.getProductById(productId);
    }
}

export default GetProductDetailUseCase;