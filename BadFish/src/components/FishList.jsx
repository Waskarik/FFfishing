import FishCard from "./FishCard";

function FishList({ fish, setSelectedFish, currentHour }) {
  if (fish.length === 0) {
    return <p>No fish match this search/filter.</p>;
  }

  return (
    <div>
      {fish.map((oneFish) => (
        <FishCard
          key={oneFish.id}
          fish={oneFish}
          setSelectedFish={setSelectedFish}
          currentHour={currentHour}
        />
      ))}
    </div>
  );
}

export default FishList;
