import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// class Car {
//     @Prop()
//     model?: string;
//   }

class Address {
    @Prop()
    addr1?: string;
    @Prop()
    city?: string;
    @Prop()
    state?: string;
    @Prop()
    country?: string;
    @Prop()
    zip?: number;
}

@Schema()
export class Example {
    @Prop()
    name: String;
    @Prop()
    roleNumber: Number;
    @Prop()
    class: Number;
    @Prop()
    gender: String;
    @Prop()
    address?: Address;
    // @prop({ ref: Car })
    // car?: Ref<Car>;
}
export const ExampleSchema = SchemaFactory.createForClass(Example);