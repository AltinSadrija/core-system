import axios from 'axios'
import backendUrl from "../../../../service/backendUrl";

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get(backendUrl+'api/users/list/all-data').then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    await axios.get(`${backendUrl}api/users/list/data`, {
      params: params
    }).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.users.data,
        totalPages: response.data.total,
        params
      })
    })
  }
}
// ** Get User
export const getUser = id => {
  return async dispatch => {
    await axios.get(backendUrl+'api/users/user', {params: {id:id}})
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user,
          id
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
export const addUser = user => {
  return (dispatch, getState) => {
    axios
      .post(backendUrl+'api/users/register', user)
      .then(response => {
        dispatch({
          type: 'ADD_USER',
          user
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
      .catch(err => console.log(err))
  }
}

// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .delete('/apps/users/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
  }
}
