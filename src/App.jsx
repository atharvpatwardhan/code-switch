import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { NavBar } from './components/NavBar'
import { Home } from './components/Home'
import { Footer } from './components/Footer'

function App() {

  return (
    <>
      <div className='sm:bg-gradient-to-t from-black via-blue-900 to-black h-screen bg-blue-900'>
        <NavBar />
        <Home />
        <Footer />
      </div>
    </>
  )
}

export default App
