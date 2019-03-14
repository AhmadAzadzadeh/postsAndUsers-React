import _ from "lodash";
import jsonPlaceholder from "../api/jsonPlaceholder";
import { FETCH_POSTS, FETCH_USER } from "./types";

// approach #2 => this approach is very good
export const fetchPostsAndUsers = () => {
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());
    _.chain(getState().posts)
      .map("userId")
      .uniq()
      .forEach(id => dispatch(fetchUser(id)))
      .value();
  };
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({
    type: FETCH_POSTS,
    payload: response.data
  });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

// Memoize approach #1

//  we passed the id of user that we want to fetch
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

//  _ indicate that, this function is a private function
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({
//     type: FETCH_USER,
//     payload: response.data
//   });
// });
