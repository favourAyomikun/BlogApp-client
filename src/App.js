import { RouterProvider } from "react-router-dom";
import { router } from "./routes/BlogRoute";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  // const userSignedIn = !!localStorage.getItem('token')

  return (
    <AuthProvider>
      <section className="bg-[#F3EFEF] text-[#333333] h-full font-body">
        <RouterProvider router={router} />
      </section>
    </AuthProvider>
  );
}

export default App;
