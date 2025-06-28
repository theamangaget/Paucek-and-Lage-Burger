// import { useState, useEffect } from "react";
// import Shimmer from "./Shimmer";

// // Helper to extract restaurantId from URL like /restaurant/12345
// function getRestaurantIdFromPath() {
//   const match = window.location.pathname.match(/\/restaurant\/(\d+)/);
//   return match ? match[1] : null;
// }

// const RestaurantMenu = () => {
//   const [resInfo, setResInfo] = useState(null);
//   const restaurantId = getRestaurantIdFromPath();

//   useEffect(() => {
//     if (!restaurantId) return;
//     setResInfo(null);
//     fetchMenu();
//     // eslint-disable-next-line
//   }, [restaurantId]);

//   const fetchMenu = async () => {
//     try {
//       const data = await fetch(
//         `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=24.585445&lng=73.712479&restaurantId=${restaurantId}`
//       );
//       if (!data.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const json = await data.json();
//       setResInfo(json.data);
//     } catch (error) {
//       console.error("Error fetching menu:", error);
//     }
//   };

//   if (!restaurantId) {
//     return <div>Invalid restaurant URL.</div>;
//   }

//   if (!resInfo) {
//     return <Shimmer />;
//   }

//   const restaurantCard = resInfo.cards.find(
//     (card) =>
//       card.card?.card?.["@type"] ===
//       "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
//   );
//   const info = restaurantCard?.card?.card?.info;
//   const restaurantName = info?.name;
//   const cuisines = info?.cuisines || [];
//   const costForTwo = info?.costForTwo;
//   const areaName = info?.areaName;

//   const menuCards =
//     resInfo.cards.find((card) => card.groupedCard)?.groupedCard?.cardGroupMap
//       ?.REGULAR?.cards || [];

//   const menuItems = menuCards
//     .filter(
//       (card) =>
//         card.card?.card?.["@type"] ===
//         "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//     )
//     .flatMap((category) => category.card.card.itemCards || [])
//     .map((itemCard) => itemCard.card.info);

//   return (
//     <div className="menu">
//       <h1>{restaurantName}</h1>
//       <p>Welcome to our restaurant! Here is our menu:</p>
//       <div className="menu-details">
//         <div className="menu-detail">
//           <span className="icon">💸</span>
//           Cost for Two: ₹{costForTwo / 100}
//         </div>
//         <div className="menu-detail">
//           <span className="icon">📍</span>
//           Area: {areaName}
//         </div>
//       </div>
//       <h2>Cuisines:</h2>
//       <ul className="cuisines-list">
//         {cuisines.map((cuisine, idx) => (
//           <li key={idx}>{cuisine}</li>
//         ))}
//       </ul>
//       <h2>Menu Items:</h2>
//       <ul className="menu-items-list">
//         {menuItems.map((item, idx) => (
//           <li key={`${item.id}-${idx}`}>
//             {item.name} {item.price ? <span>₹{item.price / 100}</span> : ""}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantMenu;