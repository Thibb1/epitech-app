/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const Login = lazy(() => import('../pages/Login/Login'))

const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const Planning = lazy(() => import('../pages/Planning/Planning'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))

const routes = [
  {
      path: '/login',
      exact: true,
      element: (
          <UnauthorizedRoute>
              <Login redirectTo="/home" />
          </UnauthorizedRoute>
      ),
  },
  {
    path: '/about',
    exact: true,
    element: <About />,
  },
  {
    path: '/my_account',
    exact: true,
    element: (
      <AuthorizedRoute>
        <MyAccount />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/home',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Home />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/planning',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Planning />
      </AuthorizedRoute>
    ),
  },
]

export default routes
