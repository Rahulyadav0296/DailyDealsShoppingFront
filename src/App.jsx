import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import SuspensenItems from "./pages/SuspenseItems/SuspensenItems";

// Lazy load components
const Blog = React.lazy(() => import("./components/Blog/Blog"));
const Address = React.lazy(() => import("./components/Cart/Address/Address"));
const Cart = React.lazy(() => import("./components/Cart/Cart"));
const PlaceOrder = React.lazy(() =>
  import("./components/Cart/PlaceOrder/PlaceOrder")
);
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const OrderConfirmation = React.lazy(() =>
  import("./components/OrderConfirmation/OrderConfirmation")
);
const Product = React.lazy(() => import("./components/Shop/Product/Product"));
const Shop = React.lazy(() => import("./components/Shop/Shop"));
const ErrorPage = React.lazy(() => import("./pages/Error/ErrorPage"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Registration = React.lazy(() => import("./pages/Register/Registration"));
const Root = React.lazy(() => import("./pages/Root"));
const User = React.lazy(() => import("./pages/User/User"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspensenItems>
        <Root />
      </SuspensenItems>
    ),
    errorElement: (
      <SuspensenItems>
        <ErrorPage />
      </SuspensenItems>
    ),
    children: [
      {
        path: "",
        element: (
          <SuspensenItems>
            <Home />
          </SuspensenItems>
        ),
      },
      {
        path: "signin",
        element: (
          <SuspensenItems>
            <Login />
          </SuspensenItems>
        ),
      },
      {
        path: "signup",
        element: (
          <SuspensenItems>
            <Registration />
          </SuspensenItems>
        ),
      },
      {
        path: "signup/:id",
        element: (
          <SuspensenItems>
            <User />
          </SuspensenItems>
        ),
      },
      {
        path: "products",
        element: (
          <SuspensenItems>
            <Shop />
          </SuspensenItems>
        ),
      },
      {
        path: "products/:id",
        element: (
          <SuspensenItems>
            <Product />
          </SuspensenItems>
        ),
      },
      {
        path: "contact",
        element: (
          <SuspensenItems>
            <Contact />
          </SuspensenItems>
        ),
      },
      {
        path: "cart",
        element: (
          <SuspensenItems>
            <Cart />
          </SuspensenItems>
        ),
      },
      {
        path: "blog",
        element: (
          <SuspensenItems>
            <Blog />
          </SuspensenItems>
        ),
      },
      {
        path: "place-order",
        element: (
          <SuspensenItems>
            <Address />
          </SuspensenItems>
        ),
      },
      {
        path: "payment-order",
        element: (
          <SuspensenItems>
            <PlaceOrder />
          </SuspensenItems>
        ),
      },
      {
        path: "order-confirm",
        element: (
          <SuspensenItems>
            <OrderConfirmation />
          </SuspensenItems>
        ),
      },
      {
        path: "order-summary",
        element: (
          <SuspensenItems>
            <OrderSummary />
          </SuspensenItems>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
