import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      user2: null,
    };
  }

  componentDidMount() {
    const fetchUser = async () => {
      const data = await fetch("https://api.github.com/users/theamangaget");
      const data2 = await fetch("https://api.github.com/users/yashswi23");
      const json = await data.json();
      const json2 = await data2.json();
      this.setState({ user: json, user2: json2 });
    };
    fetchUser();
  } 
componentDidUpdate(){
    console.log("Component updated");
}
componentWillUnmount() {
    console.log("Component unmounted");
  }



  render() {
    const { user, user2 } = this.state;
    return (
      <span className="user-list">
        <div className="user-card">
          <h2>Name : {user ? user.login : this.props.login}</h2>
          <h2>Location: Ambala</h2>
          {user && <img src={user.avatar_url} alt="avatar" />}
        </div>
        <div className="user-card">
          <h2>Name : {user2 ? user2.login : this.props.login}</h2>
          <h2>Location: Fazilka</h2>
          {user2 && <img src={user2.avatar_url} alt="avatar" />}
        </div>
      </span>
    );
  }
}

export default UserClass;