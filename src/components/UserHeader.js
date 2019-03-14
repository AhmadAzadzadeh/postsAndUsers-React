import React, { Component } from "react";
import { connect } from "react-redux";

class UserHeader extends Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return <div>Loading...</div>;
    }
    return <div className="header">{user.name}</div>;
  }
}

// ownProps is a reference to our props that will send into our UserHeader component
const mapStateToProps = (state, ownProps) => {
  const user = state.users.find(user => user.id === ownProps.userId);
  return { user };
};

export default connect(mapStateToProps)(UserHeader);
