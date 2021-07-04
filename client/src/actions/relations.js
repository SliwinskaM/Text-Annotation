import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes';

import * as api from '../api/relations.js';

export const getRelations = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRelations();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


// export const deleteDocument = (id) => async (dispatch) => {
//   try {
//     await api.deleteDocument(id);

//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error.message);
//   }
// };