import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import UserSideNav from 'src/components/UserSideNav'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function UserLayout() {
  function AuthMiddleware() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
  }

  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <AuthMiddleware />
          </div>
        </div>
      </div>
    </div>
  )
}
