import React, { useRef, useEffect, ReactPropTypes } from 'react'
import { windowHeight, windowWidth } from '../constants'
import { Vec2 } from '../interfaces';

export type ICanvasElement = React.HTMLAttributes<HTMLCanvasElement>;

export enum B_COLLISION {
  TOP = 0b0001,
  BOTTOM = 0b0010,
  
}

const arcSize = (windowWidth / windowHeight) * .5;
const maxRes = Math.min(windowHeight, windowWidth);

const position = new Vec2(0, 0);


const onBorderHit = (ctx: CanvasRenderingContext2D, pos: Vec2) => {
  const { width, height }= ctx.canvas;

  
}

const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const borderHitResult = onBorderHit(ctx,  position);
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(position.x, position.y, maxRes * arcSize, 0, 2 * Math.PI)
  ctx.fill()
}

const Canvas = (props: React.HTMLAttributes<HTMLCanvasElement>) => {

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

  return <canvas {...props} />
}

export default Canvas