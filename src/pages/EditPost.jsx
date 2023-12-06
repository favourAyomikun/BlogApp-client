import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar';
import { Editor } from '../components/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const EditPost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState('');
    const navigate = useNavigate();

    const { token } = useAuth();

  useEffect(() => {
    fetch(`https://blog-app-server-mavt.onrender.com/` + id)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setContent(postInfo.content)
            })
        })
  }, [])

  const handleUpdatePost = async (e) => {
    e.preventDefault()

    const data = new FormData();

    data.set("title", title);
    data.set("content", content);
    data.set('id', id)
    if(files?.[0]) {
        data.set("file", files?.[0]);
    }

    const response = await fetch(`https://blog-app-server-mavt.onrender.com/post`, {
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    if(response.ok) {
        navigate('/blogs/' + id)
    }
}  

  return (
    <main className="h-full">
      <Navbar />
      <form onSubmit={handleUpdatePost} className="flex flex-col items-center pt-24 pb-5 space-y-6">
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
          onChange={e => setFiles(e.target.files)}
        />
        <Editor value={content} onChange={setContent}/>
        <button className="button font-semibold border border-gray-400">
          Update Post
        </button>
      </form>
    </main>
  );
}
