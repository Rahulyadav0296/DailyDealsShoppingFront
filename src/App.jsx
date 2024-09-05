import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
      <Suspense
        fallback={
          <div className="loading-container">
            <img
              src="https://i.giphy.com/jAYUbVXgESSti.webp"
              alt="Loading..."
              className="loading-image"
            />
          </div>
        }
      >
        <Root />
      </Suspense>
    ),
    errorElement: (
      <Suspense
        fallback={
          <div className="loading-container">
            <img
              src="https://i.giphy.com/jAYUbVXgESSti.webp"
              alt="Loading Error Page..."
              className="loading-image"
            />
          </div>
        }
      >
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Home..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Login..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Registration..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Registration />
          </Suspense>
        ),
      },
      {
        path: "signup/:id",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading User..."
                  className="loading-image"
                />
              </div>
            }
          >
            <User />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Shop..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Product..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Product />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Contact..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Cart..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Blog..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "place-order",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Address..."
                  className="loading-image"
                />
              </div>
            }
          >
            <Address />
          </Suspense>
        ),
      },
      {
        path: "payment-order",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Place Order..."
                  className="loading-image"
                />
              </div>
            }
          >
            <PlaceOrder />
          </Suspense>
        ),
      },
      {
        path: "order-confirm",
        element: (
          <Suspense
            fallback={
              <div className="loading-container">
                <img
                  src="https://i.giphy.com/jAYUbVXgESSti.webp"
                  alt="Loading Order Confirmation..."
                  className="loading-image"
                />
              </div>
            }
          >
            <OrderConfirmation />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
