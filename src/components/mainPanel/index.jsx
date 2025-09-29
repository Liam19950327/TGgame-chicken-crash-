import React from 'react'
import './index.css'
import ChickenPanel from './chickenPanel'
import GamePanel from './gamePanel'

const MainPanel = () => {
    return (
        <div className='main-panel'>
            <GamePanel />
            <ChickenPanel />
        </div>
    )
}

export default MainPanel