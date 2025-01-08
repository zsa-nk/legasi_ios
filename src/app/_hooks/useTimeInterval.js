import {useState, useEffect} from 'react'
import moment from 'moment';

const useTimeInterval = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment(new Date()).format('h:mm:ss a'));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    }
    
  }, [])
  return [time];
}
export default useTimeInterval