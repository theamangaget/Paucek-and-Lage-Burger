//import { CDN_URL } from "../utils/constants";


const RestaurantCard = ({ resData }) => {
  const { info } = resData;
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="res-logo"
        alt="restaurant-logo"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`}
      />
      <h3>{info.name}</h3>
      <h5>{info.cuisines.join(", ")}</h5>
      <h5>
        {info.avgRating} Stars ({info.totalRatingsString})
      </h5>
      <h6>
        {info.costForTwo} • {info.sla.slaString}
      </h6>
    </div>
  );
};
//Higher order component (HOC) is a function that takes a component and returns a new component with additional functionality.
// HOC is used to enhance the functionality of a component without modifying its original code.
//input : RestaurantCard component
// output: EnhancedRestaurantCard component with additional functionality
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <lable>Promoted</lable>
        <RestaurantCard {...props}/>
      </div>
    );
  };
};

export default RestaurantCard;
