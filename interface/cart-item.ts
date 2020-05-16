export interface CartItem {
	/**
	 *name of the product in cart 
	 */
    name: string
    /**
     image url of the product in cart*/
    image?: string,
    /**
     description of the product in cart */
    description?: string,
    /**
     price of the product in cart */
    price: number,
    /**
     seller id of the product in cart */
    userId: string,
    /**
     id of product in cart */
    Id: string,
    /**
     quantity of product in cart */
    quantity: number
}
