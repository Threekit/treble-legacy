import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hello: 'world',
};

export const { actions, reducer } = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.hello = action.payload;
    },
  },
});

export default reducer;
