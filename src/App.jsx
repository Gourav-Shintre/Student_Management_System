import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Student_Form from "./components/Form/Student_Form";
import EditStudent from "./components/Form/EditStudent";
import Error from "../../Group_Management_Demo/src/pages/Error";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add",
      element: <Student_Form />,
    },
    {
      path: "/update/:std_id",
      element: <EditStudent />,
    },
   {
    path: "*",  
    errorElement: <Error />, 
  }
  ]);

  return (
    <>
      <h1 className="text-primary text-center py-12">
        Student Management System
      </h1>

      <hr />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
