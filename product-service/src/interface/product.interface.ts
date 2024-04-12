export interface ProductRequest {
    productId: string;
    quantity: number;
}

export interface ProductResponse {
    available: boolean;
}
