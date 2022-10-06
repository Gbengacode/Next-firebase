import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { ACTIONS } from "../../actions/userActions";
import { PostContext } from "../../contexts/PostContext";
import { updatePost } from "../api/post";
const Dashboard = () => {
  const { postState, dispatch } = useContext(PostContext);
  const router = useRouter();
  const id = router.query.dashboard;
  const singlePost = postState.find((post) => post.id === Number(id));
  const [post, setPost] = useState("");

  const handleChange = (e) => {
    setPost(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: id,
      title: post,
      body: "lorem",
      userId: singlePost.userId,
    };
    
    updatePost(formData).then(response => {
      console.log(response);
      dispatch({ type: ACTIONS.UPDATEPOST, payload: formData });
    }).catch(error => {
      console.log(error)
    }) 
   
    router.push("/dashboard");
  };
  useEffect(() => {
    setPost((singlePost && singlePost.title) || null);
  }, []);
  return (
    <>
      <form
        className=" flex justify-center items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="form-group flex flex-row">
          <input
            type="text"
            className="p-2 outline-none  focus:border-gray-500"
            placeholder="testing"
            onChange={handleChange}
            value={post}
          />
          <input
            type="submit"
            onClick={handleSubmit}
            className="p-4 cursor-pointer  rounded-sm bg-white border border-solid  text-slate-800 w-full"
          />
        </div>
      </form>
    </>
  );
};

export default Dashboard;
