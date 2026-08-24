

function FishCard({fish}){
    
    
    return(
    <div>
        <h2>{fish.name}</h2>
            <p>Level: {fish.level}</p>
            <p>Zone: {fish.zone}</p>
            <p>Fishing Spots</p>
            <ul>
                {fish.fishingSpots?.map((spot,index) =>(
                    <li key={index}>{spot}</li>
                ))}
            </ul>

            <p>Baits</p>
            <ul>
                {fish.baitPath?.map((bait,index) =>(
                    <li key={index}>{bait}</li>
                ))}
            </ul>
            
    </div>
    )
}
export default FishCard