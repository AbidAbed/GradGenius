import {createSlice} from '@reduxjs/toolkit';

const ConfigSlice = createSlice({
  name: 'ConfigSlice',
  initialState: {path: '/login', isLoggedIn: false, token: null},
  reducers: {
    changePath(state, action) {
      return {...state, path: action.payload};
    },
    changeIsLoggedIn(state, action) {
      return {...state, isLoggedIn: action.payload};
    },
    changeToken(state, action) {
      return {...state, token: action.payload};
    },
  },
});

const {changePath, changeIsLoggedIn, changeToken} = ConfigSlice.actions;
export {ConfigSlice, changePath, changeIsLoggedIn, changeToken};
