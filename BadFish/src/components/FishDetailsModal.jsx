import { useState } from "react";
import { addTrackerEntry } from "../service/trackerService";

function FishDetailsModal({
  fish,
  setSelectedFish,
  isTracked,
  onTrackerEntryAdded
}) {
  const [isAdding, setIsAdding] = useState(false);

  function handleAddToTracker() {
    if (isTracked || isAdding) {
      return;
    }

    const trackerEntry = {
      fishId: fish.id,
      caught: false,
      favorite: false,
      notes: ""
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

  return (
    <div className="modalOverlay" onClick={() => setSelectedFish(null)}>
      <div className="fishModal" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => setSelectedFish(null)}>
          X
        </button>

        <h2>{fish.name}</h2>
        <p>Level: {fish.level}</p>
        <p>Zone: {fish.zone}</p>
        <p>Spot: {primarySpot || "No spot data"}</p>
        <p>Bait: {baitText || "No bait data"}</p>

        <button
          type="button"
          onClick={handleAddToTracker}
          disabled={isTracked || isAdding}
        >
          {isTracked ? "Already tracked" : isAdding ? "Adding..." : "Add to Tracker"}
        </button>
      </div>
    </div>
  );
}

export default FishDetailsModal;
