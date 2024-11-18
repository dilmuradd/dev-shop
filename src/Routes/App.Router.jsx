import React from 'react'
import { useRoutes } from 'react-router-dom'
import Catalog from '../pages/catalog'
import Clubs from '../pages/clubs'
import CreateOrder from '../pages/createOrder'

export default function AppRouter() {
    const router = useRoutes([
      { path: '/', element: <Catalog/>},
      { path: '/clubs/:id', element: <Clubs/>},
      { path: '/create', element: <CreateOrder/>},
    ])
  return router
}
