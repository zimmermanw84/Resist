import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Users';
import {
  Form,
  Button,
  FormControl,
  FormGroup,
  Label,
} from 'react-bootstrap';

class Users extends Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false, playerUsers: { users: [] } };
  }
  
  componentWillMount() {
    // fetch users when component is created
    const userCount = this.props.users.length || 0;
    this.props.requestUsers(userCount, true);
  }

  // Don't need this, will add pagination tho
  componentWillReceiveProps(_nextProps) {
    const userCount = this.props.users.length || 0;
    this.props.requestUsers(userCount, false);
  }

  handleSubmit(event) {
    console.log("HELLsdfsafsdfasfsdfO")
    const form = event.currentTarget;
    // console.lo
    event.preventDefault();
    // if (form.checkValidity() === false) {
    //   event.stopPropagation();
    // }
    console.log(form.formCreateUser.value);
    
    this.props.createUser({ username: form.formCreateUser.value })
      .then((data) => {
        console.log("DATA", data);
      form.formCreateUser.value = "";
      // this.setState({ validated: true, playerUsers: [...this.state.playerUsers] });
      });
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        {!this.props.users.length ? <span>There are no users to display.</span> : []}
        {renderUsers(this.props)}
        <h1>Create User</h1>
        <Form noValidate className="form-inline" onSubmit={e => this.handleSubmit(e)}>
          <FormGroup className="form-group mb-2" controlId="formCreateUser">
            <Label className="sr-only">Username</Label>
            <FormControl required className="form-control" type="text" placeholder="Enter Username" />
          </FormGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

function renderUsers(props) {
  return (
    <ul className="list-group">
      {props.users.map(user =>
        <li key={user.userId} className="list-group-item">{user.username}</li>
      )}
    </ul>
  )
}

export default connect(
  state => state.playerUsers,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Users);
