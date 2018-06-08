"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hazeline_1 = require("hazeline");
class HazelineDemo {
    constructor() {
        this.haze = new hazeline_1.Hazeline();
        this.collectControlsElementsInstances();
        this.attachListenersOnControls();
    }
    collectControlsElementsInstances() {
        this.startDemoBtn = document.getElementById('startDemoBtn');
        console.log(this.startDemoBtn);
    }
    attachListenersOnControls() {
    }
    runDemo() {
        this.haze.test();
    }
}
const demo = new HazelineDemo();
demo.runDemo();
//# sourceMappingURL=index.js.map