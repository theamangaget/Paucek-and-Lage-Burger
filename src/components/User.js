import { useState } from "react";

const User = (props) => {
  const [count, setCount] = useState(0);
  // const [name] = useState("Ankit");


//   useEffect(() => {
//     //{API call}
    

//   }, []);

  return (
    <div className="user-card">
      <h2>Count : {count}</h2>

      <h2>Name : {props.name}</h2>
      <h2> Location: Ambala</h2>
    </div>
  );
};
export default User;
