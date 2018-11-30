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

## Hazeline methods
**`addSection`**
---

Adds a section to the sections available. Optionally can clear the previous sections when adding a new one.

### Arguments:
Argument #01  | section
------------- | -------------
**Required**  | yes
**Type**  | HazelineTutorialSection

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

**Returns:** `Observable<HazelineTutorialStatus>`

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

+ Ability to add delay between a step and another
+ Ability to use a overlay that fully covers the page and specifies a text. In that case the lightbox won't be used.
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