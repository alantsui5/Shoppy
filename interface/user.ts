export interface User {
    cvv?: number;
    creditCard?: string;
    uid: string;
    email: string
    photoURL?: string
    displayName?: string;
    emailVerified?: boolean;
    shippingAddress?:string;
}
