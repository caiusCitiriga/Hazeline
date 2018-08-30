import { HazelineCanvas } from 'hazeline';

window.onload = () => {
    const canvas = new HazelineCanvas();
    // canvas.setCanvasBGColor('rgba(58,79,255,.9)');
    canvas.setCanvasBGColor('rgba(0,0,0,.8)');

    const elements: HTMLElement[] = [];

    elements.push(document.getElementById('test-1') as HTMLDivElement);
    elements.push(document.getElementById('test-2') as HTMLDivElement);
    elements.push(document.getElementById('test-3') as HTMLDivElement);

    canvas.surroundElement(elements[0]);

    setTimeout(() => {
        canvas.surroundElement(elements[1]);
    }, 2000);

    setTimeout(() => {
        canvas.surroundElement(elements[2]);
    }, 4000);

    setTimeout(() => {
        canvas.destroy();
    }, 6000);
}