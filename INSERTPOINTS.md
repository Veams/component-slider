
### Include: Page

``` hbs
{{! @INSERT :: START @id: slider, @tag: component-partial }}
{{#with slider-bp.variations.simple}}
    {{! wrapWith START: Slider }}
    {{#wrapWith "c-slider" settings=this.settings content=this.content}}
        {{! WrapWith START: Slider List }}
        {{!#wrapWith "c-slider__list"}}
            {{#times 8}}
                {{#wrapWith "c-slider__item"}}
                    <img src="https://placehold.it/1920x800" alt="test">
                {{/wrapWith}}
            {{/times}}
        {{!/wrapWith}}
        {{! WrapWith END: Slider List }}
    {{/wrapWith}}
    {{! wrapWith END: Slider}}
{{/with}}
{{! @INSERT :: END }}
```

### Include: SCSS

``` scss
// @INSERT :: START @tag: scss-import //
@import "components/_c-slider";
// @INSERT :: END //
// @INSERT :: START @tag: scss-import-self-contained //
@import "../templating/partials/components/slider/scss/_c-slider";
// @INSERT :: END //
```

### Include: JavaScript

#### Import
``` js
// @INSERT :: START @tag: js-import //
import Slider from './modules/slider/slider';
// @INSERT :: END //
// @INSERT :: START @tag: js-import-self-contained //
import Slider from '../templating/partials/components/slider/js/slider';
// @INSERT :: END //
```

#### Initializing in Veams V2
``` js
// @INSERT :: START @tag: js-init-v2 //
/**
 * Init Slider
 */
Helpers.loadModule({
	el: '[data-js-module="slider"]',
	module: Slider,
	context: context
});
// @INSERT :: END //
```

#### Initializing in Veams V3
``` js
// @INSERT :: START @tag: js-init-v3 //
/**
 * Init Slider
 */
Helpers.loadModule({
	domName: 'slider',
	module: Slider,
	context: context
});
// @INSERT :: END //
```

#### Custom Events
``` js
// @INSERT :: START @tag: js-events //

/**
 * Events for Slider
 */
EVENTS.slider = {
	slideStart: 'slide:start'
};
// @INSERT :: END //
```
