import { useState, useEffect } from "react";
import { addTrackerEntry } from "../service/trackerService";
import { getMarketPrice } from "../service/universalisService.js";

function FishDetailsModal({
  fish,
  setSelectedFish,
  isTracked,
  onTrackerEntryAdded,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [marketPrice, setMarketPrice] = useState(null);

  useEffect(() => {
    setMarketPrice(null);
    getMarketPrice(fish.id)
      .then((data) => {
        setMarketPrice(data.minPrice);
      })
      .catch((err) =>{
    console.log(err);
      })
  }, [fish.id]);

  function handleAddToTracker() {
    if (isTracked || isAdding) {
      return;
    }

    const trackerEntry = {
      fishId: fish.id,
      caught: false,
      favorite: false,
      notes: "",
    };

    setIsAdding(true);

    addTrackerEntry(trackerEntry)
      .then((newEntry) => {
        onTrackerEntryAdded(newEntry);
      })
      .catch((error) => {
        console.error("Failed to add fish to tracker:", error);
      })
      .finally(() => {
        setIsAdding(false);
      });
  }

  const primarySpot = fish.fishingSpot || fish.fishingSpots?.[0];
  const baitText = fish.baitPath?.length
    ? fish.baitPath.join(" → ")
    : fish.baits?.join(", ");

    const isAllDay = fish.startHour === 0 && fish.endHour === 24;

  return (
    <div className="modalOverlay" onClick={() => setSelectedFish(null)}>
      <div className="fishModal" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => setSelectedFish(null)}>
          X
        </button>
        <img src={fish.iconUrl} alt={fish.name}/>

        <h2>
          {fish.name}
          {fish.isBigFish && <span style={{color: "gold"  }}>  [ ★ Big Fish ]  </span>}
          </h2> 
        <p>Level: {fish.level}</p>
        <p>Zone: {fish.zone}</p>
        <p>Spot: {primarySpot || "No spot data"}</p>
        <p>Bait: {baitText || "No bait data"}</p>
        <p>Time: {isAllDay ? "All Day" : `${fish.startHour}:00 - ${fish.endHour}:00` }</p>
        <p>Raiden price: {marketPrice} gil</p>
        <button
          type="button"
          onClick={handleAddToTracker}
          disabled={isTracked || isAdding}
        >
          {isTracked
            ? "Already tracked"
            : isAdding
              ? "Adding..."
              : "Add to Tracker"}
        </button>
      </div>
    </div>
  );
}

export default FishDetailsModal;
