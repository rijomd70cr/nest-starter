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
    username: string;
    readonly password: string;
    address: Address;
    created: Date;
    // car:car
}
// for register data in controll and service 
export interface Register {
    username: string;
    password: string;
    address?: Address;
}
export interface Payload {
    username: string;
    address?: Address;
}

// ****************************
export interface Example extends Document {
    name: string;
    roleNumber: number;
    class: number;
    gender: string;
    address: Address;
}
export interface RegisterExample {
    name: string;
    roleNumber: number;
    class: number;
    gender: string;
}
// ****************************
