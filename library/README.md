# Hazeline

A simple, lightweight, framework agnostic tutorial library for **any** web application.<br>
Made with love in **TypeScript**, but works like a charm even with vanilla **JS**.

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

#### Result
![Hazeline GIF demo](https://github.com/caiusCitiriga/Hazeline/raw/dev/docs/global-conf-example.png)

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

## Hazeline customizable properties details
---
### Overlay

The `overlay` option, allows you to customize the overlay that surrounds the highlighted element. <br>

Property name | Description | Accepted values
--------------|-------------|-----------------
`closeBtnText`  | The text inside the button to end the tutorial | `string`
`overlayCSS` | The CSS for the overlay | `HazelineCSSRules`
`ebdTutorialBtnCSS` | The CSS for the end tutorial btn | `HazelineCSSRules`
`endTutorialBtnHoverCSS` | The CSS for the end tutorial btn when in hover mode| `HazelineCSSRules`<br>

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
`hideButtons` | Wheter to show or not the next/previous buttons. **Note**: if you hide the buttons, the `clickAnywhereForNextStep` is automatically activated, and there will be no way to go back to the previous step from there | `boolean` 
`disableBgFadeIn` | By default, the bg of the textual overlay fades in and out when appearing and disappearing. You can disable this behaviour | `boolean`
`disableTextFadeIn` | By default, the text of the textual overlay paragraph fades in and out when appearing and disappearing. You can disable this behaviour | `boolean`
`clickAnywhereForNextStep` | You can enable the next step triggering by clicking anywhere on the textual overlay | `boolean`
`bgFadeInTimeInMs` | The time that the fade transition will take to complete on the overlay. **Note**: the `ease-in-out` method is used for easing | `number`
`textFadeInTimeInMs` | The time that the fade transition will take to complete on the paragraph. **Note**: the `ease-in-out` method is used for easing | `number`
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
}
```

### **`HazelineOptions`**

**Type:** Interface
```ts
interface HazelineOptions {
    overlay?: HazelineOverlayOptions;
    lightbox?: HazelineLightboxOptions;
}
```

### **`HazelineOverlayOptions`**

**Type:** Interface
```ts
interface HazelineOverlayOptions {
    closeBtnText?: string;
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
    dynamicOptions?: HazelineOptions;
}
```

## Upcoming features

+ Margin offset on highlighted item
+ Ability to add delay between a step and another
+ Ability to attach events on:
    + `onStepEnd()`
    + `onStepStart()`
    + `onSectionEnd()`
    + `onSectionStart()`
    + `onTutorialPrematureEnd()`

---

### Dependencies
+ rxjs: `v6.3.3`
+ tether: `v1.4.5`

## Help Hazeline grow
If you like this project please help me with your feedback, leave a star :) Found a bug? Want a feature? Want some help? Feel free to open a [Issue on GitHub](https://github.com/caiuscitiriga/hazeline/issues).

## Versioning
We use [SemVer](http://semver.org/) for versioning. 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

## License
This project is licensed under the MIT License.