import { CSSRules } from "./css-rules.interface";
import { StepStylableElements } from "./stylable-elements";

export interface StylableElements extends StepStylableElements {
    tutorialCloth?: CSSRules;
}
