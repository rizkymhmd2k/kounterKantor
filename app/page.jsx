'use client'
import { useState, useEffect } from "react";
import { getCounterValue, incrementCounter, decrementCounter, resetCounter, initializeCounter } from "@/lib/actions/counter";

export default function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if the counter exists
        const existingCounterValue = await getCounterValue();
        // console.log('Existing Counter Value:', existingCounterValue);
  
        if (existingCounterValue !== null) {
          // Counter exists, set the counter value and return
          // console.log('Counter exists, setting counter value:', existingCounterValue);
          setCounter(existingCounterValue || 0);
          return;
        }
  
        // Initialize the counter since it doesn't exist
        console.log('Counter does not exist, initializing...');
        await initializeCounter();
  
        // Fetch the counter value after initialization
        const counterValue = await getCounterValue();
        // console.log('New counter value after initialization:', counterValue);
        setCounter(counterValue || 0); // Set the counter value or default to 0
      } catch (error) {
        console.error("Error fetching counter value:", error);
      }
    }
  
    fetchData(); // Fetch initial counter value on component mount
  }, []);
  

  const addNum = async () => {
    try {
      const newCounterValue = await incrementCounter();
      setCounter(newCounterValue || counter); // Update counter state with new value
    } catch (error) {
      console.error("Error incrementing counter:", error);
    }
  };

  const resetNum = async () => {
    try {
      const resetCounterValue = await resetCounter();
      setCounter(resetCounterValue || 0); // Reset counter state to 0 or new reset value
    } catch (error) {
      console.error("Error resetting counter:", error);
    }
  };

  const subtractNum = async () => {
    try {
      const newCounterValue = await decrementCounter();
      setCounter(newCounterValue || counter); // Update counter state with new value
    } catch (error) {
      console.error("Error decrementing counter:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center text-[90px] bg-slate-900 text-neutral-300">
      <p className="text-[40px]">Antrian</p>
      <p className="font-bold text-[300px]">{counter}</p>
      <div className="flex gap-2 text-[40px]">
        <button className="btn-square" onClick={subtractNum}>-</button>
        <button className="btn-square text-[20px]" onClick={resetNum}>RESET</button>
        <button className="btn-square" onClick={addNum}>+</button>
      </div>
    </div>
  );
}
