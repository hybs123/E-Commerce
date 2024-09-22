import React, { Profiler } from 'react'
import { Route, Routes, ScrollRestoration } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import About from './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Profile from './pages/Profile'
import ScrollToTop from './components/Scrolltotop'
import Backendorders from './pages/backendorders'
import Adminpanel from './pages/adminpanel'
import Backend from './pages/backend'

// import ScrollToTop from './components/Scrolltotop'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-yellow-900'>
    <ToastContainer />
      <Navbar />
      <SearchBar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/placeorder' element={<Placeorder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/backend' element={<Backend />} />
        
        <Route path='/backendorders' element={<Backendorders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/adminpanel' element={<Adminpanel />} />
        
        
      </Routes>
      <Footer />

    </div>
  )
}

export default App
