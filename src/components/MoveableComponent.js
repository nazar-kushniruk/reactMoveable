import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import Moveable from "react-moveable";
import {Frame} from "scenejs";

const MoveableResultBox = styled.div`
  position: relative;
`;

const MoveableControlBox = ({
                                moveableResultBoxRef,
                                canvasRef,
                                frameWidth,
                                frameHeight,
                                positionUnit,
                                frameTop,
                                frameAngle,
                                frameLeft,
                                resizable = true,
                                scalable = true,
                                liveDrag=true,
                                maxWidth = null,
                                maxHeight = null,
                                minWidth = 50,
                                minHeight = 50,
                                overflow = true,
                                overflowOffsets = [0, 0, 0, 0],
                                snapable
                            }) => {

    let bounds = undefined;

    const [target, setTarget] = useState(null);

    useEffect(
        () => {
            setTarget(moveableResultBoxRef.current);
            alignTargetToFrame(moveableResultBoxRef.current);

        },
        [target]
    );

    useEffect(() => {
        bounds = calculateBounds(canvasRef.current.getBoundingClientRect())
        console.log('canvasRefRect->', bounds);
    }, []);
    const moveRef = useRef();


    const frame = new Frame({
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        left: `${frameLeft}${positionUnit}`,
        top: `${frameTop}${positionUnit}`,
        transform: {
            rotate: `${frameAngle}deg`
        }
    });

    const alignTargetToFrame = target => {
        let css = frame.toCSS();
        liveDrag && liveDrag(css);
        return (target.style.cssText = css);
    };

    const onDrag = ({ target, top, left }) => {
        frame.set({
            left: `${left}px`,
            top: `${top}px`
        });
        alignTargetToFrame(target);
    };

    const calculateLimits = (newWidth, newHeight) => {
        let width = newWidth,
            height = newHeight;

        if (maxWidth && width > maxWidth) {
            width = maxWidth;
        }

        if (maxHeight && height > maxHeight) {
            height = maxHeight;
        }

        if (minWidth && width < minWidth) {
            width = minWidth;
        }

        if (minHeight && height < minHeight) {
            height = minHeight;
        }

        return { width, height };
    };
    const calculateBounds = canvasRefRect => {
        return {
            left: canvasRefRect.left + 20,
            right: canvasRefRect.right - 20,
            top: canvasRefRect.top + 20,
            bottom: canvasRefRect.bottom - 20
        };
    };

    const onResize = ({ target, width, height }) => {
        const limits = calculateLimits(width, height);

        frame.set({
            height: `${limits.height}px`,
            width: `${limits.width}px`
        });
        alignTargetToFrame(target);
    };

    const onRotate = ({ target, beforeDelta }) => {
        frame.set(
            "transform",
            "rotate",
            `${parseFloat(frame.get("transform", "rotate")) + beforeDelta}deg`
        );
        alignTargetToFrame(target);
    };

    return (
         <Moveable
            ref={moveRef}
            target={moveableResultBoxRef.current}
            draggable={true}
            resizable={resizable}
            rotatable={true}
            origin={false}
            onDrag={onDrag}
            onResize={onResize}
            onRotate={onRotate}
            snapCenter={true}
            //bounds={bounds}
            bounds={{bottom: 490,
                left: 28,
                right: 290,
                top: 28}}
            snapable={true}
            scalable={scalable}
         />
    );
};

const Canvas = styled.div`
  position: relative;
  width: 300px;
  height:500px;
  flex: 1;
  border:1px solid blue;
`;

const MoveableComponent = props => {
    const moveableResultBoxRef = useRef();
    const canvasRef = useRef();
    return (
        <Canvas ref={canvasRef}>
            <MoveableControlBox
                {...props}
                moveableResultBoxRef={moveableResultBoxRef}
                canvasRef={canvasRef}
            />
            <MoveableResultBox ref={moveableResultBoxRef} />
        </Canvas>
    );
};
export default MoveableComponent;
