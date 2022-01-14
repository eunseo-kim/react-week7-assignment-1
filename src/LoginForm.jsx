export default function LoginForm({ onClick, onChange }) {
  return (
    <>
      <div>
        <label htmlFor="login-email">
          E-mail
        </label>
        <input
          id="login-email"
          type="email"
          name="email"
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          name="password"
          onChange={onChange}
        />
      </div>
      <button
        type="button"
        onClick={onClick}
      >
        Log In
      </button>
    </>
  );
}
