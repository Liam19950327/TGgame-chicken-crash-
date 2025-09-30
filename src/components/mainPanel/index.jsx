import React, { useEffect } from 'react'
import './index.css'
import ChickenPanel from './chickenPanel'
import GamePanel from './gamePanel'

const MainPanel = () => {
    useEffect(() => {
        window.addEventListener("load", scaleApplicationWrapper);
        window.addEventListener("resize", scaleApplicationWrapper);
    }, []);

    useEffect(() => {
        scaleApplicationWrapper();
    }, []);

    const scaleApplicationWrapper = () => {
        const appWrapper = document.querySelector(".main-panel");
        const maxWidth = 1450;
        const maxHeight = 800;
        const scaleWidth = window.innerWidth / maxWidth;
        const scaleHeight = window.innerHeight / maxHeight;
        const scale = Math.min(scaleWidth, scaleHeight);
        appWrapper.style.transform = `scale(${scale})`;
        appWrapper.style.transformOrigin = "top left";
        const offsetX = (window.innerWidth - maxWidth * scale) / 2;
        const offsetY = (window.innerHeight - maxHeight * scale) / 2;
        appWrapper.style.marginLeft = `${offsetX}px`;
        appWrapper.style.marginTop = `${offsetY}px`;
    };
    
    return (
        <div className='panel'>
            <div className='main-panel'>
                <GamePanel />
                <ChickenPanel />
            </div>
        </div>
    )
}

export default MainPanel