import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: RegisterLayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
