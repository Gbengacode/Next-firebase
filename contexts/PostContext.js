import { createContext, useReducer, useEffect } from "react";
import { ACTIONS } from "../actions/userActions";
import { getPost } from "../pages/api/post";
import postReducer from "../reducers/postReducer";

const initialState = {
  posts: [],
};
export const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const fetchInfo = async () => {
    const data = await getPost();
    dispatch({ type: ACTIONS.GETPOSTS, payload: data });
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <PostContext.Provider value={{postState: state.posts, dispatch}}>{children}</PostContext.Provider>
  );
};
