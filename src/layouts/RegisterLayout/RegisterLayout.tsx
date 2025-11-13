import Footer from 'src/components/Footer'
import AuthHeader from 'src/components/AuthHeader'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div>
      <AuthHeader />
      {children}
      <Footer />
    </div>
  )
}
