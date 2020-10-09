import React, { useState } from "react";
import {useHistory, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

export default function Login() {
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(false)
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json" 
        },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      dispatch({
        type: 'AUTHENTICATED_SUCCESSFULLY'
      })
      return history.push('/secret')
    }
    return setError('Повторите вход')
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { email, password } = inputs;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Sign In</button>
      <Link to="/">Home</Link>
    <div className="error">
      {error}
    </div>
    </form>
  );
}
