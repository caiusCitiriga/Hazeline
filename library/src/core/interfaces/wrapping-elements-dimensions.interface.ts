export interface HazelineWrappingElementsDimensions {

    element: {
        width: number;
        height: number;
        offsetTop: number;
        offsetLeft: number;
        offsetRight: number;
        offsetBottom: number;
    }

    leftBox: {
        width: number;
        height: number;
    };

    topBox: {
        width: number;
        height: number;
        offsetLeft: number;
    };

    bottomBox: {
        height: number;
        offsetTop: number;
        offsetLeft: number;
    };

    rightBox: {
        width: number;
        height: number;
        offsetLeft: number;
    }

}