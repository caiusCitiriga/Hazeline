# Hazeline
### A step by step tutorial library for the web, as you would expect it.

## Philosophy
*I want a simple, neat, yet powerful and fully customizable library, to guide my users through the application I've built.*

Introducing **Hazeline**, a framework-agnostic tool that any JS application can include to guide their users through a step by step tutorial.

### **Simple**
Hazeline comes pre-configured with a fresh and clean style. You won't need to create your styles, just specify a tutorial section, press Run and you're ready to go.
Each configuration method *speaks by itself* and the parameters are self explainatory. What it says it does.

### **Neat**
You care about two things, your sections and you sections steps. 


A **section** is a tutorial container, since your application could have many sections, your tutorial should too.
Each **section** contains multiple **section-steps** the actual **steps** that the user 
will see.
Each **section-step** is bound to an HTML element. That element will be the highlighted element that the user will see.

Optionally you could care about a third one, a default styling config, that will be applyied globally to each section.

### **Powerful**
**CSS selectors style**

You can target any combination of CSS selectors, and **Hazeline** will look for that element. If found, you business ends there, the rest is handled by **Hazeline**. 

**Interactions**

You can use the plain 'ol **next** and **previous** buttons, but you can also attach your custom event listeners that will trigger the next step, any valid JS event listener, including *keyEvents* are accepted.

### **100% Customizable**
Anything, and literally **ANYTHING** you see on screen is CSS customizable.

You can define a Global styling, or you can style each step individually.

Still not happy? I've got you covered, you can pass **CSS classes** too, and each step can take **RAW HTML** strings, so you can also define the template.


## Getting started
Add Hazeline to your project dependencies
```
npm i hazeline
```

Import Hazeline into your file, define the sections and the steps, and run it!
```typescript
import {Hazeline} from 'hazeline';
class HazelineDemo {

    private haze: Hazeline;

    //  Controls
    private startSimpleItemsDemoBtn: HTMLButtonElement;
    private startCustomEventsItemsDemoBtn: HTMLButtonElement;

    public constructor() {
        this.haze = new Hazeline();
        this.haze.addTutorialSection(
            {
                id: 'section-one',
                steps: [
                    {
                        selector: '#simpleItem01',
                        text: 'Step one description',
                    },
                    {
                        selector: '#simpleItem03',
                        text: 'Step three description',
                    },
                    {
                        selector: '#simpleItem04',
                        text: `Step four description`,
                    }
                ]
            });

        this.haze.startTutorialSection('section-one');
    }
}
```

## How it works
There are **six** pieces that works together while **Hazeline** is running:
+ The tutorial overlay
+ The InfoBox
+ The InfoBox content
+ The InfoBox next or end button
+ The tutorial close button
+ The timeout text when a step is waiting to begin

**The tutorial overlay:** this is a div that will be prepended on the body, before any element. It will act like a cloth that covers all your application, and reveals **only** the concerned element for the current step.

**The InfoBox:** this is the element that describes step that the user is seeing. This element can be positioned on any of the four sides of the element you're concerned with, and it will remain attached to it even if the window resizes, or the element changes it's position.

The InfoBox also contains three other elements, the tutorial close button, the previous and next/end buttons. I wanted to keep this as simple as possible, so there are no divs nesting or nasty stuff goin on. You have just one container (the InfoBox), and you can style it however you like. The same goes for its children.

*Note that the InfoBox will automatically center itself with the step element. Both horizontally or vertically.*

**The InfoBox content:** this is a paragraph element that will hold the content you've specified as description for the current step.

**The InfoBox tutorial close button:** from each step the user should be able to interrupt the tutorial, this is the element that if clicked triggers that. It's a simple div, styled to be round by default, with an 'X' character inside.

**The InfoBox step control buttons:** these buttons are the tutorial flow control buttons. The previous button, if present and clicked loads the previous step from the section. Similarly the next button loads the next one and the end button (if present) ends the tutorial. 

*Note that the end button is drawn only for the last step*

---
As you can see, **Hazeline** does not use Canvas, or SVG graphics. In fact, it doesn't use graphics at all. 

When each step is about to be executed:
+ It looks inside the DOM for the element with the selector that you specified for this step 
+ Backups all the CSS properties that it will override on the element
+ Changes it's *z-index* and some other properties for easing animations
+ It draws (or reuses the previously drawn) *InfoBox* 
+ It updates the *InfoBox* styles
+ It updates the *InfoBox* properties
+ It updates the *InfoBox* content with the content you've specified in the step configuration

