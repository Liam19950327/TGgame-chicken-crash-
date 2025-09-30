import React from 'react'
import './index.css'
import headerSvg from '../../assets/header.svg'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-logo'>
                <img src={headerSvg} alt="Header" />
            </div>
        </div>
    )
}

export default Header