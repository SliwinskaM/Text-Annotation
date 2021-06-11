import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes';

import * as api from '../api/index.js';


export const getLabels = () => async (dispatch) => {
  try {
    const { data } = await api.fetchLabels();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createLabel = (post) => async (dispatch) => {
  try {
    const { data } = await api.createLabel(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLabel = (id) => async (dispatch) => {
  try {
    await api.deleteLabel(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};