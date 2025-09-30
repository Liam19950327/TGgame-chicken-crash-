import React, { useContext } from 'react'
import './index.css'
import { GlobalContext } from '../../../../context'

const Balance = () => {
    const { balance } = useContext(GlobalContext);

    return (
        <div className='balance'>
            <p>{"BALANCE" + " " + "$" + " " + Number(balance).toFixed(2)}</p>
        </div>
    )
}

export default Balance