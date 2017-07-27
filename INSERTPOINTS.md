
### Include: Page

``` hbs
{{! @INSERT :: START @id: slider, @tag: component-partial }}
{{#with slider-bp.variations.simple}}
    {{! wrapWith START: Slider }}
    {{#wrapWith "c-slider" settings=this.settings content=this.content}}
        {{! WrapWith START: Slider List }}
        {{#wrapWith "c-slider__list"}}
            {{#times 8}}
                {{#wrapWith "c-slider__item"}}
                    <img src="https://placehold.it/1920x800" alt="test">
                {{/wrapWith}}
            {{/times}}
        {{/wrapWith}}
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
// @INSERT :: START @tag: scss-self-contained-import //
@import "../templating/partials/components/slider/scss/_c-slider";
// @INSERT :: END //
```

### Include: JavaScript

#### Import
``` js
// @INSERT :: START @tag: js-import //
import Slider from './modules/slider/slider';
// @INSERT :: END //
// @INSERT :: START @tag: js-self-contained-import //
import Slider from '../templating/partials/components/slider/js/slider';
// @INSERT :: END //
```

#### Initializing in Veams V5
``` js
// @INSERT :: START @tag: js-init-v5 //
    ,
    /**
     * Init Slider
     */
    {
        namespace: 'slider',
        module: Slider
    }
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
