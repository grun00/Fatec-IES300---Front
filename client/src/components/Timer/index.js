import React, {useState, useEffect} from 'react';
import './styles.css';

const Timer = (props) => {
    const [time, setTime] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setTime(props.maxTime);
    }, []);
    
    const restart = () => {
        setTime(props.maxTime);
        setIsComplete(false);
    };

    useEffect(() => {
        const timer = time > 0 && setInterval(() => setTime((time - 0.1).toFixed(2)), 100)
        if(time != null && timer == 0) {
            setIsComplete(true);
        }
        return () => clearInterval(timer);
      }, [time])
    
    useEffect(() => {
        if (isComplete) {
            props.onComplete();
            restart();
        }
    }, [isComplete])
    
return (
        <div id='timer'>{time}</div>
    )
}

export default Timer;