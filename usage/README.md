# Slider

This component is based on the blueprint of Veams-Components.

## Requirements 

### Handlebars
- `veams-component-cta`

### Sass
- `_get-media.scss`

### JavaScript
- `App.currentMedia` functionality in Veams-JS
- `App.EVENTS.resize` object in Veams-JS

## Usage

### Include: Page

``` hbs
{{! @INSERT :: START @id: slider, @tag: component-partial }}
{{! wrapWith START: Slider }}
{{#with slider-bp.simple}}
	{{#wrapWith "c-slider"}}
		{{#wrapWith "c-slider__item"}}
			<img src="https://placeholdit.imgix.net/~text?txtsize=92&txt=980%C3%97600&w=980&h=600" alt="test">
		{{/wrapWith}}
		{{#wrapWith "c-slider__item"}}
			<img src="https://placeholdit.imgix.net/~text?txtsize=92&txt=980%C3%97600&w=980&h=600" alt="test">
		{{/wrapWith}}
		{{#wrapWith "c-slider__item"}}
			<img src="https://placeholdit.imgix.net/~text?txtsize=92&txt=980%C3%97600&w=980&h=600" alt="test">
		{{/wrapWith}}
	{{/wrapWith}}
{{/with}}
{{! wrapWith END: Slider}}
{{! @INSERT :: END }}
```

### Include: SCSS

``` scss
// @INSERT :: START @tag: scss-import  
@import "components/_c-slider";
// @INSERT :: END
```

### Include: JavaScript

#### Import
``` js
// @INSERT :: START @tag: js-import  
import Slider from './modules/slider/slider';
// @INSERT :: END
```

#### Initializing in Veams V2
``` js
// @INSERT :: START @tag: js-init-v2  
/**
 * Init Form
 */
Helpers.loadModule({
	el: '[data-js-module="slider"]',
	module: Slider,
	context: context
});
// @INSERT :: END
```

#### Initializing in Veams V3
``` js
// @INSERT :: START @tag: js-init-v3   
/**
 * Init Form
 */
Helpers.loadModule({
	domName: 'slider',
	module: Slider,
	context: context
});
// @INSERT :: END
```
