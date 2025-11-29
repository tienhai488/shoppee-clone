import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function CartLayout({ children }: RegisterLayoutProps) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
