import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { format } from "date-fns";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export const BlogDetails = ({ blogPosts }) => {
  const [postInfo, setPostInfo] = useState(null);
  const [selectedPost, setselectedPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id.length > 5) {
      fetch(`https://blog-app-server-mavt.onrender.com/post/${id}`).then((response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      });
    } else {
      setselectedPost(blogPosts.find((blog) => blog.id === parseInt(id)));
    }
  }, [id, blogPosts]);

  const splitContent = (content) => {
    return content.split("\n").map((paragraph) => paragraph.trim());
  };

  return (
    <main className="h-full">
      <Navbar />
      {selectedPost && (
        <article className="container mx-auto w-[90%] pt-24">
          <div className="text-center">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl tracking-wide">
              {selectedPost.title}
            </h2>
            <p className="text-sm">{format(new Date(), "dd-MM-yyyy")}</p>
            <p className="font-semibold text-xs">By @F.A</p>
            <p className="w-[80%] my-8 mx-auto">
              <img
                src={selectedPost.image}
                alt="post-img"
                className="w-[100%] h-[60vh] object-cover object-center"
              />
            </p>
            {splitContent(selectedPost.content).map((paragraph, index) => (
              <p key={index} className="tracking-normal md:tracking-wide mt-1 md:mt-2 text-left">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      )}

      {postInfo && (
        <article className="container mx-auto w-[90%] pt-24">
          <div className="text-center">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl tracking-wide">
              {postInfo.title}
            </h2>
            <p className="text-sm">{format(new Date(), "dd-MM-yyyy")}</p>
            <p className="font-semibold text-xs">
              By @<span className="uppercase">{postInfo.author.username}</span>
            </p>
            <Link
              to={`/edit/${postInfo._id}`}
              className="button w-[30%] sm:w-[20%] md:w-[10%] mt-5 space-x-1 flex justify-center mx-auto items-center font-semibold"
            >
              <HiOutlinePencilSquare />
              <button className="text-sm md:text-base">Edit Post</button>
            </Link>
            <p className="w-[80%] my-8 mx-auto">
              <img
                src={`https://blog-app-server-mavt.onrender.com/` + postInfo.cover}
                alt="post-img"
                className="w-[100%] h-[60vh] object-cover object-center"
              />
            </p>
            <p dangerouslySetInnerHTML={{ __html: postInfo.content }} className="tracking-normal md:tracking-wide mt-1 md:mt-2 text-left" />
          </div>
        </article>
      )}
      <Footer />
    </main>
  );
};
