import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';

export class HazelineRenderer {

    public wrapElement(wrappingElementsDimensions: HazelineWrappingElementsDimensions): void {
        const wrappingElements = this.createWrappingElements(wrappingElementsDimensions);
        this.attachElementsToBody(wrappingElements);
    }

    private attachElementsToBody(elements: ElementsToAttachOnBody): void {
        const body = document.querySelector('body');

        body.appendChild(elements.topBox);
        body.appendChild(elements.leftBox);
        body.appendChild(elements.rightBox);
        body.appendChild(elements.bottomBox);
    }

    private createWrappingElements(wrappingElementsDimensions: HazelineWrappingElementsDimensions): ElementsToAttachOnBody {
        const topBox = document.createElement('div');
        const leftBox = document.createElement('div');
        const rightBox = document.createElement('div');
        const bottomBox = document.createElement('div');

        topBox.style.border = '1px solid red';
        leftBox.style.border = '1px solid red';
        rightBox.style.border = '1px solid red';
        bottomBox.style.border = '1px solid red';

        topBox.style.position = 'fixed';
        leftBox.style.position = 'fixed';
        rightBox.style.position = 'fixed';
        bottomBox.style.position = 'fixed';

        topBox.style.width = `${wrappingElementsDimensions.topBox.width}px`;
        topBox.style.height = `${wrappingElementsDimensions.topBox.height}px`;
        topBox.style.left = `${wrappingElementsDimensions.topBox.offsetLeft}px`;

        leftBox.style.width = `${wrappingElementsDimensions.leftBox.width}px`;
        leftBox.style.height = `${wrappingElementsDimensions.leftBox.height}px`;

        rightBox.style.width = `${wrappingElementsDimensions.rightBox.width}px`;
        rightBox.style.height = `${wrappingElementsDimensions.rightBox.height}px`;
        rightBox.style.left = `${wrappingElementsDimensions.rightBox.offsetLeft}px`;

        bottomBox.style.height = `${wrappingElementsDimensions.bottomBox.height}px`;
        bottomBox.style.top = `${wrappingElementsDimensions.bottomBox.offsetTop}px`;
        bottomBox.style.left = `${wrappingElementsDimensions.bottomBox.offsetLeft}px`;

        return {
            topBox: topBox,
            leftBox: leftBox,
            rightBox: rightBox,
            bottomBox: bottomBox
        };
    }

}

interface ElementsToAttachOnBody {
    topBox: HTMLDivElement;
    leftBox: HTMLDivElement;
    rightBox: HTMLDivElement;
    bottomBox: HTMLDivElement;
}