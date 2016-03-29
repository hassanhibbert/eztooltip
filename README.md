# ezTooltip.js

ezTooltip is a lightweight javascript plugin that doesn’t depend on any external library. When minified it is only about 1k. This plugin adds a tooltip to almost any element.

__Demo:__ http://hassanhibbert.github.io/eztooltip/

### Sample Usage:

__Javascript Setup:__ Initialize script by passing in the selector for tooltips on the page.

```js
ezTooltip.init('.tool-tip');
```

__HTML Setup:__ Initialize script by passing in the `selector` tooltips on the page.


Default tooltip.
```html
<a href="#" title="The description for tooltip" class="tool-tip"> My tooltip </a>

```

Manually place tooltip at the top.
```html
<a href="#" data-placement="top" title="The description for tooltip" class="tool-tip"> My tooltip </a>

```

