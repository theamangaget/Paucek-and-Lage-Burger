import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div className="about">
      <h1>About Us</h1>
      <p>
        We are a leading restaurant providing the best culinary experiences.
      </p>
      <p>Our mission is to serve delicious food with exceptional service.</p>
      <p>Contact us for more information or to make a reservation.</p> 
      {/* <User name={"Aman Kumar (Function base)"}/> */}
        <UserClass name={"Aman Kumar (Class base)"}/>
    </div>
  );
};
export default About;
