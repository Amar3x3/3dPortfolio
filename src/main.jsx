import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <div className='title'>
    <Browser>
      <Routes>
        
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
    </Browser>
  </div>
)
