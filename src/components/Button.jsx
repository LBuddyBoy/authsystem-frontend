export default function Button({ id, text, action, children }) {
  return (
    <button className="btn" id={id} onClick={action && action}>
      {text}
      {children}
    </button>
  );
}
