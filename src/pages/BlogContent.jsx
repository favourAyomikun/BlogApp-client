import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export const BlogContent = ({ blogs }) => {
  const [createdPosts, setCreatedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://blog-app-server-mavt.onrender.com/post`);
        const posts = await response.json();
        setCreatedPosts(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const splitContent = (content) => {
    return content.split("\n").map((paragraph) => paragraph.trim());
  };

  const updatedBlogPosts = blogs.map((post) => ({
    ...post,
    content: splitContent(post.content),
  }));

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 px-10">
      {[...updatedBlogPosts, ...createdPosts].map((post) => (
        <div key={post.id || post._id} className="w-full">
          <p>
            <img
              src={post.image || `https://blog-app-server-mavt.onrender.com/${post.cover}`}
              alt="post-img"
              className="h-52 md:h-72 w-[70%] md:w-full object-cover object-center rounded-md"
            />
          </p>
          <p className="mt-3 text-sm">
            {format(
              new Date(post.date || post.createdAt || new Date()),
              "dd-MM-yyyy"
            )}
          </p>
          <h2 className="font-semibold text-base md:text-lg pt-2 tracking-wide">
            {post.title}
          </h2>
          <Link to={`/blogs/${post.id || post._id}`} className="pt-2 text-sm md:text-base">
            {post.content && post.content[0]}
            <small className="text-sm font-semibold hover:underline underline-offset-2">
              Read More....
            </small>
          </Link>
        </div>
      ))}
    </main>
  );
};
