import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';
import '../../../styles/App.css';
import MyButton from '../button/MyButton';

function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const router = useNavigate();
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };
  return (
    <div className="navbar">
      {isAuth && <MyButton onClick={logout}>Logout</MyButton>}
      <div className="navbar__items">
        <Link to="/about" className="navbar__item">
          About page
        </Link>
        <Link to="/posts" className="navbar__item">
          Posts page
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
