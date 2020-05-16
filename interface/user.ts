export interface User {
	/** cvv of user */
    cvv?: number;
    /** credit card number of user */
    creditCard?: string;
    /** uid of user */
    uid: string;
    /** email of user */
    email: string
    /** profile picture url of user */
    photoURL?: string
    /** name of user */
    displayName?: string;
    /** State showing whether user have verified email */
    emailVerified?: boolean;
    /** Shipping address of the user */
    shippingAddress?:string;
}
