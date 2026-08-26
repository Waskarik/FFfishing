import { useEffect, useState } from "react";
import { getEorzeaTime } from "../util/eorzeaTime";

function EorzeaClock() {
  const [time, setTime] = useState(getEorzeaTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getEorzeaTime());
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return <p>Eorzea Time: {time} ET</p>;
}

export default EorzeaClock;
