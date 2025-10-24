import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Features from './components/Features'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <ProductGrid />
        <Features />
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App

