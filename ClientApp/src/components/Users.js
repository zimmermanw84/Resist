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
  Table
} from 'react-bootstrap';

class Users extends Component {
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
    const form = event.currentTarget;
    event.preventDefault();

    this.props.createUser({ username: form.formCreateUser.value })
      .then((data) => {
        form.formCreateUser.value = "";
      });
  }

  render() {
    return (
      <div className="container">
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
        <h1>Users</h1>
        {!this.props.users.length ? <span>There are no users to display.</span> : []}
        {renderUsers(this.props)}
      </div>
    )
  }
}

function renderUsers(props) {
  return (
    <div className="table">
      <Table size="small" responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => {
            return (<tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
            </tr>)
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default connect(
  state => state.playerUsers,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Users);
