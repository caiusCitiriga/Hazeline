# Hazeline [WIP]
### A step by step tutorial library for the web, as you would expect it.
<br>

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

Still not happy? We've got you covered, you can pass **CSS classes** too, and each step can take **RAW HTML** strings, so you can also define the template.


## Getting started

## How it works
There are **six** pieces that works together while **Hazeline** is running:
+ The tutorial cloth
+ The InfoBox
+ The InfoBox content
+ The InfoBox next or end button
+ The tutorial close button
+ The timeout text when a step is waiting to begin

**Hazeline** does not use Canvas, or SVG graphics. In fact, it doesn't use graphics at all. 

All that it does is to prepend a **div** that acts as an overlay with **z-index: 999** inside your body.

Then, when each step is about to be executed:
+ It looks inside the DOM for the element with the specified selector. 
+ Backups all the CSS properties that it will override 
+ Changes it's *z-index* and some other properties 
+ It draws (or reuses the previously drawn) *InfoBox*
+ It updates the *InfoBox* styles and content

The *InfoBox* is the actual element that the user will see above, below, on right, or on left (by default is below) of the concerned tutorial step element.

**Hazeline** is capable of holding several tutorial sections. Each section contains multiple steps.

When a tutorial section is started, a `onStart` event fires, and when a tutorial section is about to end, a `onEnd` event is fired. You can specify callbacks for these events.

Similarly you can specify a `onNext` and `onStart` events for each section step. Along with a lot of other properties that you can customize for each step.

## Customization
**Section Configuration**

`\\ Talk about section properties`

**Section Step Configuration**

`\\ Talk about steps properties, like text contents, etc.`

**Default Stylings**

`\\ Talk about the default CSS styles applied`

**Global Stylings**

`\\ Talk about the one time CSS config for all steps`

**Section Step Stylings**

`\\ Talk about the step by step stylings`


## Events

## Section properties

## Section step properties

## Help Hazeline grow
If you like this project please help me with your feedback, leave a star :) Found a bug? Want a feature? Want some help? Feel free to open a [Issue on GitHub](https://github.com/caiuscitiriga/hazeline/issues).

## Versioning
We use [SemVer](http://semver.org/) for versioning. 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

## License
This project is licensed under the MIT License.