import React, { useRef, useEffect, ReactPropTypes } from 'react'
import { windowHeight, windowWidth } from '../constants'
const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

const Canvas = (props:React.HTMLAttributes<HTMLCanvasElement>) => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas!.getContext('2d')!
    let frameCount = 0
    let animationFrameId: ReturnType<Window["requestAnimationFrame"]>;
    
    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  props = Object.assign({
    className: "fixed block w-full h-full p-0 m-0 top-0 left-0 translate-x-0.5 translate-y-0.5",
    width: windowWidth,
    height: windowHeight,
    ref: canvasRef
  }, props);
  
  return <canvas {...props}/>
}

export default Canvas