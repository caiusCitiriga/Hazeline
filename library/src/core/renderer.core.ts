import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineElementsIds } from './enums/elements-ids.enum';

export class HazelineRenderer {

    public updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void {
        const topBox = document.getElementById(HazelineElementsIds.topBox) as HTMLDivElement;
        const leftBox = document.getElementById(HazelineElementsIds.leftBox) as HTMLDivElement;
        const rightBox = document.getElementById(HazelineElementsIds.rightBox) as HTMLDivElement;
        const bottomBox = document.getElementById(HazelineElementsIds.bottomBox) as HTMLDivElement;

        this.setElementsProperties({
            topBox: topBox,
            leftBox: leftBox,
            rightBox: rightBox,
            bottomBox: bottomBox
        }, dimensions);
    }

    public wrapElement(dimensions: HazelineWrappingElementsDimensions): void {
        const wrappingElements = this.createWrappingElements(dimensions);
        this.attachElementsToBody(wrappingElements);
    }

    private attachElementsToBody(elements: ElementsToAttachOnBody): void {
        const body = document.querySelector('body');

        (body as any).prepend(elements.topBox); // not fully supported. See browser tables
        (body as any).prepend(elements.leftBox); // not fully supported. See browser tables
        (body as any).prepend(elements.rightBox); // not fully supported. See browser tables
        (body as any).prepend(elements.bottomBox); // not fully supported. See browser tables
    }

    private createWrappingElements(dimensions: HazelineWrappingElementsDimensions): ElementsToAttachOnBody {
        const topBox = document.createElement('div');
        const leftBox = document.createElement('div');
        const rightBox = document.createElement('div');
        const bottomBox = document.createElement('div');

        const elements = this.setElementsProperties({
            topBox: topBox,
            leftBox: leftBox,
            rightBox: rightBox,
            bottomBox: bottomBox
        }, dimensions);

        return elements;
    }

    private setElementsProperties(elements: ElementsToAttachOnBody, dimensions: HazelineWrappingElementsDimensions): ElementsToAttachOnBody {
        elements.topBox.id = HazelineElementsIds.topBox;
        elements.leftBox.id = HazelineElementsIds.leftBox;
        elements.rightBox.id = HazelineElementsIds.rightBox;
        elements.bottomBox.id = HazelineElementsIds.bottomBox;

        elements.topBox.style.border = '1px solid red';
        elements.leftBox.style.border = '1px solid red';
        elements.rightBox.style.border = '1px solid red';
        elements.bottomBox.style.border = '1px solid red';

        elements.topBox.style.position = 'fixed';
        elements.leftBox.style.position = 'fixed';
        elements.rightBox.style.position = 'fixed';
        elements.bottomBox.style.position = 'fixed';

        elements.topBox.style.background = 'rgba(0,0,0,.8)';
        elements.leftBox.style.background = 'rgba(0,0,0,.8)';
        elements.rightBox.style.background = 'rgba(0,0,0,.8)';
        elements.bottomBox.style.background = 'rgba(0,0,0,.8)';

        elements.topBox.style.zIndex = '99999';
        elements.leftBox.style.zIndex = '99999';
        elements.rightBox.style.zIndex = '99999';
        elements.bottomBox.style.zIndex = '99999';

        elements.topBox.style.width = `${dimensions.topBox.width}px`;
        elements.topBox.style.height = `${dimensions.topBox.height}px`;
        elements.topBox.style.left = `${dimensions.topBox.offsetLeft}px`;

        elements.leftBox.style.width = `${dimensions.leftBox.width}px`;
        elements.leftBox.style.height = `${dimensions.leftBox.height}px`;

        elements.rightBox.style.width = `${dimensions.rightBox.width}px`;
        elements.rightBox.style.height = `${dimensions.rightBox.height}px`;
        elements.rightBox.style.left = `${dimensions.rightBox.offsetLeft}px`;

        elements.bottomBox.style.width = `${dimensions.bottomBox.width}px`;
        elements.bottomBox.style.height = `${dimensions.bottomBox.height}px`;
        elements.bottomBox.style.top = `${dimensions.bottomBox.offsetTop}px`;
        elements.bottomBox.style.left = `${dimensions.bottomBox.offsetLeft}px`;

        return elements;
    }

}

interface ElementsToAttachOnBody {
    topBox: HTMLDivElement;
    leftBox: HTMLDivElement;
    rightBox: HTMLDivElement;
    bottomBox: HTMLDivElement;
}