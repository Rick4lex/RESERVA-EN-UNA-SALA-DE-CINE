import React, { useState } from 'react';
import supabase from '../ServerBackend/Supabase';

const Auth: React.FC = () => {
  // Tipado explícito para los estados
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  // Tipado del evento de formulario
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message || 'An error occurred. Please try again.');
    } else {
      alert('Check your email for the login link!');
    }

    setLoading(false);
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">supabase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div>
            <button className="button block" disabled={loading}>
              {loading ? <span>Loading...</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
