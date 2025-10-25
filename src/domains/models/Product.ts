export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    inStock: boolean;
    rating: number;
}

export class ProductImpl implements Product {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public description: string,
        public category: string,
        public imageUrl: string,
        public inStock: boolean,
        public rating: number
    ) { }
}

export interface ProductList {
    products: Product[];
    total: number;
    currentPage: number;
    totalPages: number;
}