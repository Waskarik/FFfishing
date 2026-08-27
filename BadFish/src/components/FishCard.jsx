import { isFishAvailableTime } from "../util/eorzeaTime";

function FishCard({ fish, setSelectedFish, currentHour }) {
  
  const available = isFishAvailableTime(
    fish.startHour,
    fish.endHour,
    currentHour,
  )
  const isAllDay = fish.startHour === 0 && fish.endHour === 24;
  return (
    <div
      onClick={() => setSelectedFish(fish)}
      style={{ cursor: "pointer" }}
    >
      <h2>{fish.name}</h2>
      <img src={fish.iconUrl} alt={fish.name} loading="lazy"/>
      <p>Level: {fish.level}</p>
      <p>Zone: {fish.zone}</p>
      <p>Time: {isAllDay ? "All Day" : `${fish.startHour}:00 - ${fish.endHour}:00` }</p>
      <p>{available ? "Available" : "Not Available"}</p>
    </div>
  );
}

export default FishCard;
