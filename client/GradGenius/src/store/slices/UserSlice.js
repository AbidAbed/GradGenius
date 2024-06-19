import {createSlice} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: {},
  reducers: {
    fetchUser(state, action) {
      return {...action.payload};
    },
  },
});

const {fetchUser} = UserSlice.actions;
export {UserSlice, fetchUser};
