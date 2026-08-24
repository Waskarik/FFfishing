import FishData from "../data/fish.json";
import FishList from "../components/FishList";

function HomePage(){


    return(
          <main>
      <h1>Tracker</h1>

      <FishList fish={FishData.fish}/>
    </main>

    )

}
export default HomePage