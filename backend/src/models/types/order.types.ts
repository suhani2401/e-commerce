export interface OrderAttributesType {
    id: string;
    user_id: string;
    final_price: number;
    shipping_cost?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

// 2. Creation attributes (what user sends)
export interface RequiredOrderAttributesType 
    extends Partial<OrderAttributesType> { }
