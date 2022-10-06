import React, { useContext, useState } from "react";
import { ACTIONS } from "../../actions/userActions";
import { PostContext } from "../../contexts/PostContext";
import Link from 'next/link'
import { addPost } from "../api/post";
const Dashboard = () => {
  const { postState, dispatch } = useContext(PostContext);
  const [post, setPost] = useState("")
  const handleDelete = (id) => {
      dispatch({type: ACTIONS.DELETEPOST, payload: id})
  };

  const handleChange = (e) => {
    setPost(e.target.value)
  }
  const handleSubmit =  (e) => {
    e.preventDefault();
    const formData = {
      id: 122,
      title: post,
      body: 'lorem',
      userId: 122
    }
    
      addPost(formData).then(response => {
        
        dispatch({type: ACTIONS.ADDPOST, payload: formData})
           
      }).catch(error => {
        console.log(error)
      })
      // await addPost(formData, dispatch)
      //  dispatch({type: ACTIONS.ADDPOST, payload: formData})
   
  
  };
  return (
    <div>
      <form
        className=" flex justify-center items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="form-group flex flex-row">
          <input
            type="text"
            className="p-2 outline-none focus:border-gray-500"
            placeholder="testing"
            onChange={handleChange}
            value={post}
          />
          <input
            type="submit"
            onClick={handleSubmit}
            className="p-4 cursor-pointer bg-white border border-solid  text-slate-800 w-full"
           
          />
        </div>
      </form>
      <div className="result mx-auto p-10  mt-20">
        <table className="border-collapse  border border-slate-400 bg-white">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {postState.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button className="border border-solid border-slate-800 p-2 rounded" onClick={() => {handleDelete(post.id)}}>
                    Delete
                  </button>
                </td>
                <td>

                 
                  <Link href={`/dashboard/${post.id}`}>
                  <button className="border border-solid border-slate-800 ml-3 mr-3 p-2 rounded" >
                    EDIT
                  </button>

                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
