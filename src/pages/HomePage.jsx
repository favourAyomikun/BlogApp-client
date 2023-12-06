import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { BlogContent } from "./BlogContent";
import { Footer } from "../components/Footer";
import { blogPosts } from "../data/blogData";

export const HomePage = () => {
  const [blogs, setBlogs] = useState(blogPosts);

  const filterBlogCategory = (categories) => {
    setBlogs(
      blogPosts.filter((blog) => {
        return blog.category === categories;
      })
    );
  };

  return (
    <main>
      <Navbar />
      <div>
        <h1 className="text-center pt-24 text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-[#888888]">
          Welcome to F.A's Blog, the home of News
        </h1>
        <h1 className="mt-10 md:mt-16 ml-12 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-[#888888]">
          Popular Trends
        </h1>
        <ul className="flex mx-12 text-sm sm:text-base md:text-lg space-x-4 my-4 md:my-7 cursor-pointer text-[#888888]">
          <li className="list" onClick={() => setBlogs(blogPosts)}>
            All
          </li>
          <li className="list" onClick={() => filterBlogCategory("music")}>
            Music
          </li>
          <li className="list" onClick={() => filterBlogCategory("sports")}>
            Sports
          </li>
          <li className="list" onClick={() => filterBlogCategory("news")}>
            News
          </li>
          <li className="list" onClick={() => filterBlogCategory("business")}>
            Business
          </li>
          <li className="list" onClick={() => filterBlogCategory("security")}>
            Security
          </li>
        </ul>
        <div>
          <BlogContent blogs={blogs} />
        </div>
        <Footer />
      </div>
    </main>
  );
};
