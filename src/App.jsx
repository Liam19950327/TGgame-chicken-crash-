import React from 'react'
import './App.css'
import Header from './components/header'
import MainPanel from './components/mainPanel'
import Provider from './context'


function App() {

  return (
    <Provider>
      <div className='app'>
        <Header />
        <MainPanel />
      </div>
    </Provider>
  )
}

export default App
