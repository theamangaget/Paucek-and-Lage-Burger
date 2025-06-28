import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import RestaurantMenu from "./RestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";

import PingPongGame from "./PingPongGame";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.585445&lng=73.712479&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      const gridCard = json.data.cards.find(
        (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      const restaurants =
        gridCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setAllRestaurants(restaurants);
      setList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // ...DinoGame component...
  const online = useOnlineStatus();

  if (!online) return <PingPongGame />;

  //online status check
  // const onlineStatus = useOnlineStatus();
  // if (!onlineStatus) {
  //   return <h1>Opps you are offline</h1>;
  // }

  if (list.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search restaurants..."
          />
          <button
            className="search-btn"
            onClick={() => {
              const filteredRestaurant = allRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setList(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filterList = allRestaurants.filter(
              (res) => res.info.avgRating > 4.2
            );
            setList(filterList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {list.map((restaurant) => (
          <a
            key={restaurant.info.id}
            href={`/restaurant/${restaurant.info.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/*if the resturant is promoted then add a promoted lable to it */}
            {restaurant.info?.adTrackingId ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )} 
          </a>
        ))}
      </div>
      {selectedRestaurantId && (
        <RestaurantMenu restaurantId={selectedRestaurantId} />
      )}
    </div>
  );
};

export default Body;
