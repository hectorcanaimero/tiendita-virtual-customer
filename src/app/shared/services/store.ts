export interface Cart {
    store?: Store;
    products?: any;
    customer?: any;
    statuss?: any;
    total: number;
}


export interface Store {
    active?: boolean;
    address?: string;
    description?: string;
    email?: string;
    name?:  string;
    phone?: string;
    slug?:  string;
    token?: string;
    uid?:  string;
}
