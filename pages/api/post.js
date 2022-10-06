export const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
};

export const addPost = async (post) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // your expected POST request payload goes here
      post,
    }),
  });
  const data = await response.json();

  return data;
};

export const updatePost = async (post) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post,
    }),
  });
  const data = await response.json();
  return data;
};

export const deletePost = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};

export default async function handler(req, res) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  res.status(200).send(data);
}
