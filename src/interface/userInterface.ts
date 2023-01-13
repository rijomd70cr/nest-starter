import { Document } from 'mongoose';
// import {car} from '../car'

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
    // car:car
}
// for register data in controll and service 
export interface Register {
    email: string;
    password: string;
}
export interface Payload {
    email: string;
}

