"use client";

interface LoginFormProps {
  username: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

export default function LoginForm({ username, onChange, onEnter }: LoginFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnter();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="modal-title">Welcome to CodeLeap network!</h2>

        <label className="field-label" htmlFor="username">
          Please enter your username
        </label>
        <input
          id="username"
          type="text"
          className="field-input"
          placeholder="John doe"
          value={username}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        <div className="modal-footer">
          <button
            className={`btn-enter ${!username.trim() ? "disabled" : ""}`}
            onClick={onEnter}
            disabled={!username.trim()}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}