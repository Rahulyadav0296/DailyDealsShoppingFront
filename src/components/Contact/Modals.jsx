import React from "react";

function Modals({ handleClose, result, output }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {result ? (
          <p>{output}</p>
        ) : (
          <>
            <h1>You Missed Something</h1>
            <p>Please Enter Every Input Fields</p>
          </>
        )}
        <button className="modal-close" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modals;
