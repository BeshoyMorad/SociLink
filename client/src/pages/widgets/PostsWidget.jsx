import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

function PostsWidget({ userId, isProfile = false }) {
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </>
  );
}

export default PostsWidget;
