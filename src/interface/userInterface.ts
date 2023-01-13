import { Document } from 'mongoose';

export interface Address {
    addr1: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}
// for user modal in service class 
export interface User extends Document {
    email: string;
    readonly password: string;
    address: Address;
    created: Date;
    // refOther:User
}

