import React from 'react'
import './index.css'
import Balance from './balance'
import Crash from './crash'

const ChickenPanel = () => {
    

    return (
        <div className='chicken-panel'>
            <Balance />
            <Crash />
        </div>
    )
}

export default ChickenPanel