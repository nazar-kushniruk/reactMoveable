import React from "react";
import ReactDOM from "react-dom";
import Moveable from "react-moveable";
import { Frame } from "scenejs";
import "../styles.css";
import styled from "styled-components";

const MoveableContainer = styled(Moveable)`
position: relative;
margin: auto;
width: 500px;
height: 700px;
border: 3px solid grey;`;

const mo = new Moveable(document.body);
mo.bounds = { left: 0, right: 1000, top: 0, bottom: 1000};
console.log('MO->',mo);

export default class MovingComponent extends React.Component {
    constructor (props) {
        super(props);
        this.myRef = React.createRef();
        this.parentRef = React.createRef();
        this.getValues = this.getValues.bind(this);
    }
    frame = new Frame({
        width: "100px",
        height: "100px",
        left: "0px",
        top: "0px",
        transform: {
            rotate: "0deg",
            scaleX: 1,
            scaleY: 0.5,
            matrix3d: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]
        }
    });
    state = {
        target: null,
        container: null,
        scalable: false,
        resizable: true,
        warpable: false
    };
    defaultPositionSpec = {
        "x": 0.5,
        "y": 0.5,
        "width": 0.65,
        "height": 1,
        "rotation": 0};



    initPositionSpec = this.props.position_spec ?
        this.props.position_spec : this.defaultPositionSpec;
    getBoundaries = () =>{
        let bounds = {
            left: this.parentRef.current.getBoundingClientRect().left+100,
                right: this.parentRef.current.getBoundingClientRect().right-100,
                top: this.parentRef.current.getBoundingClientRect().top+100,
                bottom: this.parentRef.current.getBoundingClientRect().bottom-100
        };
        console.log('getBoundaries->', bounds);
        return bounds;
    }

    render () {
        const { scalable, warpable, resizable, target } = this.state;

        return (
            <div className='page main'>
                <button onClick={this.getValues}>Получить данные</button>
                <Moveable
                    ref={this.myRef}
                    target={document.querySelector(".moveable")}
                    pinchThreshold={20}
                    container={document.querySelector(".page .main")}
                    draggable={true}
                    scalable={scalable}
                    resizable={resizable}
                    warpable={warpable}
                    rotatable={true}
                    pinchable={true}
                    origin={false}
                    throttleDrag={1}
                    throttleRotate={0.2}
                    throttleResize={1}
                    throttleScale={0.01}
                    onDrag={this.onDrag}
                    onResize={this.onResize}
                    onScale={this.onScale}
                    onRotate={this.onRotate}
                    snappable={true}
                    snapThreshold={5}
                    snapCenter={true}
                    bounds={{ left:320 , top: 50, bottom: 550, right: 1060 }}
                    /*bounds={this.getBoundaries()}*/
                   /* verticalGuidelines={[100, 200, 300]}
                    horizontalGuidelines={[0, 100, 200]}*/

                />
                <div className='parent'>
                <div className='container' ref={this.parentRef}>
                    <div className='moveable' >
                    </div>
                </div>
                </div>

            </div>
        );
    }
    getValues () {
        console.log(this.frame.get("left"));
        console.log(this.frame.get("transform", "rotate"));
        console.log(this.frame.get("width"));
        console.log("top", this.frame.get("top"));
        console.log("left", this.frame.get("left"));
        console.log(this.frame);
    }

    componentDidMount () {

        console.log('componentDidMount PROPS -> ',this.props);
        console.log( ' componentDidMount parentRef -> ',this.parentRef.current);
        console.log('componentDidMount myRef -> ',this.myRef);
        console.log('componentDidMount   this.getBoundaries() -> ', this.getBoundaries());


        /*this.myRef.current.bounds = {
            left: this.parentRef.current.getBoundingClientRect().left,
            right: this.parentRef.current.getBoundingClientRect().right,
            top: this.parentRef.current.getBoundingClientRect().top,
            bottom: this.parentRef.current.getBoundingClientRect().bottom
        };*/

        this.setState({
            target: document.querySelector(".moveable")
        });
        window.addEventListener("resize", this.onWindowReisze);

        this.setDataToFrame(this.getInitDataToFrame());

        // const container = this.parentRef.current.getBoundingClientRect();
        //
        // const  initPositionSpec = this.props.position_spec ?
        //     this.props.position_spec : this.defaultPositionSpec;
        //
        // const width = initPositionSpec.width * container.width;
        // const height = initPositionSpec.width * container.width;
        // const top = (container.height * initPositionSpec.y) - parseInt(this.frame.get('height'))  * 0.5;
        // console.log('top -> ', (container.height * initPositionSpec.y) - (parseInt(this.frame.get('height')) * 0.5));
        //  this.frame.set({width: `${width}px`,
        //      top: `${top}px`});
        //this.frame.set("top", `${top}px`);

        // deg && this.frame.set("transform", "rotate", `${deg}deg`);
        // height && this.frame.set("height", `${height}px`);
        // width && this.frame.set("width", `${width}px`);
        // left && this.frame.set("left", `${left}px`);
        // left && this.frame.set("left", `${left}px`);
        // top && this.frame.set("top", `${top}px`);
        this.setTransform(document.querySelector(".moveable"));
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate',prevProps );
    }
    setDataToFrame = data =>  this.frame.set(data);

    toCssValue = (value, units) => `${value }${units}`;

    getInitDataToFrame = () => {
        console.log('this.frame1 - ', this.frame);
        const container = this.parentRef.current.getBoundingClientRect(),

            proportionCoef = 1,
            initPositionSpec = this.props.position_spec ?
                this.props.position_spec : this.defaultPositionSpec,
            width = initPositionSpec.width * container.width,
            height = initPositionSpec.width * container.width*proportionCoef,
            top = (container.height * initPositionSpec.y) - parseInt(this.frame.get('height')) * 0.5,
            rotate = initPositionSpec.rotation === 0 ? 0 : initPositionSpec.rotation * 360;
        //deg
        let left = 0;

        if (initPositionSpec.x === 0.5) {
            left = 0
        } else if (initPositionSpec.x > 0.5) {
            left = `${((container.width * initPositionSpec.x) - container.width / 2) - initPositionSpec.width * container.width}px`;
        } else {
            left = `${-((container.width - initPositionSpec.width * container.width) / 2 - (container.width * initPositionSpec.x))}px`;
        }


        // left = `${(container.width - initPositionSpec.width - container.width)/2 - (container.width * initPositionSpec.y)}px`;
        //left = `${initPositionSpec.y < 0.5 ?'-':'' }${(container.width - initPositionSpec.width * container.width)/2 - (container.width * initPositionSpec.y)}px`;
        // left = `${(container.width - initPositionSpec.width * container.width)/2 - (container.width * initPositionSpec.y)}px`;

        //left = `${(container.width - this.frame.get('width'))/2 - (container.width * initPositionSpec.y)}px`;
        //left = `${container.left + container.width * initPositionSpec.x}px`;

        console.log('top - ', this,  {
            width : this.toCssValue(width, 'px'),
            top: this.toCssValue(top, 'px'),
            transform: {rotate :this.toCssValue(top, 'deg')},
            left : this.toCssValue(left, 'px'),
            height: this.toCssValue(height, 'px'),
            bounds: this.getBoundaries()
        });

        return {  bounds: this.getBoundaries(),
            width : this.toCssValue(width, 'px'),
            top: this.toCssValue(top, 'px'),
            transform: {rotate :this.toCssValue(rotate, 'deg')},
            left : this.toCssValue(left, 'px'),
            height: this.toCssValue(height, 'px')
        };

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.onWindowReisze);
    }
    onWindowReisze = () => {
        this.moveable.updateRect();
    };

    setTransform (target) {
        target.style.cssText = this.frame.toCSS();
    }

    //  getPatentRef = (node) => {this.}




    isInside () {
        const parentEl = this.parentRef.current.getBoundingClientRect();
        const movableEl = this.myRef.current.props.target.getBoundingClientRect();
        const res = (
            ((parentEl.top <= movableEl.top) && (movableEl.top <= parentEl.bottom)) &&
            ((parentEl.top <= movableEl.bottom) && (movableEl.bottom <= parentEl.bottom)) &&
            ((parentEl.left <= movableEl.left) && (movableEl.left <= parentEl.right)) &&
            ((parentEl.left <= movableEl.right) && (movableEl.right<= parentEl.right))
        );
       /* if (!res) {
            console.log('--------');
            console.log('res', res);
            console.log('--------');
        }*/
       /* return {res,
            left: parentEl.left + 20,
            top:parentEl.top + 20
        };*/
       return res;
    }

    onDrag = ({ target, top, left}) => {

        const isInside = this.isInside();
      /*  console.log('onDrags->',this.myRef);
        console.log('onDrags target.bounds ->',target);*/

      /*  if(!isInside.res) {
            this.frame.set("left", `${left+2}px`);
            this.frame.set("top", `${top}px`);
            console.log(isInside);
            console.log('top, left', top, left);
        }else {
            console.log(' left === -30', left === -30 ? this.myRef.current.bounds.left : left);
            console.log(' left', left);
            this.frame.set("left", `${left === this.myRef.current.bounds.left ? this.myRef.current.bounds.left : left }px`);
            this.frame.set("top", `${top}px`);
        }*/

       /* const container = this.parentRef.current.getBoundingClientRect();
        const maxTop = - 300;

        const maxLeft = -(container.width - container.width*0.2 - parseInt(this.frame.get('width')))/2;
        const maxRight = (container.width - container.width*0.2 - parseInt(this.frame.get('width')))/2;
        let pos = 0;
        /!*console.log('onDrag maxLeft - ',maxLeft);
        console.log('onDrag maxLeft - ',maxRight);
        console.log('onDrag left - ',left);
        console.log('onDrag left - ',this.frame);*!/

        if( top >= maxTop) {
            // console.log('top - ',top);
            this.frame.set("top", `${top}px`);
        }else {
            // console.log('maxTop - ',maxTop);
            this.frame.set("top", `${maxTop}px`);
        }

        if(left < maxLeft ) {
            console.log('left < maxLeft - ',left);
            // this.frame.set("left", ` ${maxLeft}px`);
            pos = maxLeft;
        }else if(left > maxRight ) {
            console.log('left > maxRight - ',left);
            // this.frame.set("left", ` ${maxRight}px`);
            pos = maxRight;
        } else{
            pos = left;
            // this.frame.set("left", ` ${left}px`);
        }*/

       /* this.frame.set("left", ` ${pos}px`);
       // console.log('======= ', pos , maxLeft, b);

        this.setTransform(target);*/

        this.frame.set("left", `${left}px`);
        this.frame.set("top", `${top}px`);
        this.setTransform(target);
    };

    onScale = ({ target, delta }) => {
        console.log('onScale - ', target, delta);
        const scaleX = this.frame.get("transform", "scaleX") * delta[0];
        const scaleY = this.frame.get("transform", "scaleY") * delta[1];
        this.frame.set("transform", "scaleX", scaleX);
        this.frame.set("transform", "scaleY", scaleY);
        this.setTransform(target);
    };
    onRotate = ({ target, beforeDelta }) => {
        const isInside = this.isInside();
        console.log('onRotate isInside-> ',isInside);
        let deg = parseFloat(this.frame.get("transform", "rotate")) + beforeDelta;
       /* if(!isInside){
            if(deg > 90) {
                deg = 90;
            }else if(deg < -90 ){
                deg = -90;
            }
            console.log('onRotate ', target, beforeDelta );
            this.frame.set("transform", "rotate", `${deg}deg`);
            this.setTransform(target);
        }else return;*/

            if(deg > 90) {
                deg = 90;
            }else if(deg < -90 ){
                deg = -90;
            }
            console.log('onRotate ', target, beforeDelta );
            this.frame.set("transform", "rotate", `${deg}deg`);
            this.setTransform(target);


    };
    onResize = ({target, width, height, drag}) => {

        const container = this.parentRef.current.getBoundingClientRect(),
            proportionCoef = 1,
            maxWidth = container.width * 0.8,
            minWidth = container.width * 0.2,
            maxHeight = maxWidth*proportionCoef,
            minHeight = minWidth*proportionCoef;


        //console.log('onResize - init ', maxWidth, minWidth, maxHeight, minHeight);
        console.log('onResize - init ', width, height);
        console.log('onResize - init maxWidth, minWidth', maxWidth, minWidth);
        console.log('onResize - container', container);

        if (width < minWidth) {
            console.log('onR w < minW  - ', width );

            this.frame.set("width", `${minWidth}px`);
            this.frame.set("height", `${minWidth * proportionCoef}px`);
        } else if (width > maxWidth) {
            console.log('onR w > maxW  - ', width );
            this.frame.set("width", `${maxWidth}px`);
            this.frame.set("height", `${maxWidth* proportionCoef}px`);
        } else {
            console.log('onR w  - ', width );
            this.frame.set("width", `${width}px`);
            this.frame.set("height", `${width* proportionCoef}px`);
        }
        if (height < minHeight) {
            console.log('onR h < minH  - ', height );
            this.frame.set("height", `${minHeight}px`);
            this.frame.set("width", `${minHeight/proportionCoef}px`);
        } else if (height > maxHeight) {
            console.log('onR h > maxH - ', height );
            this.frame.set("height", `${maxHeight}px`);
            this.frame.set("width", `${maxHeight/proportionCoef}px`);
        } else {
            console.log('on WITHOUT IF - ', height );
            this.frame.set("height", `${height}px`);
            this.frame.set("width", `${height/proportionCoef}px`);
        }
        console.log('========');

        this.setTransform(target);
    };
}

