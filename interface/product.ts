export interface Product {
    /** name of the product */
    name: string
    /** image url of the product */
    image?: string,
    /** description of the product */
    description?: string,
    /** price of the product */
    price: number,
    /** seller id of the product */
    userId: string,
    /** id of product */
    Id: string,
    /** The product creation time */
    createdAt: Object
}
