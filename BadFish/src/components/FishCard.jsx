import { isFishAvailableTime } from "../util/eorzeaTime";

function FishCard({ fish, setSelectedFish }) {

  const available = isFishAvailableTime(
    fish.startHour,
    fish.endHour,
  )

  return (
    <div
      onClick={() => setSelectedFish(fish)}
      style={{ cursor: "pointer" }}
    >
      <h2>{fish.name}</h2>
      <p>Level: {fish.level}</p>
      <p>Zone: {fish.zone}</p>
      <p>{available ? "Available" : "Not Available"}</p>
    </div>
  );
}

export default FishCard;
