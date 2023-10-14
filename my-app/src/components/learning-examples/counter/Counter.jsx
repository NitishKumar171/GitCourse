import { useState } from 'react';
import './Counter.css';
import CounterButton from './CounterButton'


export default function Counter(){
    const [count,setCount]= useState(0);
    function incrementCounterFunction(by){
        setCount(count+by)
        console.log(by)           
    
}
 function decrementCounterFunction(by){
    setCount(count-by)
    console.log(by)
}

function resetCounter(){
    setCount(0)
}

    return(
     
        <div>
        <span className="totalCountStyle">{count}</span>
        <CounterButton by={1} 
        incrementMethod={incrementCounterFunction}
        decrementMethod={decrementCounterFunction} />

<CounterButton by={4} 
        incrementMethod={incrementCounterFunction}
        decrementMethod={decrementCounterFunction} />

<CounterButton by={6} 
        incrementMethod={incrementCounterFunction}
        decrementMethod={decrementCounterFunction} />
        <button className="CounterButton" onClick={resetCounter} > Reset</button>

        </div>
    )
}