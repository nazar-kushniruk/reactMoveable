import React from "react";
import ReactDOM from "react-dom";
import MovingComponent from './components/movingComponent';
import RotatableResizableComp from './components/RotatableResizableComp';
import MoveableComponent from "./components/MoveableComponent";


const App = () => {
    const rotationHandlerHeight = 50;
    const initData = {
        maxWidth: 300,
        maxHeight: 300,
        minWidth: 100,
        minHeight: 100,
        frameWidth: 150,
        frameHeight: 100,
        frameLeft: 5,
        frameTop: rotationHandlerHeight,
        positionUnit: "px",
        frameAngle: 0,
        resizable: true,
        snapable: true,
        rotatable:true,
        pinchable:true,
        liveDrag: function (css) {
            console.log("css", css);
        }
    };

    /* position_spec = {
         "x": 0.7,
         "y": 0.23,
         "width": 0.44,
         "height": 1,
         "rotation":  0}*/


    const position_spec =  {"x":0.21, "y":0.5,"width":0.3,"height":1,"rotation":0}
    //const position_spec = {"x": 0.5, "y": 0.5, "width": 0.5, "height": 1, "rotation": 0}

    /* initialData = {
         width: 300,
         height: 100,
         deg: 0,
         left: -50,
         top: 350

     }*/


    return (
        /* <RotatableResizableComp position_spec={this.position_spec}/>*/
        <MovingComponent position_spec={position_spec}/>
        //<MoveableComponent {...initData}/>
    );


}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
