import React, { useState } from 'react'
import './index.css'
import headerSvg from '../../assets/header.svg'

const Header = () => {
    const [flag, setFlag] = useState(true);
    return (
        <div className='header'>
            <div className='header-logo'>
                <img src={headerSvg} alt="Header" />
            </div>
            <div className="hamberger" onClick={() => setFlag(!flag)}>
                <div className='over1060'>
                    {flag ?
                        <span>˃</span>
                        :
                        <span>˂</span>
                    }
                </div>
                <div className='under1060'>
                    {flag ?
                        <span>˄</span>
                        :
                        <span>˅</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header