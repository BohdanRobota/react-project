import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    setIsAuth(true);
  };
  return (
    <div className="error">
      <h1 style={{ color: 'teal' }}>Loggin page</h1>
      <form>
        <MyInput type="text" placeholder="enter login" />
        <MyInput type="password" placeholder="enter password" />
        <MyButton onClick={login}>Login</MyButton>
      </form>
    </div>
  );
}

export default Login;
