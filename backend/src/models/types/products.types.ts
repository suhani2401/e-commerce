export interface ProductsAttributesType {
    id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    stock: number;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

// 2. Creation attributes (what user sends)
export interface RequiredProductsAttributesType 
    extends Partial<ProductsAttributesType> { }
