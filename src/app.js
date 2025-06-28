import React,{lazy, Suspense} from "react";
import ReactDom from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Grocery from "./components/Grocery";

//chunking
//code splitting
//dynamic bundling
//lazy loading
//dynamic import

const Grocery = lazy(() => import("./components/Grocery"));
// Lazy loading the Grocery component to optimize performance


// App Layout Component
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
        <Outlet />
        {/* The Outlet component renders the child routes */}
        {/* This is where the nested routes will be displayed */}
        {/* For example, if the path is /about, it will render the About component here */}
        {/* If the path is /contact, it will render the Contact component here */}
        {/* If the path is /, it will render the Body component here */}
        
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    //   {
    //     path: "/restaurant/:resId",
    //     element: <RestaurantMenu/>
    //   },
    {
      path: "/Grocery",
      element: <Suspense fallback={<h1>Loadingggg...😒</h1>} ><Grocery/></Suspense>
    },
      {
        path: "/restaurant",
        element: <RestaurantMenu />
      }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
