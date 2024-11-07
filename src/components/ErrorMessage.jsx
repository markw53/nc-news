import React from "react";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <aside className="error-message" role="alert" aria-live="assertive">
      <p>{message}</p>
    </aside>
  );
}

export default ErrorMessage;
