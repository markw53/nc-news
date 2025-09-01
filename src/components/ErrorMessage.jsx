function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <aside
      className="bg-nc-danger/10 border border-nc-danger text-nc-danger p-4 rounded my-3"
      role="alert"
    >
      <p className="m-0">{message}</p>
    </aside>
  );
}

export default ErrorMessage;