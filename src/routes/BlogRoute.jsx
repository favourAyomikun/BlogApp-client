import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { About } from '../pages/About'
import { Login } from '../pages/Login'
import { CreateAccount } from '../pages/CreateAccount'
import { BlogDetails } from '../pages/BlogDetails'
import { blogPosts } from '../data/blogData'
import { CreatePost } from '../pages/CreatePost'
import { EditPost } from '../pages/EditPost'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/createAccount',
        element: <CreateAccount />
    },
    {
        path: '/blogs/:id',
        element: <BlogDetails blogPosts={ blogPosts } />
    },
    {
        path: '/edit/:id',
        element: <EditPost blogPosts={ blogPosts } />
    },
    {
        path: '/createPost',
        element: <CreatePost />
    }
])