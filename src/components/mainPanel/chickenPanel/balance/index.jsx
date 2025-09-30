import React from 'react'
import './index.css'

const Balance = () => {
    let balance = 10000;

    return (
        <div className='balance'>
            <p>{"BALANCE" + " " + "$" + " " + balance}</p>
        </div>
    )
}

export default Balance