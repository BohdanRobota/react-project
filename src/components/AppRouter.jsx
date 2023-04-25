import React, { useContext } from 'react';
import Error from '../pages/Error';
import Login from '../pages/Login';
import { publicRoutes, privateRoutes } from '../router';
import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import { AuthContext } from '../context';
import { Navigate } from 'react-router-dom';
import Loader from './UI/Loader/Loader';

function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);
  if(isLoading){
    return <Loader/>
  }
  console.log(isAuth);
  return (
    <div>
      {isAuth ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route key={route.path} element={route.component} path={route.path} exact={route.exact} />
          ))}
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} element={route.component} path={route.path} exact={route.exact} />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
}

export default AppRouter;
