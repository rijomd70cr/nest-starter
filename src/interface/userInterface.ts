import { Document } from 'mongoose';

export interface IAddress {
    addr1: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}
// for user modal in service class 
export interface IUser extends Document {
    email: string;
    readonly password: string;
    address: IAddress;
    created: Date;
    // refOther:User
}

