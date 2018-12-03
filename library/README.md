![Hazeline, the definitive tutorial library.](https://github.com/caiusCitiriga/Hazeline/raw/dev/docs/hazeline_title.png)

<p align="center">
A simple, fully customizable, <b>framework agnostic</b> tutorial library for <b>any</b> web application.</p>
<p align="center">
Made with :heart: in <b style="color: #1b7ecd">TypeScript</b>, and works like a charm with vanilla <b style="color: #ffc107">JavaScript</b>.
</p>
<p align="center">
Oh yeah! Before you ask: <br>
It works great with <b style="color: #f44336">Angular</b>!
</p>
<br>

[![License: MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/caiusCitiriga/nrg-cli/feature/templates/LICENSE)

![Hazeline GIF demo](https://github.com/caiusCitiriga/Hazeline/raw/dev/docs/hazeline-demo.gif)

## Install
```
npm install --save hazeline
```

## Usage

Hazeline is extremely configurable, but is also designed to work out of the box, providing its own graphical style.

If you don't want to customize any option and just run it, these are the only lines you need:
```typescript

import {Hazeline} from 'hazeline';

const haze = new Hazeline();
haze.addSection({
    id: 'test',
    steps: [
        {
            elementSelector: '#input-1',
            text: 'This is an awesome input box'
        },
        {
            elementSelector: '#input-2',
            text: 'This is another awesome input box'
        }
    ]
});

haze.runTutorial('test');
```

The above code, will create a tutorial section that contains two steps. 

Since your application could have multiple sections, your tutorial should too. A section, for Hazeline is a "container" of steps. These steps will be used to guide the user through the application once the tutorial is ran.

The only property required for the section beside the steps, is the **`id`**. Is a simple string property, and you can name it whatever you want. You will use this **`id`** later to start that section.

Next, we define the **`steps`**. Each step requires a  **`elementSelector`** and a **`text`** properties.

The **`elementSelector`** property is a jQuery style selector for any element that exists on the page. Although we are using a jQuery style selector, Hazeline does not depend on jQuery.

The **`text`** propery is the actual text that will be rendered inside the lightbox that will be attached to the highlighted element. The text property can also be raw **HTML** since it is passed to the **`innerHTML`** property of the lightbox element.

Finally we call `hazeline.runTutorial('test');`. As you can see, we use the previously defined section id to start that section when starting the tutorial. That's it.

## Customization
Hazeline provides two types of customization:

One designed to be set once, and never think about it again. This, in Hazeline is called **`globalOptions`**, and can be defined at a **`section`** level. These options you will pass, will override the default options, and will be used for all the steps.

One designed to be more dynamic, it uses the same exact structure as the global one, but can be set at a **`step`** level, and is called **`dynamicOptions`**. These options will work **only** for that step.

With the combination of these two kind of customizations, you can define default options for the  whole section, and in case you need more specificity or something different for a particular step, you can set it.

For more detailed information on how deep you can go with the customization see [customization details.](#Hazeline-customizable-properties-details)

#### Example of global customization
```typescript
haze.addSection({
    id: 'test',
    steps: [
        {
            elementSelector: '#input-1',
            text: 'This is an awesome input box'
        },
        {
            elementSelector: '#input-2',
            text: 'This is another awesome input box'
        }
    ],
    globalOptions: {
        overlay: {
            closeBtnText: 'Quit',
            overlayCSS: {
                background: 'rgba(255, 255, 255, .85)'
            }
        },
        lightbox: {
            nextBtnText: '>',
            prevBtnText: '<',
            lightboxNextBtnCSS: {
                border: 'none'
            },
            lightboxPrevBtnCSS: {
                border: 'none'
            },
            lightboxWrapperCSS: {
                boxShadow: '0px 3px 12px -5px #333'
            }
        }
    }
});
```

#### Example of dynamic customization
The same logic applies for the steps, same options available:
```ts
haze.addSection({
    id: 'test',
    steps: [
        {
            elementSelector: '#input-1',
            text: 'This is an awesome input box',
            dynamicOptions: {
                overlay: {
                    closeBtnText: 'Quit',
                    overlayCSS: {
                        background: 'rgba(255, 255, 255, .85)'
                    }
                },
                lightbox: {
                    nextBtnText: '>',
                    prevBtnText: '<',
                    lightboxNextBtnCSS: {
                        border: 'none'
                    },
                    lightboxPrevBtnCSS: {
                        border: 'none'
                    },
                    lightboxWrapperCSS: {
                        boxShadow: '0px 3px 12px -5px #333'
                    }
                }
            }
        },
    ],
});
```

As you can see I just moved the options from the global place to the dynamic place on the first step. The result is the same as above, since we have only one step.

## Textual Overlay Mode

By default Hazeline uses a lightbox to describe an element that is highlighted. This means that the concerned element has some meaning to the user, or you just want to describe it and introduce its functions.

But what if you don't have a specific element to highlight or describe? Let's say that you just want to give a brief description about the whole section, or greet the user with a message, and then start the actual tutorial. But a lightbox and a hightlighted element in that scenario wouldn't be the best choice.

Instead, you could use the **Textual Overlay**. When defining the step required options (text, and elementSelector) you can optionally activate the `useOverlayInsteadOfLightbox` property. For this step, the lightbox won't appear, and no particular element will be highlighted, even though you've specified the element selector. 

As the lightbox, and all the other Hazeline's components, even this one is designed to work out of the box, but still you can customize it like the others. For more detailed information about the Textual Overlay see its specific [configuration](#Textual-overlay) 

## Delaying the start of a specific step

It might happen that you have something asyncronus running that must be completed before the next step can begin. This might be a navigation to another page, on wich the element that the step about to start uses is present. 

In these kind of situations the section step offers another type of configuration called `delayBeforeStart`. It is a number, and can set the milliseconds to wait before the step actually begin.

**<span style="color: #ff7a00">Note:</span>** When you use the `delayBeforeStart` there are a few things to keep in mind:

**1)** The majority of the CSS customization is done internally and based on your global or dynamic configuration for the normal overlay

**2)** When activating the `delayBeforeStart` you **must** specify the `delayText`, which will be the text that will appear in the middle of the overlay. This text can be a simple 'Please wait...'. It also accepts HTML. Note that if you don't specify this information, the overlay will result empty and the tutorial might look like stuck to the user.

**3)** Lastly, when activating the `delayBeforeStart`, you also **must** provide a text color for the overlay text. Since the normal overlay that wraps around the highlighted element doesn't contain any text, there's nothig that ensures that the property isn't `undefined`.

## Offsetting the highlighted element wrapping

Hazeline by default applies a `10px` offset around the element that it wraps. And it offsets the vertical alignment of the lightbox by `-10px` too. 
If you'd like to change this behaviour, you can override these offsets. On the `globalOptions.overlay` as well as the `dynamicOptions.overlay` you will find these properties:

+ `topSideWrapOffset`
+ `leftSideWrapOffset`
+ `rightSideWrapOffset`
+ `bottomSideWrapOffset`

They respectively apply offsets on the top, left, right and bottom wrappers. You can valorize them all, or just the ones you need to. 

**<span style="color: #ff7a00">Note:</span>** that when changing the lightbox placement, you will also have to modify its `offset`. Since Hazeline by default places the lightbox under the element and uses by defauly `-10px` of offset, if you don't change that value in `10px` or accordingly with your wrappers offsets, the lightbox may overlap by `10px` your hightlighted element when positioned on top of it.

#### No offsets example
![Hazeline input box wrapped with no offset](https://github.com/caiusCitiriga/Hazeline/raw/dev/docs/no_offset.png)

#### Default offset example (`10px`)
![Hazeline input box wrapped with default offset](https://github.com/caiusCitiriga/Hazeline/raw/dev/docs/default_offset.png)

#### Custom offset example (`20px`)
![Hazeline input box wrapped with custom offset](https://github.com/caiusCitiriga/Hazeline/raw/dev/docs/custom_offset.png)

## Hazeline callbacks to events

Hazeline allows you to specify two different callbacks for two types of events. This logic applies both to the sections and to the steps:

+ `onBeforeEnd`
+ `onBeforeStart`

<br>

**`onBeforeStart`**

This callback will be executed right before the startup of the tutorial in case it's set at a **Section** level. If it's specified at a **Step** level, it will be executed right before the step startup.

This callback will be converted into an `Observable`, and from it will start the pipeline of events inside Hazeline. If you don't specify a `onBeforeStart` a `Promise` that resolves immediatly will be used.

**<span style="color: #ff7a00">Note:</span>** this is the first step of the pipeline, and if something asyncronus will be executed inside, the tutorial or the step **won't start** until the promise resolves, try to not clutter this too much as it may result is bad user experience.<br><br>

**`onBeforeEnd`**

This callback will be executed right before the tutorial definitive shutdown, or before the next step loading.

This callback will be converted into an `Observable`, and it will be called right before the last event in the pipeline, the definitive shutdown of the tutorial in case it's placed at a **Section** level, or the loading of the next step in case it's placed at a **Step** level. If you don't specify a `onBeforeEnd` a `Promise` that resolves immediatly will be used.

**<span style="color: #ff7a00">Note:</span>** this is the step before the last one in the pipeline, both for the **Sections** and the **Steps** pipelines, and if something asyncronus will be executed inside, the tutorial **won't quit** or the next step **won't load** until the promise resolves, but the quit button will be removed. Try to not clutter this too much as it may result is bad user experience.

**<span style="color: #ff7a00">Also remember to always resolve your promises.</span>**

## Attaching custom event listeners for next step triggering

By default, Hazeline, has three ways of triggering the next step call. One made through the lightbox next button, one when in textual overlay mode, by clicking anywhere around the overlay. The last one, always when in textual overlay mode, by clicking on the overlay's next button (if present).

But what if you'd like to trigger the next step when a certain event occours on the element highlighted? 

You can use the `nextStepCustomTrigger` property, present on the **Step** options. When you enable this feature, **two** more properties are **required**, and optionally a third one can be specified:<br>

#### `event`: 
The event you want to listen for. It can be any valid JS events, like: `click`, `blur`, `dbclick`, `mouseenter`, `mouseleave`, `keyup` etc

#### `callback`: 
The actual callback that will be ran when that event occurs. This callback is a function that returns a `Promise`. If the promise is resolved, the next step will be triggered, if the promise rejects or does not resolve, nothing will happen.

When the callback is executed, three arguments will be passed to it: 

+ `evt`: the actual `Event` fired (in case of `keyup` is useful to know which key was pressed)
+ `step`: the object of the current step in the tutorial. `HazelineTutorialStep`
+ `el`: the HTML object of the element that is currently being highlighted

#### `disableDefaultNextPrevBtns`: 
The third, optional property. If set to `true` it will remove the Next and Previous buttons from the lightbox for this step.

**<span style="color: #ff7a00">Note:</span>** always remember to resolve your promises at some point. If you don't resolve the promise, the next event **won't** be triggered.

#### Implementation example of `nextStepCustomTrigger`:
```ts
{
    elementSelector: '#inputZip',
    text: 'Third',
    nextStepCustomTrigger: {
        event: 'keyup',
        disableDefaultNextPrevBtns: true,
        callback: (evt: Event, step: HazelineTutorialStep, el: HTMLElement) => new Promise((res, rej) => {
            //  If the key pressed is ENTER
            if ((evt as KeyboardEvent).keyCode === 13) {
                res();
                return;
            }

            rej();
        })
    }
},
```

## Hazeline section step specific properties
---

These are the `HazelineTutorialStep` specific properties:

Property name | Description | Accepted values
--------------|-------------|-----------------
`text`| The text for this specific step. It will appear in the lightbox or textual wrapper | `string`
`delayBeforeStart` | If set it will delay the rendering of the step according to the milliseconds set. | `number`
`delayText`| If `delayBeforeStart` is set, this is **required**. It will be the text that will be shown to the user while waiting for the delay to end. | `string`
`delayTextColor`| The color for the `delayText`. | `string`
`dynamicOptions`| Dynamic options for this step. Will override the global options for this step. | `HazelineOptions`
`useOverlayInsteadOfLightbox`| If set to `true` no lightbox will be used for this step, and no element will be highligted. Instead an overlay will appear and it will contain the text of the lightbox.|`boolean`
`onBeforeEnd`| A function that returns a `Promise`. When the promise resolves the next step will be loaded.|`() => Promise<boolean>`
`onBeforeStart`| A function that returns a `Promise`. When the promise resolves the step starts.|`() => Promise<boolean>`

## Hazeline section/step dynamic properties
---
### Overlay

The `overlay` option, allows you to customize the overlay that surrounds the highlighted element. <br>

Property name | Description | Accepted values
--------------|-------------|-----------------
`closeBtnText`  | The text inside the button to end the tutorial | `string`
`overlayCSS` | The CSS for the overlay | `HazelineCSSRules`
`endTutorialBtnCSS` | The CSS for the end tutorial btn | `HazelineCSSRules`
`endTutorialBtnHoverCSS` | The CSS for the end tutorial btn when in hover mode| `HazelineCSSRules`
`topSideWrapOffset` | The amount of the top offset to apply on the wrapper that wraps the element | `number`
`leftSideWrapOffset` | The amount of the left offset to apply on the wrapper that wraps the element | `number`
`rightSideWrapOffset` | The amount of the right offset to apply on the wrapper that wraps the element | `number`
`bottomSideWrapOffset` | The amount of the bottom offset to apply on the wrapper that wraps the element | `number`<br>

### Lightbox

The `lightbox` option, allows you to customize the box that is placed near the highlighted element, containing the Next and Previous buttons and the text for the section step.<br>

General Properties:<br>

Property name | Description | Accepted values
--------------|-------------|-----------------
`nextBtnText` | The text for the next button | `string`
`prevBtnText` | The text for the previous button | `string`
`lastStepNextBtnText` | When reaching the last step, you can specify a different text for the next button. | `string`
`lightboxWrapperCSS` | The CSS for the main lightbox wrapper | `HazelineCSSRules`
`lightboxNextBtnCSS` | The CSS for the next btn | `HazelineCSSRules`
`lightboxPrevBtnCSS` | The CSS for the previous btn | `HazelineCSSRules`
`lightboxTextWrapperCSS` | The CSS for the text wrapper. The wrapper that contains the text for the step | `HazelineCSSRules`
`lightboxControlsWrapperCSS` | The CSS for the buttons wrapper. The wrapper that contains the next and previous buttons | `HazelineCSSRules`
`lightboxPrevBtnHoverCSS` | The CSS for the previous button when in hover mode | `HazelineCSSRules`
`lightboxNextBtnHoverCSS` | The CSS for the next button when in hover mode | `HazelineCSSRules`
<br>

Positioning Properties:<br>

Property name | Description | Accepted values
--------------|-------------|-----------------
`positioning.offset` | The offset for the lightbox from the highlighted element. For more information, see [Tether offset](http://tether.io/#offset)  | `string`
`positioning.attachment` | The attachment point for the lightbox. For more information, see [Tether attachment](http://tether.io/#attachment)  | `string`
`positioning.targetOffset` | For more information, see [Tether offset](http://tether.io/#offset)  | `string`
`positioning.targetAttachment` | The attachment point for the highlighted element. For more information, see [Tether attachment](http://tether.io/#attachment)  | `string`
`positioning.constraints` | The constraints for the lightbox and the highlighted element. For more information, see [Tether constraints](http://tether.io/#constraints)  | `string`
`positioning.classes` | Additional classes you'd like to add. For more information, see [Tether classes](http://tether.io/#classes)  | `string`<br>

### Textual Overlay

The textual overlay is the overlay that appears instead of the lightbox when you set `useOverlayInsteadOfLightbox` on the section step.<br>

Property name | Description | Accepted values
--------------|-------------|-----------------
`hideButtons` | Wheter to show or not the next/previous buttons.<br>**Note**: if you hide the buttons, the `clickAnywhereForNextStep` is automatically activated, and there will be no way to go back to the previous step from there | `boolean` 
`disableBgFadeIn` | By default, the bg of the textual overlay fades in and out when appearing and disappearing. You can disable this behaviour | `boolean`
`disableTextFadeIn` | By default, the text of the textual overlay paragraph fades in and out when appearing and disappearing. You can disable this behaviour | `boolean`
`clickAnywhereForNextStep` | You can enable the next step triggering by clicking anywhere on the textual overlay | `boolean`
`bgFadeInTimeInMs` | The time that the fade transition will take to complete on the overlay.<br>**Note**: the `ease-in-out` method is used for easing | `number`
`textFadeInTimeInMs` | The time that the fade transition will take to complete on the paragraph.<br>**Note**: the `ease-in-out` method is used for easing | `number`
`overlayBgFadeInOpacity` | The final opacity to set on the overlay. | `number`
`overlayParagraphFadeInOpacity` | The final opacity to set on the paragraph. | `number`
`overlayCSS` | The CSS for the textual overlay | `HazelineCSSRules`
`paragraphCSS` | The CSS for the textual overlay paragraph | `HazelineCSSRules`
`prevNextButtonsCSS` | Common styling for the previous and next buttons of the textual overlay | `HazelineCSSRules`
`prevNextButtonsHoverCSS` | Common styling for the previous and next buttons of the textual overlay when in hover mode| `HazelineCSSRules`<br>

## Hazeline methods
**`addSection`**
---

Adds a section to the sections available. Optionally can clear the previous sections when adding a new one.

### Arguments:
Argument #01  | section
------------- | -------------
**Required**  | yes
**Type**  | HazelineTutorialSection

<br>

Argument #02      | clearPreviousSections
----------------- | -------------
**Required**      | no
**Default value** | false
**Type**  | boolean

**Returns:** `void`

**`clearSections`**
---

Clears all the tutorial sections

**Takes no arguments**

**Returns:** `void`

**`runTutorial`**
---

Runs a specific tutorial section, given the section id. It returns an Observable containing the Tutorial Status.

### Arguments:
Argument #01  | sectionId
------------- | -------------
**Required**  | yes
**Type**      | string


**Returns**: `Observable<HazelineTutorialStatus>`

## Hazeline interfaces and enums

### **`HazelineTutorialStatus`**

**Type:** Interface
```ts
interface HazelineTutorialStatus {
    status: HazelineTutorialStatuses;
    runningSection: HazelineTutorialSection;
    runningStepInSection: HazelineTutorialStep;
}
```

### **`HazelineTutorialStatuses`**

**Type:** Enum
```ts
enum HazelineTutorialStatuses {
    started,
    stopped,
    errored
}
```

### **`HazelineTutorialSection`**

**Type:** Interface
```ts
interface HazelineTutorialSection {
    id: string;
    steps: HazelineTutorialStep[];

    globalOptions?: HazelineOptions;

    onBeforeEnd?: () => Promise<boolean>;
    onBeforeStart?: () => Promise<boolean>;
}
```

### **`HazelineOptions`**

**Type:** Interface
```ts
interface HazelineOptions {
    overlay?: HazelineOverlayOptions;
    lightbox?: HazelineLightboxOptions;
    textualOverlay?: HazelineTextualOverlayOptions;
}
```

### **`HazelineOverlayOptions`**

**Type:** Interface
```ts
interface HazelineOverlayOptions {
    closeBtnText?: string;

    topSideWrapOffset?: number;
    leftSideWrapOffset?: number;
    rightSideWrapOffset?: number;
    bottomSideWrapOffset?: number;

    overlayCSS?: HazelineCSSRules;
    endTutorialBtnCSS?: HazelineCSSRules;
    endTutorialBtnHoverCSS?: HazelineCSSRules;
}
```

### **`HazelineLightboxOptions`**

**Type:** Interface
```ts
interface HazelineLightboxOptions {
    nextBtnText?: string;
    prevBtnText?: string;
    lastStepNextBtnText?: string;
    lightboxWrapperCSS?: HazelineCSSRules;
    lightboxNextBtnCSS?: HazelineCSSRules;
    lightboxPrevBtnCSS?: HazelineCSSRules;
    lightboxTextWrapperCSS?: HazelineCSSRules;
    lightboxControlsWrapperCSS?: HazelineCSSRules;

    lightboxPrevBtnHoverCSS?: HazelineCSSRules;
    lightboxNextBtnHoverCSS?: HazelineCSSRules;

    positioning?: {
        offset?: string;
        attachment?: string;
        classPrefix?: string;
        targetOffset?: string;
        targetAttachment?: string;
        constraints?: ITetherConstraint[];
        classes?: { [className: string]: boolean | string };
    };
}
```

### **`HazelineTextualOverlayOptions`**

**Type:** Interface
```ts
interface HazelineTextualOverlayOptions {
    hideButtons?: boolean;
    disableBgFadeIn?: boolean;
    disableTextFadeIn?: boolean;
    clickAnywhereForNextStep?: boolean;

    bgFadeInTimeInMs?: number;
    textFadeInTimeInMs?: number;

    overlayBgFadeInOpacity?: number;
    overlayParagraphFadeInOpacity?: number;

    overlayCSS?: HazelineCSSRules;
    paragraphCSS?: HazelineCSSRules;
    prevNextButtonsCSS?: HazelineCSSRules;
    prevNextButtonsHoverCSS?: HazelineCSSRules;
}
```

### **`HazelineTutorialStep`**

**Type:** Interface
```ts
interface HazelineTutorialStep {
    text: string;
    elementSelector: string;
    
    delayText?: string;
    delayTextColor?: string;
    delayBeforeStart?: number;

    dynamicOptions?: HazelineOptions;
    useOverlayInsteadOfLightbox?: boolean;

    nextStepCustomTrigger?: {
        event: string;
        disableDefaultNextPrevBtns?: boolean;
        callback: (evt: Event, step: HazelineTutorialStep, htmlElement: HTMLElement) => Promise<void>,
    };

    onBeforeEnd?: () => Promise<boolean>;
    onBeforeStart?: () => Promise<boolean>;
}
```

---
### Built With
* [Rxjs](https://rxjs-dev.firebaseapp.com/) - Reactive extensions library for javascript
* [Tether](http://tether.io/) - A client-side library to make absolutely positioned elements attach to elements in the page efficiently.
* [TypeScript](https://github.com/Microsoft/TypeScript) - TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
* **Love and passion. For coding, and beautiful code**

### Help Hazeline grow
If you like this project please help me with your feedback, leave a star :) Found a bug? Want a feature? Want some help? Feel free to open a [Issue on GitHub](https://github.com/caiuscitiriga/hazeline/issues).

### Versioning
We use [SemVer](http://semver.org/) for versioning. 

### Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

### License
This project is licensed under the MIT License.