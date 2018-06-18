export class StylesManager {

    private static defaultClothStyles: CSSRules = {
        top: '0',
        left: '0',
        opacity: '0',
        zIndex: '999',
        position: 'fixed',
        background: '#007bffe6',
        transition: 'opacity 120ms ease-in-out',
    }

    private static defaultInfoBoxStyles: CSSRules = {
        opacity: '0',
        color: '#333',
        zIndex: '999',
        width: '300px',
        padding: '10px',
        minHeight: '210px',
        background: '#fff',
        borderRadius: '5px',
        position: 'relative',
        transition: 'opacity 200ms ease-in-out',
        boxShadow: 'rgb(0, 0, 0) 0px 3px 12px -6px',
    }

    private static defaultInfoBoxContentStyles: CSSRules = {
        height: '130px',
        overflowY: 'scroll',
        textAlign: 'center',
        borderRadius: '5px',
        border: '1px solid #eee'
    }

    private static defaultInfoBoxNextButtonStyles: CSSRules = {
        right: '0',
        bottom: '0',
        zIndex: '999',
        padding: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        position: 'absolute',
    };

    private static defaultInfoBoxPrevButtonStyles: CSSRules = {
        left: '0',
        bottom: '0',
        zIndex: '999',
        padding: '10px',
        marginLeft: '10px',
        marginBottom: '10px',
        position: 'absolute',
    };

    public static set tutorialClothDefaultStyle(value: CSSRules) {
        this.defaultClothStyles = Object.assign(this.defaultClothStyles, value);
    }

    public static set infoBoxDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value);
    }

    public static set infoBoxNextBtnDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value);
    }

    public static set infoBoxPrevBtnDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value);
    }

    public static set infoBoxContentDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value);
    }

    public static styleTutorialCloth(clothElement: HTMLElement): HTMLElement {
        clothElement = this.applyStyles(clothElement, this.defaultClothStyles);
        return clothElement;
    }

    public static styleInfoBox(boxElement: HTMLElement): HTMLElement {
        boxElement = this.applyStyles(boxElement, this.defaultInfoBoxStyles);
        return boxElement;
    }

    public static styleInfoBoxContent(infoBoxContentElement: HTMLElement): HTMLElement {
        infoBoxContentElement = this.applyStyles(infoBoxContentElement, this.defaultInfoBoxContentStyles);
        return infoBoxContentElement;
    }

    public static styleInfoBoxNextBtn(buttonElement: HTMLElement): HTMLElement {
        buttonElement = this.applyStyles(buttonElement, this.defaultInfoBoxNextButtonStyles);
        return buttonElement;
    }

    public static styleInfoBoxPrevBtn(buttonElement: HTMLElement): HTMLElement {
        buttonElement = this.applyStyles(buttonElement, this.defaultInfoBoxPrevButtonStyles);
        return buttonElement;
    }

    private static applyStyles(element: HTMLElement, stylesSet: CSSRules): HTMLElement {
        const stylesKeys = Object.keys(stylesSet);

        stylesKeys.forEach(styleKey => {
            element.style[styleKey] = stylesSet[styleKey];
        });

        return element;
    }

}

