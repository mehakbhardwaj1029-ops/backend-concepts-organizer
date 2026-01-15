import React from 'react'
import Home from './components/home'
import { Route, Routes } from 'react-router-dom'
import Code from './components/Code'
import Docs from './components/Docs'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/code/:id"element={<Code/>}/>
            <Route path="/docs/:id"element={<Docs/>}/>

        </Routes>
    </div>
  )
}

export default App