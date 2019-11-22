import styled from "styled-components";
import React, {useState, useEffect, useRef} from "react";
import Moveable from "react-moveable";
import {Frame} from "scenejs";

const getInitDataToMoveableComponent = (ref, position_spec) => {
    const container = ref.current.getBoundingClientRect(),
        proportionCoef = 1,
        initPositionSpec = position_spec
            ? position_spec
            : defaultPositionSpec;
    let width = initPositionSpec.width * container.width,
        height = initPositionSpec.width * container.width * proportionCoef,
        top = container.height * initPositionSpec.y - height * 0.5 + 100,
        rotate = initPositionSpec.rotation === 0 ? 0 : initPositionSpec.rotation * 360;
    //deg
    let left = 0;

    if (initPositionSpec.x === 0.5) {
        left = 0;
    } else if (initPositionSpec.x > 0.5) {
        left = `${container.width * initPositionSpec.x -
        container.width / 2 -
        initPositionSpec.width * container.width}px`;
    } else {
        left = `${-(
            (container.width - initPositionSpec.width * container.width) / 2 -
            container.width * initPositionSpec.x
        )}px`;
    }

    console.log('getInitDataToMoveableComponent-> ',{
        /* bounds: getBoundaries(),*/
        width: width,
        top: top,
        left: left,
        height: height
    });
return 1;
    /*return {
        /!* bounds: getBoundaries(),*!/
        width: width,
        top: top,
        left: left,
        height: height
    };*/
};
const defaultPositionSpec = {
    x: 0.5,
    y: 0.1,
    width: 0.2,
    height: 1,
    rotation: 0
};

const Container = styled.div`
 /* position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
  min-height: 700px;*/
`;

const Parent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 318px;
  height: 565px;
  border: 3px solid grey;
  margin: auto;
  border-radius: 10px;
  border: 2px solid grey;
`;

const MoveableCont = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  text-align: center;
  font-size: 40px;
  margin: 0px auto;
  font-weight: 100;
  letter-spacing: 1px;
  top:100px
`;
const ContMove = styled.div`
 width: 318px;
  height: 565px;
`;

