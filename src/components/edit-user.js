import React from "react";
import axios from "axios";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/users").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username),
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.description,
    };
    console.log(exercise);

    axios
      .post(
        "http://localhost:5000/users/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit User Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.users}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>New User Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit User Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        <p>1{this.state.users}</p>
        <p>2{this.state.username}</p>
        <p>{this.props.match.params.id}</p>
      </div>
    );
  }
}
