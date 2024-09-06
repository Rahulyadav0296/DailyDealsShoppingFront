import React, { Suspense } from "react";

function SuspensenItems({ children }) {
  return (
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
      {children}
    </Suspense>
  );
}

export default SuspensenItems;