export interface CSSRules {
    alignContent?: string;
    alignItems?: string;
    alignSelf?: string;
    alignmentBaseline?: string;
    animation?: string;
    animationDelay?: string;
    animationDirection?: string;
    animationDuration?: string;
    animationFillMode?: string;
    animationIterationCount?: string;
    animationName?: string;
    animationPlayState?: string;
    animationTimingFunction?: string;
    backfaceVisibility?: string;
    background?: string;
    backgroundAttachment?: string;
    backgroundClip?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundOrigin?: string;
    backgroundPosition?: string;
    backgroundPositionX?: string;
    backgroundPositionY?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
    baselineShift?: string;
    border?: string;
    borderBottom?: string;
    borderBottomColor?: string;
    borderBottomLeftRadius?: string;
    borderBottomRightRadius?: string;
    borderBottomStyle?: string;
    borderBottomWidth?: string;
    borderCollapse?: string;
    borderColor?: string;
    borderImage?: string;
    borderImageOutset?: string;
    borderImageRepeat?: string;
    borderImageSlice?: string;
    borderImageSource?: string;
    borderImageWidth?: string;
    borderLeft?: string;
    borderLeftColor?: string;
    borderLeftStyle?: string;
    borderLeftWidth?: string;
    borderRadius?: string;
    borderRight?: string;
    borderRightColor?: string;
    borderRightStyle?: string;
    borderRightWidth?: string;
    borderSpacing?: string;
    borderStyle?: string;
    borderTop?: string;
    borderTopColor?: string;
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
    borderTopStyle?: string;
    borderTopWidth?: string;
    borderWidth?: string;
    bottom?: string;
    boxShadow?: string;
    boxSizing?: string;
    breakAfter?: string;
    breakBefore?: string;
    breakInside?: string;
    captionSide?: string;
    clear?: string;
    clip?: string;
    clipPath?: string;
    clipRule?: string;
    color?: string;
    colorInterpolationFilters?: string;
    columnCount?: string;
    columnFill?: string;
    columnGap?: string;
    columnRule?: string;
    columnRuleColor?: string;
    columnRuleStyle?: string;
    columnRuleWidth?: string;
    columnSpan?: string;
    columnWidth?: string;
    columns?: string;
    content?: string;
    counterIncrement?: string;
    counterReset?: string;
    cssFloat?: string;
    cssText?: string;
    cursor?: string;
    direction?: string;
    display?: string;
    dominantBaseline?: string;
    emptyCells?: string;
    enableBackground?: string;
    fill?: string;
    fillOpacity?: string;
    fillRule?: string;
    filter?: string;
    flex?: string;
    flexBasis?: string;
    flexDirection?: string;
    flexFlow?: string;
    flexGrow?: string;
    flexShrink?: string;
    flexWrap?: string;
    floodColor?: string;
    floodOpacity?: string;
    font?: string;
    fontFamily?: string;
    fontFeatureSettings?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    gap?: string;
    glyphOrientationHorizontal?: string;
    glyphOrientationVertical?: string;
    grid?: string;
    gridArea?: string;
    gridAutoColumns?: string;
    gridAutoFlow?: string;
    gridAutoRows?: string;
    gridColumn?: string;
    gridColumnEnd?: string;
    gridColumnGap?: string;
    gridColumnStart?: string;
    gridGap?: string;
    gridRow?: string;
    gridRowEnd?: string;
    gridRowGap?: string;
    gridRowStart?: string;
    gridTemplate?: string;
    gridTemplateAreas?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    height?: string;
    imeMode?: string;
    justifyContent?: string;
    justifyItems?: string;
    justifySelf?: string;
    kerning?: string;
    layoutGrid?: string;
    layoutGridChar?: string;
    layoutGridLine?: string;
    layoutGridMode?: string;
    layoutGridType?: string;
    left?: string;
    letterSpacing?: string;
    lightingColor?: string;
    lineBreak?: string;
    lineHeight?: string;
    listStyle?: string;
    listStyleImage?: string;
    listStylePosition?: string;
    listStyleType?: string;
    margin?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    marginTop?: string;
    marker?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    maskImage?: string;
    maxHeight?: string;
    maxWidth?: string;
    minHeight?: string;
    minWidth?: string;
    msContentZoomChaining?: string;
    msContentZoomLimit?: string;
    msContentZoomLimitMax?: string;
    msContentZoomLimitMin?: string;
    msContentZoomSnap?: string;
    msContentZoomSnapPoints?: string;
    msContentZoomSnapType?: string;
    msContentZooming?: string;
    msFlowFrom?: string;
    msFlowInto?: string;
    msFontFeatureSettings?: string;
    msGridColumn?: string;
    msGridColumnAlign?: string;
    msGridColumnSpan?: string;
    msGridColumns?: string;
    msGridRow?: string;
    msGridRowAlign?: string;
    msGridRowSpan?: string;
    msGridRows?: string;
    msHighContrastAdjust?: string;
    msHyphenateLimitChars?: string;
    msHyphenateLimitLines?: string;
    msHyphenateLimitZone?: string;
    msHyphens?: string;
    msImeAlign?: string;
    msOverflowStyle?: string;
    msScrollChaining?: string;
    msScrollLimit?: string;
    msScrollLimitXMax?: string;
    msScrollLimitXMin?: string;
    msScrollLimitYMax?: string;
    msScrollLimitYMin?: string;
    msScrollRails?: string;
    msScrollSnapPointsX?: string;
    msScrollSnapPointsY?: string;
    msScrollSnapType?: string;
    msScrollSnapX?: string;
    msScrollSnapY?: string;
    msScrollTranslation?: string;
    msTextCombineHorizontal?: string;
    msTextSizeAdjust?: string;
    msTouchAction?: string;
    msTouchSelect?: string;
    msUserSelect?: string;
    msWrapFlow?: string;
    msWrapMargin?: string;
    msWrapThrough?: string;
    objectFit?: string;
    objectPosition?: string;
    opacity?: string;
    order?: string;
    orphans?: string;
    outline?: string;
    outlineColor?: string;
    outlineOffset?: string;
    outlineStyle?: string;
    outlineWidth?: string;
    overflow?: string;
    overflowX?: string;
    overflowY?: string;
    padding?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    pageBreakAfter?: string;
    pageBreakBefore?: string;
    pageBreakInside?: string;
    penAction?: string;
    perspective?: string;
    perspectiveOrigin?: string;
    pointerEvents?: string;
    position?: string;
    quotes?: string;
    resize?: string;
    right?: string;
    rotate?: string;
    rowGap?: string;
    rubyAlign?: string;
    rubyOverhang?: string;
    rubyPosition?: string;
    scale?: string;
    stopColor?: string;
    stopOpacity?: string;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    tableLayout?: string;
    textAlign?: string;
    textAlignLast?: string;
    textAnchor?: string;
    textCombineUpright?: string;
    textDecoration?: string;
    textIndent?: string;
    textJustify?: string;
    textKashida?: string;
    textKashidaSpace?: string;
    textOverflow?: string;
    textShadow?: string;
    textTransform?: string;
    textUnderlinePosition?: string;
    top?: string;
    touchAction?: string;
    transform?: string;
    transformOrigin?: string;
    transformStyle?: string;
    transition?: string;
    transitionDelay?: string;
    transitionDuration?: string;
    transitionProperty?: string;
    transitionTimingFunction?: string;
    translate?: string;
    unicodeBidi?: string;
    userSelect?: string;
    verticalAlign?: string;
    visibility?: string;
    webkitAlignContent?: string;
    webkitAlignItems?: string;
    webkitAlignSelf?: string;
    webkitAnimation?: string;
    webkitAnimationDelay?: string;
    webkitAnimationDirection?: string;
    webkitAnimationDuration?: string;
    webkitAnimationFillMode?: string;
    webkitAnimationIterationCount?: string;
    webkitAnimationName?: string;
    webkitAnimationPlayState?: string;
    webkitAnimationTimingFunction?: string;
    webkitAppearance?: string;
    webkitBackfaceVisibility?: string;
    webkitBackgroundClip?: string;
    webkitBackgroundOrigin?: string;
    webkitBackgroundSize?: string;
    webkitBorderBottomLeftRadius?: string;
    webkitBorderBottomRightRadius?: string;
    webkitBorderImage?: string;
    webkitBorderRadius?: string;
    webkitBorderTopLeftRadius?: string;
    webkitBorderTopRightRadius?: string;
    webkitBoxAlign?: string;
    webkitBoxDirection?: string;
    webkitBoxFlex?: string;
    webkitBoxOrdinalGroup?: string;
    webkitBoxOrient?: string;
    webkitBoxPack?: string;
    webkitBoxSizing?: string;
    webkitColumnBreakAfter?: string;
    webkitColumnBreakBefore?: string;
    webkitColumnBreakInside?: string;
    webkitColumnCount?: string;
    webkitColumnGap?: string;
    webkitColumnRule?: string;
    webkitColumnRuleColor?: string;
    webkitColumnRuleStyle?: string;
    webkitColumnRuleWidth?: string;
    webkitColumnSpan?: string;
    webkitColumnWidth?: string;
    webkitColumns?: string;
    webkitFilter?: string;
    webkitFlex?: string;
    webkitFlexBasis?: string;
    webkitFlexDirection?: string;
    webkitFlexFlow?: string;
    webkitFlexGrow?: string;
    webkitFlexShrink?: string;
    webkitFlexWrap?: string;
    webkitJustifyContent?: string;
    webkitOrder?: string;
    webkitPerspective?: string;
    webkitPerspectiveOrigin?: string;
    webkitTapHighlightColor?: string;
    webkitTextFillColor?: string;
    webkitTextSizeAdjust?: string;
    webkitTextStroke?: string;
    webkitTextStrokeColor?: string;
    webkitTextStrokeWidth?: string;
    webkitTransform?: string;
    webkitTransformOrigin?: string;
    webkitTransformStyle?: string;
    webkitTransition?: string;
    webkitTransitionDelay?: string;
    webkitTransitionDuration?: string;
    webkitTransitionProperty?: string;
    webkitTransitionTimingFunction?: string;
    webkitUserModify?: string;
    webkitUserSelect?: string;
    webkitWritingMode?: string;
    whiteSpace?: string;
    widows?: string;
    width?: string;
    wordBreak?: string;
    wordSpacing?: string;
    wordWrap?: string;
    writingMode?: string;
    zIndex?: string;
    zoom?: string;
}