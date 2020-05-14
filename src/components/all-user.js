import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>
      <Link to={"/edituser/" + props.user._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class AllUser extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(id) {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  }

  allUserList() {
    return this.state.users.map((currentuser) => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>All User</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <td>Username</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>{this.allUserList()}</tbody>
        </table>
      </div>
    );
  }
}