const RotatableResizableComp = ({parentRef,...props}) => {
    console.log('RotatableResizableComp props', props);

    /*const [scalable, setScalable] = useState(false);
    const [resizable, setResizable] = useState(true);
    const [warpable, setWarpable] = useState(true);*/
    const moveRef = useRef();
    const [container, setContainer] = useState(null);
    const [target, setTarget] = useState(null),
       /* myRef = React.createRef(),*/
        initPositionSpec = props.position_spec
            ? props.position_spec
            : defaultPositionSpec;
    const toCssValue = (value, units) => `${value}${units}`;
    const getInitDataToFrame = () => {
        const container = parentRef.current.getBoundingClientRect(),
            proportionCoef = 1,
            initPositionSpec = props.position_spec
                ? props.position_spec
                : defaultPositionSpec;
        let width = initPositionSpec.width * container.width,
            height = initPositionSpec.width * container.width * proportionCoef,
            top = container.height * initPositionSpec.y - height * 0.5 + 100,
            rotate = initPositionSpec.rotation === 0 ? 0 : initPositionSpec.rotation * 360;
        //deg
        let left = 0;

        if (initPositionSpec.x === 0.5) {
            left = 0;
        } else if (initPositionSpec.x > 0.5) {
            left = `${container.width * initPositionSpec.x -
            container.width / 2 -
            initPositionSpec.width * container.width}px`;
        } else {
            left = `${-(
                (container.width - initPositionSpec.width * container.width) / 2 -
                container.width * initPositionSpec.x
            )}px`;
        }

        /*console.log("top - ", this, {
          width: toCssValue(width, "px"),
          top: toCssValue(top, "px"),
          transform: { rotate: toCssValue(top, "deg") },
          left: toCssValue(left, "px"),
          height: toCssValue(height, "px")
          //  bounds: getBoundaries()
        });*/

        return {
            /* bounds: getBoundaries(),*/
            width: toCssValue(width, "px"),
            top: toCssValue(top, "px"),
            transform: {rotate: toCssValue(rotate, "deg")},
            left: toCssValue(left, "px"),
            height: toCssValue(height, "px")
        };
    };

    const frame = new Frame(

        /*{
        width: "100px",
        height: "100px",
        left: "0px",
        top: "100px",
        transform: {
            rotate: "0deg",
            scaleX: 1,
            scaleY: 0.5,
            matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        }
    }*/);
    frame.set( getInitDataToFrame());
    const setDataToFrame = data => frame.set(data);

    const setTransform = target => target.style.cssText = frame.toCSS();

    useEffect(() => {
        setDataToFrame(getInitDataToFrame());
        setTarget(document.querySelector(".moveable"));
        setTransform(document.querySelector(".moveable"));
        console.log('moveRef isInside', moveRef.current.isInside);
        console.log('moveRef getRect', moveRef.current.getRect());
    }, []);


     //const getMoveable =
    const onDrag = ({target, top, left}) => {
        frame.set("left", `${left}px`);
        frame.set("top", `${top}px`);
        setTransform(target);
    };

    const onDragStart = ({ target }) => console.log('onDragStart- >',  target );
    const onDragEnd = () => console.log('onDragEnd- >');
    const onResize = ({target, width, height}) => {
        const move = new Moveable();
        console.log('target- >', target, move);
        const container = parentRef.current.getBoundingClientRect(),
            proportionCoef = 1,
            maxWidth = container.width * 0.8,
            minWidth = container.width * 0.2,
            maxHeight = maxWidth*proportionCoef,
            minHeight = minWidth*proportionCoef;

        if (width < minWidth) {
            console.log('onR w < minW  - ', width );

            frame.set("width", `${minWidth}px`);
            frame.set("height", `${minWidth * proportionCoef}px`);
        } else if (width > maxWidth) {
            console.log('onR w > maxW  - ', width );
            frame.set("width", `${maxWidth}px`);
            frame.set("height", `${maxWidth* proportionCoef}px`);
        } else {
            console.log('onR w  - ', width );
            frame.set("width", `${width}px`);
            frame.set("height", `${width* proportionCoef}px`);
        }
        if (height < minHeight) {
            console.log('onR h < minH  - ', height );
            frame.set("height", `${minHeight}px`);
            frame.set("width", `${minHeight/proportionCoef}px`);
        } else if (height > maxHeight) {
            console.log('onR h > maxH - ', height );
            frame.set("height", `${maxHeight}px`);
            frame.set("width", `${maxHeight/proportionCoef}px`);
        } else {
            console.log('on WITHOUT IF - ', height );
            frame.set("height", `${height}px`);
            frame.set("width", `${height/proportionCoef}px`);
        }
        setTransform(target);
      
    };
    const onScale = ({target, top, left}) => {
        console.log("onScale");
    };
    const onRotate = ({target, beforeDelta}) => {
        let deg = parseFloat(frame.get("transform", "rotate")) + beforeDelta;
        if(deg > 90) {
            deg = 90;
        }else if(deg < -90 ){
            deg = -90;
        }
        frame.set("transform", "rotate", `${deg}deg`);
        setTransform(target);
        console.log("onRotate");
    };
    console.log('props.bounds-> ', props.bounds);
    const Move =  <Moveable
         ref={moveRef}
        target={document.querySelector(".moveable")}
        pinchThreshold={20}
        draggable={true}
        /* scalable={scalable}
         resizable={resizable}
         warpable={warpable}*/
        scalable={false}
        resizable={true}
        warpable={true}
        rotatable={true}
        pinchable={true}
        origin={false}
        throttleDrag={1}
        throttleRotate={0.2}
        throttleResize={1}
        throttleScale={0.01}
        onDrag={onDrag}
        onResize={onResize}
        onScale={onScale}
        onRotate={onRotate}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
       /* snappable={true}*/
        snapThreshold={50}
        snapCenter={true}
        bounds={props.bounds}
    />;
    console.log('!!!Move !!', Move.RectInfo);
    return Move;
};

export default props => {
    const moveContRef = useRef();
    const parentRef = useRef();

    const [bounds, setBounds] = useState();
    const [position, setPosition] = useState();
    console.log('moveContRef',moveContRef);
    console.log('parentRef',parentRef);
    useEffect(() => {
        console.log('setBounds -> ', {
            left: moveContRef.current.getBoundingClientRect().left+ 100,
                right: moveContRef.current.getBoundingClientRect().right,
                top: moveContRef.current.getBoundingClientRect().top ,
                bottom: moveContRef.current.getBoundingClientRect().bottom
        });

        setBounds({
            left: moveContRef.current.getBoundingClientRect().left + 20 ,
            right: moveContRef.current.getBoundingClientRect().right - 20,
            top: moveContRef.current.getBoundingClientRect().top +20,
            bottom: moveContRef.current.getBoundingClientRect().bottom - 20
        });
    }, []);

    useEffect(() => {
        setPosition(getInitDataToMoveableComponent(moveContRef));
    },[]);

    return (
        <Container>
            {bounds && <RotatableResizableComp
                position_spec={defaultPositionSpec}
                bounds={bounds}  parentRef={moveContRef} />}
            <Parent className="parent-container" >
                <ContMove className="container" ref={moveContRef}>
                    {position && <MoveableCont position className="moveable"/>}
                    {/* <MoveableCont position className="moveable"/>*/}
                </ContMove>
            </Parent>
        </Container>
    );
};