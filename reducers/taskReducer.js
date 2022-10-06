import { ACTIONS } from "../actions/taskActions";

const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GETTASKS:
      return { ...state, tasks: action.payload };
    case ACTIONS.ADDTASK: 
      return {...state, tasks: [action.payload, ...state.tasks]}
    case ACTIONS.DELETETASK:
        const remainTask = state.tasks.filter(
            (task) => task.id !== action.payload
          );
      return  { ...state, tasks: remainTask }
    default:
      return state;
  }
};
export default taskReducer;
