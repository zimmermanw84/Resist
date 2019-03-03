const requestUsersType = 'REQUEST_USERS';
const receiveUsersType = 'RECEIVE_USERS';
const createUserRequestType = 'CREATE_USER_REQUEST';
const createUserRequestSuccessType = 'CREATED_USER_RECIEVED';
const createUserRequestFailureType = 'CREATED_USER_REJECTED';
const initialState = { users: [], isLoading: false };

export const actionCreators = {
  requestUsers: (userCount, initalRender) => async (dispatch, getState) => {    
    // always fetch inital render
    if (!initalRender && userCount === getState().playerUsers.users.length) {
      return;
    }
    // fetching users event
    dispatch({ type: requestUsersType });

    const url = `api/Users`;
    const response = await fetch(url);
    const users = await response.json();

    dispatch({ type: receiveUsersType, users });
  },

  createUser: (userData) => async (dispatch, getState) => {
    const users = getState().playerUsers.users;
    dispatch({ type: createUserRequestType })

    try {
      const response = await postData('api/Users', userData);
      dispatch({ type: createUserRequestSuccessType, users: [...users, response]  });
    }
    catch (err) {
      dispatch({ type: createUserRequestFailureType, users });
    }    
  }
};

// TODO: Make a helper file
async function postData(url='', data={}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export const reducer = (state, action) => {
  state = state || initialState

  switch(action.type) {
    case requestUsersType:
    case createUserRequestType:
      return {
        ...state,
        isLoading: true
      };
    case receiveUsersType:
    case createUserRequestSuccessType:
      return {
        ...state,
        users: action.users,
        isLoading: false
      };
    // do something with error state
    case createUserRequestFailureType:
      return {
        ...state,
        users: action.users,
        isLoading: false
      };
    default:
      return {
        ...state,
        users: action.users || [],
        isLoading: false
      };
  }
};
