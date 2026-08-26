import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteTrackerEntry,
  getTrackerEntries,
  updateTrackerEntry
} from "../service/trackerService";
import fishData from "../data/fish.json";

function TrackerPage() {
  const [tracker, setTracker] = useState([]);

  useEffect(() => {
    getTrackerEntries()
      .then((data) => {
        setTracker(data.filter((entry) => entry.fishId != null));
      })
      .catch((error) => {
        console.error("Failed to load tracker:", error);
      });
  }, []);

  function handleUpdate(id, changes) {
    updateTrackerEntry(id, changes)
      .then((updatedEntry) => {
        setTracker((currentTracker) =>
          currentTracker.map((entry) =>
            entry.id === id ? updatedEntry : entry
          )
        );
      })
      .catch((error) => {
        console.error("Failed to update tracker entry:", error);
      });
  }

  function handleNotesChange(id, notes) {
    setTracker((currentTracker) =>
      currentTracker.map((entry) =>
        entry.id === id ? { ...entry, notes } : entry
      )
    );
  }

  function handleDelete(id) {
    deleteTrackerEntry(id)
      .then(() => {
        setTracker((currentTracker) =>
          currentTracker.filter((entry) => entry.id !== id)
        );
      })
      .catch((error) => {
        console.error("Failed to delete tracker entry:", error);
      });
  }

  return (
    <main>
      <Link to="/">Back to Fish List</Link>
      <h1>My Tracker</h1>

      {tracker.length === 0 && <p>No fish tracked yet.</p>}

      {tracker.map((entry) => {
        const fish = fishData.fish.find(
          (oneFish) => oneFish.id === entry.fishId
        );

        if (!fish) {
          return null;
        }

        const primarySpot = fish.fishingSpot || fish.fishingSpots?.[0];

        return (
          <div key={entry.id}>
            <h3>{fish.name}</h3>
            <p>Zone: {fish.zone}</p>
            <p>Spot: {primarySpot || "No spot data"}</p>
            <p>Caught: {entry.caught ? "Yes" : "No"}</p>
            <p>Favorite: {entry.favorite ? "Yes" : "No"}</p>

            <button
              type="button"
              onClick={() =>
                handleUpdate(entry.id, { caught: !entry.caught })
              }
            >
              {entry.caught ? "Mark as Missing" : "Mark as Caught"}
            </button>

            <button
              type="button"
              onClick={() =>
                handleUpdate(entry.id, { favorite: !entry.favorite })
              }
            >
              {entry.favorite ? "Remove Favorite" : "Favorite"}
            </button>

            <div>
              <label>
                Notes:
                <input
                  type="text"
                  value={entry.notes || ""}
                  onChange={(event) =>
                    handleNotesChange(entry.id, event.target.value)
                  }
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  handleUpdate(entry.id, { notes: entry.notes || "" })
                }
              >
                Save Notes
              </button>
            </div>

            <button type="button" onClick={() => handleDelete(entry.id)}>
              Remove from Tracker
            </button>
          </div>
        );
      })}
    </main>
  );
}

export default TrackerPage;
