import { Schema, models, model, Document } from "mongoose";

// Define the interface for the Counter document
export interface ICounter extends Document {
    count: number;
  }
  
  // Define the Counter schema
  const CounterSchema = new Schema({
    count: {
      type: Number,
      required: true,
      default: 0, // Initial value for the count field
    },
  });

const Counter = models.Counter || model<ICounter>("Counter", CounterSchema);

export default Counter;