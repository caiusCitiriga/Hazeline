import { Hazeline } from 'hazeline';

class HazelineDemo {
    private haze: Hazeline;

    //  Controls
    private startDemoBtn: HTMLButtonElement;

    public constructor() {
        this.haze = new Hazeline();
        this.collectControlsElementsInstances();
        this.attachListenersOnControls();
    }

    private collectControlsElementsInstances(): void {
        this.startDemoBtn = document.getElementById('startDemoBtn') as HTMLButtonElement;
        console.log(this.startDemoBtn);
    }

    private attachListenersOnControls(): void {

    }

    public runDemo(): void {
        this.haze.test();
    }
}

const demo = new HazelineDemo();
demo.runDemo();