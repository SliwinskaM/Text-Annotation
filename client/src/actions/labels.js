import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes';

import * as api from '../api/labels.js';

export const getLabels = () => async (dispatch) => {
  try {
    const { data } = await api.fetchLabels();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};