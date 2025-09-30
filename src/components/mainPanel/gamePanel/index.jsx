import React, { useContext, useRef, useState } from 'react'
import './index.css'
import Loads from './loads'
import { GlobalContext } from '../../../context'
import chickenFoot from "../../../assets/chicken/chicken-foot.webp"
import chickenBody from "../../../assets/chicken/chicken-body.webp"

const GamePanel = () => {
    const { levelArrays } = useContext(GlobalContext);
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
                {levelArrays.map((eachValue, index, original) => {
                    return (
                        <div key={index}>
                            <Loads
                                eachValue={eachValue}
                                index={index}
                                original={original}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="street-end" aria-disabled>
            </div>
            <div className="chicken" aria-disabled>
                <div className="chicken-property">
                    <img className='chicken-body' src={chickenBody} alt="This is chicken body" aria-disabled />
                    <img className='chicken-foot-front' src={chickenFoot} alt="This is chicken leg-1" aria-disabled />
                    <img className='chicken-foot-back' src={chickenFoot} alt="This is chicken leg-2" aria-disabled />
                </div>
            </div>
        </div>
    )
}

export default GamePanel