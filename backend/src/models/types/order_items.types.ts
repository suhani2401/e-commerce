export interface OrderItemsAttributesType {
    id: string;
    order_id: string;
    product_id: string;
    quantity?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

// 2. Creation attributes (what user sends)
export interface RequiredOrderItemsAttributesType 
    extends Partial<OrderItemsAttributesType> { }