**Hazeline** is capable of holding several tutorial sections. Each section contains multiple steps.

When a tutorial section is started, a `onStart` event fires, and when a tutorial section is about to end, a `onEnd` event is fired. You can specify callbacks for these events.

Similarly you can specify a `onNext` and `onStart` events for each section step. Along with a lot of other properties that you can customize for each step.

## Global Styling
You can decide to apply a global styling before running the tutorial, doing so, you won't have to define the same style, or apply the same classes on each step. But the step specific styling wins over the global one. 

This means that you can define a global style for all the steps, and for a particular step you can override the global style from within its configuration.

The methods that allows you to do this are exposed by the **Hazeline** instance:

+ `setGlobalInfoBoxCSSRules`
+ `setGlobalInfoBoxContentCSSRules`
+ `setGlobalTutorialOverlayCSSRules`
+ `setGlobalInfoBoxNextButtonCSSRules`
+ `setGlobalInfoBoxPreviousButtonCSSRules`

Each of these methods takes a single argument `styles` which is an object of `CSSRules`.

**`CSSRules`** is just an interface exposed by **Hazeline** that lists all the CSS stylable properties as object notation. 

If for example you want to style the *margin*, the *padding* and the *z-index* for an element you will set it like this:

```typescript
this.hazeline.setGlobalInfoBoxCSSRules({
    zIndex: '99',
    margin: '10px',
    padding: '20px',
});
```

*Note: for now you can only pass `CSSRules` for a global styling. But I'm planning to extend this, allowing you to pass CSS classes too.*

## Custom Triggers
Hazeline loads the next step in the section when the NEXT button is pressed. In the majority of scenarios, this is the desired behaviour, but what if you want to trigger the next step when the user clicks on the concerned element? Or presses a particular key?

To cover this, Hazeline provides you with *Custom Triggers* (for now, only the next step trigger is available). For each step, you can specify a custom next trigger.
Each trigger has two properties:
+ `event: string`
+ `action: (event: any) => boolean`

**Event:** a string, the actual event you want to listen for. Can be a simple *click*, a *keyup*, *keydown* or any valid events available for that element.

**Action:** a function, the action that will be fired when that event will be emitted. 

The action takes one argument, the *event* itself, and Hazeline will pass that argument to your function whenever it's called. Don't be confused by the names, the event we're talking about here is the actual *event* emitted by the element. 

Each action **MUST** return a boolean. This boolean is used by Hazeline to understand if is the case to load the next step or not.

