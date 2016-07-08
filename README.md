AdminLTE dashboard theme
========================

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
