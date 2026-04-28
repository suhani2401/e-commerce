export interface PaymentAttributesType {
    id: string;
    transaction_id: string;
    charge_id: string;
    amount: number;
    payable_id: string
    status: "pending" | "completed";
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

// 2. Creation attributes (what user sends)
export interface RequiredPaymentAttributesType
    extends Partial<PaymentAttributesType> { }
