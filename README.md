# Hazeline

## Philosophy
*I want a simple, neat, yet powerful and fully customizable library, to guide my users through the application I've built.*

Introducing **Hazeline**, a framework-agnostic tool that any JS application can include to guide their users through a step by step tutorial.

### **Simple**
---
Hazeline comes pre-configured with a fresh and clean style. You won't need to create your styles, just specify a tutorial section, press Run and you're ready to go.
Each configuration method *speaks by itself* and the parameters are self explainatory. What it says it does.

### **Neat**
---
You care about two things, your sections and you sections steps. 


A **section** is a tutorial container, since your application could have many sections, your tutorial should too.
Each **section** contains multiple **section-steps** the actual **steps** that the user 
will see.
Each **section-step** is bound to an HTML element. That element will be the highlighted element that the user will see.

Optionally you could care about a third one, a default styling config, that will be applyied globally to each section.

### **Powerful**
---
**CSS selectors style**

You can target any combination of CSS selectors, and **Hazeline** will look for that element. If found, you business ends there, the rest is handled by **Hazeline**. 

**Interactions**

You can use the plain 'ol **next** and **previous** buttons, but you can also attach your custom event listeners that will trigger the next step, any valid JS event listener, including *keyEvents* are accepted.

### **100% Customizable**
---
Anything, and literally **ANYTHING** you see on screen is CSS customizable.

You can define a Global styling, or you can style each step individually.

Still not happy? We've got you covered, you can pass a CSS classes too, and each step can take **RAW HTML** strings, so you can also define the template.

---
## Getting started

## Structure

## How it works

## Styling

## Events

## Section properties

## Section step properties
