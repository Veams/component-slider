<p align='right'>
    <a href='https://badge.fury.io/bo/veams-component-slider'><img src='https://badge.fury.io/bo/veams-component-slider.svg' alt='Bower version' height='20'></a>
    <a href='https://gitter.im/Sebastian-Fitzner/Veams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge'><img src='https://badges.gitter.im/Sebastian-Fitzner/Veams.svg' alt='Gitter Chat' /></a>
</p>

# Slider

## Description

The component represents a simple but powerful slider. 

Accordions are elements used to expand and collapse content that is broken into logical sections, much like tabs.

The accordion is based on the blueprint of Veams-Components and is a wrap-with component to support flexible content with predefined surrounded markup.

The accordion is jQuery-free (we use Veams-Query) and contains some accessiblity functionality.

-----------

## Requirements
- `Veams-JS >= v4.0.0` - Basic JavaScript library. 
- `_get-media.scss` - Contains media queries for JavaScript.

-----------

## Installation 

### Installation with Veams

`veams install vc slider`

### Installation with Bower

`bower install veams-component-slider --save`

----------- 

## Fields

### `c-slider.hbs`

The partial is a `wrapWith` partial.

#### Settings
- settings.sliderContextClass {`String`} [default] - _Context class of component._
- settings.sliderClasses {`String`} - _Modifier classes for component._
- settings.sliderJsOptions {`Object`} - _JavaScript options which gets stringified._
- settings.sliderInnerFullWidth {`Boolean`} [false] - _Delete the class `.is-container` from `.slider__content`._
- settings.sliderHidePagination {`Boolean`} [false] - _Hide the pagination when set to true._

### `c-slider__controls.hbs`

#### Content
- content.sliderButtons {`Object`} - _Contains the controls content. When the object is not defined, the controls will not be printed out._
- content.sliderButtons.prev {`String`} - _Define the button text for the previous button._
- content.sliderButtons.next {`String`} - _Define the button text for the next button._

### `c-slider__list.hbs`

The partial is a `wrapWith` partial.

#### Settings
- settings.sliderOverflow {`Boolean`} - _Set this option to `true` if you want to add the class `.is-overflow` which gives you the possibility to show all hidden items next to the active element(s)._


### `c-slider__item.hbs`

The partial is a `wrapWith` partial.

-------------

## JavaScript Options

The module gives you the possibility to override default options: 

- autoPlay {`Boolean`} [false] - _Enable autoplay option of the slider._
- autoPlayInterval {`Number`} [3000] - _Autoplay speed in milliseconds._
- disablePagination {`Boolean`} [false] - _Disable pagination._
- enableTouchSwipe {`Boolean`} [true] - _Enable support for swipe gestures on touch devices._
- clickHandler {`String`} ['click'] - _Define a click handler for the buttons._
- closeClass {`String`} ['is-closed'] - _Define the closing class for accordion content items._
- dataMaxAttr {`String`} ['data-js-height'] - _Define the attribute in which the calculated height is saved._
- openAllOnInit {`Boolean`} [false] - _If set to true, all panels stays open on render._
- openByHash {`Boolean`} [false] - _If set to true, panel can be opened by url hash referencing the id of the panel._
- openClass {`Boolean`} ['is-open'] - _Define the opening class for accordion content items._
- openIndex {`Number`} [null] - _Index of panel to be opened on init (zero based)._
- openOnViewports {`Array`} [ ['desktop', 'tablet-large', 'tablet-small'] ] - _Viewports on which the openIndex panel is opened on init._
- singleOpen {`Boolean`} [false] - _If set to true, only one panel can be opened at the same time._
- tabMode {`Boolean`} [false] - _If set to true, the accordion behaves like a tab module (click on active button will not close corresponding panel)._
- unresolvedClass {`String`} ['is-unresolved'] - _Define the unresolved class for the whole accordion which will be deleted after `initialize()` and `render()` is finished._

------------

## Sass Options

There are multiple global variables which you can change: 
- $accordion-toggle-duration [`300ms !default`] - _Speed of toggling._
- $accordion-transition-method [`ease !default`] - _Transition method of toggle effect._
- $accordion-icon-color [`#666 !default`] - _+ icon color._
- $accordion-icon-width [`30px !default`] - _+ icon width._
- $accordion-icon-height [`2px !default`] - _+ icon height._
- $accordion-btn-color `[$accordion-icon-color !default`] - _Accordion button color._
- $accordion-btn-bg-color [`rgba(255, 255, 255, 0.5) !default`] - _Background color of the accordion button._
- $accordion-padding [`1rem !default`] - _Default padding which will be used in the accordion._


#### disablePagination
`Type: boolean` | `Default: false`

Disable pagination

#### enableTouchSwipe
`Type: boolean` | `Default: true`

Enable support for swipe gestures on touch devices

#### infinite
`Type: boolean` | `Default: true`

Infinite loop sliding

#### pauseOnHover
`Type: boolean` | `Default: true`

Pause Autoplay On Hover

#### startAtIndex
`Type: integer` | `Default: 0`

Slide to start on

#### visibleItems
`Type: object` | `Default: none`

Object containing breakpoints. Determines visible items at given screen width