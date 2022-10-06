import { useEffect, createContext, useReducer } from "react";
import { db } from "../firebase";
import taskReducer from "../reducers/taskReducer";
import { collection, getDocs } from "firebase/firestore";
import { ACTIONS } from "../actions/taskActions";
const initialState = {
  tasks: [],
};

export const TaskContext = createContext(initialState);
const taskCollectionRef = collection(db, "tasks");
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const getTask = async () => {
    const tasks = await getDocs(taskCollectionRef);
    const task = tasks.docs.map(doc=> ({...doc.data(), id: doc.id}))

    dispatch({type: ACTIONS.GETTASKS, payload: task})
  };
  useEffect(() => {
    getTask();
  }, []);
  return (
    <TaskContext.Provider value={{ taskState: state.tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
