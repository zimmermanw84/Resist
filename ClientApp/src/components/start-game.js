import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Async from 'react-async';
import User from "../store/users";

export default class StartGame extends Component {
  render() {
    return (
      <Async promiseFn={User.findAll}>
        <Async.Loading>... Loading</Async.Loading>
        <Async.Resolved>
          {data => {
            return (
              <ListGroup>
              {data.map((user) => {
                return (
                    <ListGroup.Item id={user.id}>{user.username}</ListGroup.Item>
                    )
                  })}
              </ListGroup>
            )
          }}
        </Async.Resolved>
      </Async>
    )
  }
}