import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Editor } from "../components/Editor";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  const { token } = useAuth();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.set("title", title);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch(`https://blog-app-server-mavt.onrender.com/post`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <main className="h-screen">
      <Navbar />
      <form
        onSubmit={handleCreatePost}
        className="flex flex-col items-center pt-36 space-y-6"
      >
        <input
          type="text"
          placeholder="Title"
          className='className="mt-3 w-[60%] p-2 border border-gray-300 rounded-md'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          className='className="mt-3 w-[60%] p-2 border border-gray-300 rounded-md'
          onChange={(e) => setFiles(e.target.files)}
        />
        <Editor value={content} onChange={setContent} />
        <button className="button font-semibold border border-gray-400">
          Create Post
        </button>
      </form>
    </main>
  );
};
