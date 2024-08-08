# &lt;sc-privacy-modal&gt; & &lt;sc-privacy-widget&gt; elements

Two custom elements to ask for user permission before loading third party code like Social Media feeds or maps embeds.

**`<sc-privacy-modal>`**
Modal to ask users for general permission to use any third party tools.

**`<sc-privacy-widget>`**
Widget that waits for user input either from `<sc-privacy-modal>` or directly from the widget. If the user has given permission, the third party code will be loaded.

## Installation
Available on [npm](https://www.npmjs.com/) as [**@spartan-components/sc-privacy**](https://www.npmjs.com/package/@spartan-components/sc-privacy).

```
$ npm install --save @spartan-components/sc-privacy
```

## Usage

### Script

Import as ES modules:

```js
import { SCPrivacyModal, SCPrivacyWidget } from '@spartan-components/sc-privacy';
```

Include with a script tag:

```html
<script type="module" src="./node_modules/@spartan-components/sc-privacy-modal.js">
<script type="module" src="./node_modules/@spartan-components/sc-privacy-widget.js">
```

### &lt;sc-privacy-modal&gt;

```html
<sc-privacy-modal
  data-keys="googleMapsCookiesAccepted elfsightCookiesAccepted">
  <template>
    <p>
      This website uses third party tools that can set cookies and might
      collect usage data.
    </p>
    <button data-ok>OK</button>
    <button data-dismiss>Dismiss</button>
  </template>
</sc-privacy-modal>
```

Note:
- Use the `data-keys` attribute with **space separated** values to control, which widgets should be loaded.
- A `<template>` element is expected to render the disclaimer
- The `<template>` element requires two buttons:
  - `<button data-ok>`
  - `<button data-dismiss>`

### &lt;sc-privacy-widget&gt;

```html
<sc-privacy-widget
  data-key="googleMapsCookiesAccepted">

  <div data-fallback>
    <p>JavaScript is required to load Google Maps.</p>
  </div>

  <template data-disclaimer>
    <p><b>Google Maps</b></p>
    <p>To load Google Maps you must accept
      <a href="https://policies.google.com/privacy?hl=en-US">
        Googles Privacy Policy
      </a>.
    </p>
    <button data-ok>Accept</button>
  </template>

  <template data-widget>
    <iframe
      width="380"
      height="300"
      class="maps-embed"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      src="https://maps.google.com/maps?q=Googleplex&z=18&output=embed">
    </iframe>
  </template>
</sc-privacy-widget>
```

Notes:
- Use the `data-key` attribute to control the loading of the widget (only a single value is allowed).
- You can render a fallback element by specifying the `data-fallback` attribute
- Two `<template>` elements are required:
  - `<template data-disclaimer>` for rendering the disclaimer
  - `<template data-widget>` for rendering the third party embed
- The `<template data-disclaimer>` element requires one button
  - `<button data-ok>`
