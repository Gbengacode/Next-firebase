import { ACTIONS } from "../actions/userActions";

const postReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GETPOSTS:
      return { ...state, posts: action.payload };
    
     case ACTIONS.ADDPOST: 
       return {...state, posts: [action.payload, ...state.posts]}
       
    case ACTIONS.DELETEPOST:
      const remainPost = state.posts.filter(
        (post) => post.id !== Number(action.payload)
      );
      return { ...state, posts: remainPost };

    case ACTIONS.UPDATEPOST:
 
      const updatedPost = state.posts.map(post => {
        
        if(post.id === Number(action.payload.id) && post.userId === Number(action.payload.userId)){
          return action.payload
        }
        return post
      })
  
      return  { ...state, posts: updatedPost}
    default:
      return state;
  }
};

export default postReducer;
