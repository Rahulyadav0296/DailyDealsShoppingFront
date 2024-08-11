import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Blog from "./components/Blog/Blog";
import Address from "./components/Cart/Address/Address";
import Cart from "./components/Cart/Cart";
import PlaceOrder from "./components/Cart/PlaceOrder/PlaceOrder";
import Contact from "./components/Contact/Contact";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import Product from "./components/Shop/Product/Product";
import Shop from "./components/Shop/Shop";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Register/Registration";
import Root from "./pages/Root";
import User from "./pages/User/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "signup/:id",
        element: <User />,
      },
      {
        path: "products",
        element: <Shop />,
      },
      {
        path: "products/:id",
        element: <Product />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "place-order",
        element: <Address />,
      },
      {
        path: "payment-order",
        element: <PlaceOrder />,
      },
      {
        path: "order-confirm",
        element: <OrderConfirmation />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
