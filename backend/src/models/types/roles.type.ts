export interface RolesAttributesType {
    id: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

// 2. Creation attributes (what user sends)
export interface RequiredRolesAttributesType 
    extends Partial<RolesAttributesType> { }
