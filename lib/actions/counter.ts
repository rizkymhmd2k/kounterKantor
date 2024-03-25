"use server"
import Counter from "../database/counter.model"
import { connectToDatabase } from "../mongoose";


export async function initializeCounter(): Promise<number | null> {
    try {
      connectToDatabase();
  
      // Check if a counter document already exists
      const existingCounter = await Counter.findOne();
  
      if (!existingCounter) {
        // Create a new counter document with an initial count value
        const newCounter = new Counter({ count: 0 });
        await newCounter.save();
  
        return newCounter.count;
      } else {
        // If a counter document already exists, return its count value
        return existingCounter.count;
      }
    } catch (error) {
      console.error("Error initializing counter:", error);
      throw error;
    }
  }


export async function getCounterValue(): Promise<number | null> {
    try {
        connectToDatabase();
        const counter = await Counter.findOne();
        return counter ? counter.count : null;
    } catch (error) {
        console.error("Error getting counter value:", error);
        throw error;
    }
}

export async function incrementCounter(): Promise<number | null> {
    try {
        connectToDatabase();
        const counter = await Counter.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
        return counter ? counter.count : null;
    } catch (error) {
        console.error("Error incrementing counter:", error);
        throw error;
    }
}

export async function decrementCounter(): Promise<number | null> {
    try {
        connectToDatabase();
        const counter = await Counter.findOneAndUpdate({}, { $inc: { count: -1 } }, { new: true });
        return counter ? counter.count : null;
    } catch (error) {
        console.error("Error decrementing counter:", error);
        throw error;
    }
}

export async function resetCounter(): Promise<number | null> {
    try {
        connectToDatabase();
        const counter = await Counter.findOneAndUpdate({}, { count: 0 }, { new: true });
        return counter ? counter.count : null;
    } catch (error) {
        console.error("Error resetting counter:", error);
        throw error;
    }
}



