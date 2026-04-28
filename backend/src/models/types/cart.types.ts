export interface CartAttributesType {
    id: string;
    user_id: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

// 2. Creation attributes (what user sends)
export interface RequiredCartAttributesType
    extends Partial<CartAttributesType> { }