## Section options
| Name          | Req | Type    | Description                                                    |
| ------------- |:---:|---------|----------------------------------------------------------------|
| id            |**X**|`string` |The id that Hazeline will use to find your section when you want to run it.|
| steps         |**X**|`SectionStep[]`|An array containing all the steps for this section. See [SectionStep](##section-step-options) for more information.|
| onStart       |     |`function`|The function you want to trigger when the tutorial section starts|
| onEnd         |     |`function`|The function you want to trigger when the tutorial section ends|

## Section step options
| Name             | Req | Type    | Description                                                    |
| ---------------- |:---:|---------|----------------------------------------------------------------|
| text             |**X**|`string` |The text that will be set inside the InfoBox content. This can be a simple string or HTML string.|
| selector         |**X**|`string` |The selector that Hazeline will use to find the element for this step. It can be any combination of CSS selectors. If the element cannot be found, Hazeline will throw an error.|
| beforeStartDelay |     |`number` |The amount of time Hazeline will wait before proceeding with the next step drawing. This timeout can be useful if you have to open a dialog in your application and takes a certain amount of time to show up. By default there's no delay.|
| infoBoxPlacement |     |`InfoBoxPlacement` or `string`|The placement of the InfoBox element, can be a string as simple as `'left'`, `'above'`, `'below'`, `'right'`. Or using the [InfoBoxPlacement](####InfoBoxPlacement) enum. By default is placed below the element.|
| nextBtnText      |     |`string` |The text that you want to appear on the next button. It can be a simple string or HTML string. By default is NEXT|
| prevBtnText      |     |`string` |The text that you want to appear on the previous button (if shown). It can be a simple string or HTML string. By default is PREVIOUS|
| endBtnText       |     |`string` |The text that you want to appear on the end button (if shown). It can be a simple string or HTML string. By default is END|
| pleaseWaitText   |     |`string` |The text that you want to appear when a `beforeStartDelay` is running. It can be a simple string or HTML string. By default is Please Wait|
| triggers         |     |`StepTriggers`|You can specify a custom trigger that Hazeline will register and listen for on the step element. See [Custom Triggers](##custom-triggers) for more information.|
| styles           |     |`StepStylableElements`|If you want to specify a specific styles on elements drawn for this section step, you can pass it here. See [StepStylableElements](####StepStylableElements) for more information.|
| classes          |     |`StepClassableElements`|If you want to apply specific classes to elements drawn for this section step you can do it here. See [StepStylableElements](####StepStylableElements) for more information. <br><br>*Note: step specific classes wins over step specific styles*|
| onNext           |     |`function`|The function you want to trigger when the next step is about to be loaded. |
| onStart          |     |`function`|The function you want to trigger when the step is about to start. |

## Events
#### Tutorial section events
Each tutorial section has two events:
* `onEnd: () => void`: Called when the tutorial section ends. Whether normally or closed by the user.
* `onStart: () => void` Called when the tutorial section starts.


#### Section Step events
Each section step has two events:
* `onNext: (element: HTMLElement, step: SectionStep) => SectionStep`: called when the tutorial is about. It passes to your callback the HTML element for the current step and the current step configuration itself. You always have to return back the step.
* `onStart: (element: HTMLElement, step: SectionStep) => SectionStep`: called when the section step is about to be drawn. It passes to your callback the HTML element for the current step and the current step configuration itself. You always have to return back the step.

## Interfaces

#### SectionStep
```typescript
export interface SectionStep {
    text: string;
    selector: string;
    triggers?: StepTriggers;
    beforeStartDelay?: number;
    infoBoxPlacement?: InfoBoxPlacement | string;

    endBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    pleaseWaitText?: string;

    styles?: StepStylableElements;
    classes?: StepClassableElements;

    onNext?: (element: HTMLElement, step: SectionStep) => SectionStep;
    onStart?: (element: HTMLElement, step: SectionStep) => SectionStep;
}
```
#### StepTriggers
```typescript
export interface StepTriggers {
    next: {
        event: string;
        action: (event: any) => boolean;
    }
}
```
#### TutorialStatus
```typescript
export interface TutorialStatus {
    runningSection: TutorialSection;
    tutorialStatus: TutorialStatuses;
}
```
#### TutorialSection
```typescript
export interface TutorialSection {
    id: string;
    steps: SectionStep[];

    onEnd?: () => void;
    onStart?: () => void;
}
```
#### StepStylableElements
```typescript
export interface StepStylableElements {
    infoBox?: CSSRules;
    pleaseWait?: CSSRules;
    infoBoxContent?: CSSRules;
    tutorialCloseBtn?: CSSRules;
    infoBoxPreviousBtn?: CSSRules;
    infoBoxNextOrEndBtn?: CSSRules;
}
```
#### StepClassableElements
```typescript
export interface StepClassableElements {
    infoBox?: string[];
    pleaseWait?: string[];
    infoBoxContent?: string[];
    tutorialCloseBtn?: string[];
    infoBoxPreviousBtn?: string[];
    infoBoxNextOrEndBtn?: string[];
}
```

## Enums
#### TutorialStatuses
```typescript
export enum TutorialStatuses {
    Started,
    Stopped
}
```
#### InfoBoxPlacement
```typescript
export enum InfoBoxPlacement {
    LEFT = 'left',
    ABOVE = 'above',
    BELOW = 'below',
    RIGHT = 'right',
}
```
#### NextStepPossibilities
```typescript
export enum NextStepPossibilities {
    FORWARD,
    BACKWARD,
    FINISHED,
    TUTORIAL_CLOSE
}
```

## Help Hazeline grow
If you like this project please help me with your feedback, leave a star :) Found a bug? Want a feature? Want some help? Feel free to open a [Issue on GitHub](https://github.com/caiuscitiriga/hazeline/issues).

## Versioning
We use [SemVer](http://semver.org/) for versioning. 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

## License
This project is licensed under the MIT License.