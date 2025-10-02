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

        /*{
const appWrapper = document.querySelector(".main-panel");
  const computedStyle = window.getComputedStyle(appWrapper);

  let scaleX;

  if (computedStyle.transform === "none") {
    scaleX = 1;
  } else {
    scaleX = parseFloat(computedStyle.transform.match(/matrix\(([^,]+),/)[1]);
  }

  const rect = appWrapper.getBoundingClientRect();
  const originalWidth = rect.width / scaleX;
  const scaleWidth = window.innerWidth / originalWidth;
  const scale = scaleWidth * 0.99; // Scale based only on width

  // Apply the horizontal scaling
  appWrapper.style.transform = `scale(${scale})`;
  appWrapper.style.transformOrigin = "top left";

  // Center the app horizontally
  const offsetX = (window.innerWidth - originalWidth * scale) / 2;
  appWrapper.style.marginLeft = `${offsetX}px`;

  // Constrain the mobile wrapper height to avoid extra scrollable space
  requestAnimationFrame(() => {
    const mobileWrapper = document.querySelector(".mobile-main-wrapper");
    // const appHeight = appWrapper.getBoundingClientRect().height * scale;
    mobileWrapper.style.height = `${appWrapper.getBoundingClientRect().height}px`;
    mobileWrapper.style.marginTop =
      Math.max(
        0,
        appWrapper.getBoundingClientRect().height -
          document.getElementById("application-body").getBoundingClientRect().height
      ) + "px";
  });
        }*/
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