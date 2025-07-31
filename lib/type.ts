
export interface Category{
    id: number;
    image: string; 
    name: string; 
    slug: string;
}


export interface Product{
    id: number;
    name: string; 
    slug: string;
    image: string;
    price: number; 
}

export interface User{
    id: number; 
    email: string; 
    username: string;
    first_name: string;
    last_name: string;
    profile_picture_url: string | null
}

export interface Review{
    id: number;
    rating: number; 
    review: string;
    created: string;
    updated: string; 
    user: User
}

export interface Rating{
    id: number;
    average_rating: number;
    total_reviews: number;
}

export interface ProductDetail{
    id: number; 
    name: string; 
    description: string;
    slug: string; 
    price: number;
    image: string;
    reviews: Review[];
    rating: Rating;
    similar_products: Product[]

    poor_review: number;
    fair_review: number;
    good_review: number;
    very_good_review: number;
    excellent_review: number;

}

export interface CartItemType {
    id: number;
    product: Product;
    quantity: number;
    sub_total: number; 
}

export interface CartType {
    id: number;
    cart_code: string;
    cartitems: CartItemType[];
    cart_total: number;
}

export interface OrderItemType{
    id: number;
    product: Product
}

export interface OrderType {
    id: number;
    stripe_checkout_id: string;
    amount: number;
    items: OrderItemType[];
    status: string; 
    created_at: string; 
}

export interface WishlistType{
    id: number;
    product: Product;
}

export interface AddressType{
    id: number;
    // customer: User;
    street: string; 
    state: string; 
    city: string; 
    phone: string;
}