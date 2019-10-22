# CSS HTML Cross-Browser

This document should provide some guidance when ...

## Drag'n'Drop

### Global blocking of drag'n'drop

### Drag'n'Drop Area


## Navigation Container

### Scrolling
To make the main content scroll on the page we don't explicitly set the `overflow-y: auto` on some element. We let the browser
do the scrolling with the `body` tag. Only like that browsers can optimize the scrolling behaviour for mobile devices, e.g. remove the
URL bar when scrolling down.

## 

## Nested Buttons
Nested buttons are not supported by the Firefox (ESR) browser (nested button is not clickable). To overcome that issue we use the following pattern.

Instead of nesting the buttons like this:
```xhtml
<button>
    Parent Button
    <button>
        Nested Button
    </button>
</button>
```
... you have to position the nested button below the parent button and use absolute positioning:

```xhtml
<div class="position-relative">
    <button>Parent Button</button>
    <button class="nested-button">Nested Button</button>
</div>
```
```CSS
.nested-button {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
}
```

## Sticky Positioning
Sticky positioning is not supported by the IE11 browser resulting in the property being ignored. But this can lead 
to unpredictable behaviour, because the CSS property `top` may require different values depending on whether `sticky`
is supported or not. To achieve this, you can use the following pattern using `@supports`:
```
.my-sticky-positioned-container {
  top: 54px;
  position: relative;
  @supports (position: sticky) {
    top: 154px;
    position: sticky;
  }
}
```

## Printing

### Full Width Columns
Use the class `.alv-print-container` to force columns (e.g. ".col-6") to have full width on print.

### Exclude from print
To explicitly exclude certain parts of the HTML from print use the Bootstrap CSS class `.d-print-none`.

### Global printing rules
The global printing rules are maintained and documented in [scss/common/print.scss](../alv-portal-ui/src/scss/common/print.scss).

