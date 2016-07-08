AdminLTE dashboard theme
========================

`meteor add redaty:admin-lte`

This Template requires the twbs-bootstrap framework and based on mfactory:admin-lte template.
It contains the bootstrap and glyphicons.

## Install ##
`meteor add twbs:bootstrap`
`meteor add redaty:admin-lte`

## Usage ##

1. Get familiar with [AdminLTE](https://almsaeedstudio.com/AdminLTE) docs.
2. Use `AdminLTE` template to load AdminLTE files.

```
{{#AdminLTE skin="green"}}
  <!-- your html here -->
{{/AdminLTE}}


OR

<template name="AdminLTE">
  {{#unless isReady}}
    {{> Template.dynamic template=loadingTemplate}}
  {{else}}
    <div class="skin-{{skin}}">
      <div class="wrapper">
        {{> UI.contentBlock}}
      </div>
    </div>
  {{/unless}}
</template>

<template name="AdminLTE_loading">
  <b>Loading</b>
</template>

```

### Available options ###

**skin** - specifies which skin to use. Accepted values: `black black-light blue blue-light green green-light purple purple-light red red-light yellow yellow-light`. Defaults to 'blue'.

**fixed** - set to `true` to get fixed header and sidebar. Defaults to `false`.

**sidebarMini** - set to `true` to make sidebar small when collapsed. Defaults to `false`.

### Available Functions ###

Right Sidebar with Settings and etc. is working now.
We can use it with `data-toggle=control-sidebar` attribute.

The skins is changeable with data-skin attribute.
Example:
`<a href="#" data-skin="skin-black"></a>
<a href="#" data-skin="skin-black-light"></a>
<a href="#" data-skin="skin-red"></a>`


It is similar to Admin-LTE 2.3.5 version.