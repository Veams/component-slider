<p align='right'>
    <a href="https://badge.fury.io/js/veams-component-slider"><img src="https://badge.fury.io/js/veams-component-slider.svg" alt="npm version" height="18"></a>
    <a href='https://gitter.im/Sebastian-Fitzner/Veams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge'><img src='https://badges.gitter.im/Sebastian-Fitzner/Veams.svg' alt='Gitter Chat' /></a>
</p>

# Slider

## Description

The component represents a simple but powerful slider. 

> The slider module is a component for cycling through elements, like a carousel or slideshow. It allows users to swipe on touch-enabled devices. 

----------

## Requirements
- `Veams >= v5.0.0` - Veams Framework.

-----------

## Installation 

### Installation with Veams

`veams install vc slider`

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

- activeClass {`String`} ['is-active'] - _Class for the active slide._
- actions {`String`} ['[data-js-item="slider-actions"]'] - _Actions wrapper element in the component._
- autoPlay {`Boolean`} [false] - _Enable autoplay option of the slider._
- autoPlayInterval {`Number`} [3000] - _Autoplay speed in milliseconds._
- cloneClass {`String`} ['is-cloned'] - _For the infinite slider the last and first element get cloned. The cloning class can be overriden._
- disablePagination {`Boolean`} [false] - _Disable pagination._
- enableTouchSwipe {`Boolean`} [true] - _Enable support for swipe gestures on touch devices._
- groupPaginationItems {`Boolean`} [true] - _Enable the grouping of pagination items._
- hiddenClass {`String`} ['is-hidden'] - _The hidden class used by handling the visibility of the slider._
- infinite {`Boolean`} ['is-closed'] - _The slider will be set in infinite mode. Can not be used with multiple active slide items._
- items {`String`} ['[data-js-item="slider-item"]'] - _Define the slide item element._
- next {`String`} ['[data-js-item="slider-next"]'] - _Define the next button element._
- prev {`String`} ['[data-js-item="slider-prev"]'] - _Define the prev button element._
- pagination {`String`} ['[data-js-item="slider-pagination"]'] - _Define the pagination element in which the pagination items are generated in._
- paginationItemClass {`String`} ['slider__pagination-list-item'] - _Class for the generated pagination item._
- paginationItemJsAtom {`String`} ['slider-pagination-item'] - _Data attribute for the generated pagination item._
- paginationList {`String`} ['[data-js-item="slider-pagination-list"]'] - _Define the pagination list element in which the pagination items are generated in._
- ribbon {`String`} ['[data-js-item="slider-ribbon"]'] - _Define the slider ribbon which is holding all slides and gets the full width._
- pauseOnHover {`Boolean`} [true] - _When `autoplay` is set you can enable/disable pause on hover._
- slideByItemNumber {`Number`} [false] - _You can use the option to override the initial slide step which is the number of current visible items._
- startAtIndex {`Number`} [0] - _Start index for the slider._
- openIndex {`Number`} [null] - _Index of panel to be opened on init (zero based)._
- visibleItems {`Object`} [ {'desktop': 1, 'tablet-large': 1, 'tablet-small': 1, 'mobile-large': 1, 'mobile-medium': 1, 'mobile-small': 1} ] - _Define how many slide items should be visible on different viewports._
- wrapper {`String`} ['[data-js-item="slider-wrapper"]'] - _Define the slider wrapper element._

------------

## Sass Options

There are multiple global variables which you can change: 
- $slider-darken [`10 !default`] - _Darken value for hover effects._
- $slider-unresolved-height [`300px !default`] - _Set a fix height when the slider is in unresolved state._
- $slider-duration [`600ms !default`] - _Slide item animation duration._
- $slider-ease-method [`ease !default`] - _Slide item animation ease method._
- $slider-control-bg-color [`#a5cfd1 !default`] - _Background color of control buttons._
- $slider-pagination-color `[#555 !default`] - _Background color of pagination items._
- $slider-pagination-color-active `[$slider-pagination-color !default`] - _Active vackground color of pagination items which gets darken by `$slider-darken`._
- $slider-pagination-size [`15px !default`] - _Pagination size (width & height)._
- $slider-pagination-border-radius [`25% !default`] - _Border radius of pagination items._