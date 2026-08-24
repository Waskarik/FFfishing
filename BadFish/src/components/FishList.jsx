import FishCard from "./FishCard"

function FishList({ fish }) {
  return (
    <div>
      {fish.map((oneFish) => (
        <FishCard key={oneFish.id} fish={oneFish} />
      ))}
    </div>
  );
}
export default FishList;