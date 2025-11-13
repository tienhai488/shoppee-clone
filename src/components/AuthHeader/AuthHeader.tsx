import { Link, useMatch } from 'react-router-dom'
import Logo from '../Logo'
import path from 'src/constants/path'

export default function AuthHeader() {
  const registerMatch = useMatch(path.register)
  const isRegisterPage = Boolean(registerMatch)
  return (
    <header className='py-5'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to='/'>
            <Logo />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegisterPage ? 'Đăng ký' : 'Đăng nhập'}</div>
        </nav>
      </div>
    </header>
  )
}
