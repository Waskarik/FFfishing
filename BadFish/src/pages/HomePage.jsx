import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import fishData from "../data/fish.json";
import FishList from "../components/FishList";
import FishDetailsModal from "../components/FishDetailsModal.jsx";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import EorzeaClock from "../components/EorzeaClock";
import { getTrackerEntries } from "../service/trackerService";
import { isFishAvailableTime, getEorzeaTime } from "../util/eorzeaTime";

function HomePage() {
  const [selectedFish, setSelectedFish] = useState(null);
  const [trackerEntries, setTrackerEntries] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(getEorzeaTime());
  const currentHour = Number(currentTime.split(":")[0])
  
  useEffect(()=> {
  const interval = setInterval(()=>  {
    setCurrentTime(getEorzeaTime())
    
  },1000);  
  return()=>{ 
    clearInterval(interval)
  }
  },[])
  
  

  useEffect(() => {
    getTrackerEntries()
      .then((data) => {
        setTrackerEntries(data.filter((entry) => entry.fishId != null));
      })
      .catch((error) => {
        console.error("Failed to load tracker:", error);
      });
  }, []);

  const trackedIds = useMemo(
    () => new Set(trackerEntries.map((entry) => entry.fishId)),
    [trackerEntries]
  );

  const caughtIds = useMemo(
    () => new Set(
      trackerEntries
        .filter((entry) => entry.caught)
        .map((entry) => entry.fishId)
    ),
    [trackerEntries]
  );

  const visibleFish = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return fishData.fish.filter((fish) => {
      const matchesSearch = fish.name.toLowerCase().includes(normalizedQuery);

      if (!matchesSearch) {
        return false;
      }
      if(filter === "available"){
        return isFishAvailableTime(fish.startHour, fish.endHour, currentHour);
      }
      if (filter === "Tracked") {
        return trackedIds.has(fish.id);
      }

      if (filter === "Caught") {
        return caughtIds.has(fish.id);
      }

      if (filter === "Missing") {
        return !caughtIds.has(fish.id);
      }

      return true;
    });
  }, [query, filter, trackedIds, caughtIds, currentHour]);

  function handleTrackerEntryAdded(newEntry) {
    setTrackerEntries((currentEntries) => {
      const alreadyExists = currentEntries.some(
        (entry) => entry.fishId === newEntry.fishId
      );

      return alreadyExists ? currentEntries : [...currentEntries, newEntry];
    });
  }

  const selectedFishIsTracked = selectedFish
    ? trackedIds.has(selectedFish.id)
    : false;

  return (
    <main>
      <div>
        <Link to="/tracker">My Tracker</Link>
      </div>

      <EorzeaClock />

      <SearchBar query={query} setQuery={setQuery} />
      <FilterBar filter={filter} setFilter={setFilter} />

      {selectedFish && (
        <FishDetailsModal
          fish={selectedFish}
          setSelectedFish={setSelectedFish}
          isTracked={selectedFishIsTracked}
          onTrackerEntryAdded={handleTrackerEntryAdded}
        />
      )}

      <FishList
        fish={visibleFish}
        setSelectedFish={setSelectedFish}
      />
      <button onClick={() => setFilter("all")}>
  All
</button>

<button onClick={() => setFilter("available")}>
  Available
</button>
    </main>
  );
}

export default HomePage;
