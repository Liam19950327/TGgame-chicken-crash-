import React, { useRef, useState } from 'react'
import './index.css'
import { highLevel, lowLevel, mediumLevel } from "../../../script/level"
import Loads from './loads'

const GamePanel = () => {
    const containerRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const dragStateRef = useRef({ startX: 0, scrollLeft: 0 })

    const onMouseDown = (e) => {
        if (!containerRef.current) return
        setIsDragging(true)
        containerRef.current.classList.add('dragging')
        dragStateRef.current = {
            startX: e.pageX - containerRef.current.offsetLeft,
            scrollLeft: containerRef.current.scrollLeft,
        }
    }

    const onMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - dragStateRef.current.startX) * 1
        containerRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk
    }

    const endDrag = () => {
        if (!containerRef.current) return
        setIsDragging(false)
        containerRef.current.classList.remove('dragging')
    }

    const onTouchStart = (e) => {
        if (!containerRef.current) return
        setIsDragging(true)
        containerRef.current.classList.add('dragging')
        const touch = e.touches[0]
        dragStateRef.current = {
            startX: touch.pageX - containerRef.current.offsetLeft,
            scrollLeft: containerRef.current.scrollLeft,
        }
    }

    const onTouchMove = (e) => {
        if (!isDragging || !containerRef.current) return
        const touch = e.touches[0]
        const x = touch.pageX - containerRef.current.offsetLeft
        const walk = (x - dragStateRef.current.startX) * 1
        containerRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk
    }

    return (
        <div
            className='game-panel'
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={endDrag}
        >
            <div className="street-start" aria-disabled>
            </div>
            <div className="main-street" aria-disabled>
                {highLevel.map((eachValue, index) => {
                    return (
                        <div>
                            <Loads
                                key={index}
                                eachValue={eachValue}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="street-end" aria-disabled>
            </div>
        </div>
    )
}

export default GamePanel