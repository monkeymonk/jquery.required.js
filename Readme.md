jQuery.required Plugin - v1.0
==================

HTML5 [required] attribute support for old browsers.

Project site: http://monkeymonk.github.com/jquery.required.js


## Usage

### Basic

``` javascript
$(document).ready(function() {
	$('[required]').required();
});
```

### Options

``` javascript
{
  // (default) added to each label and field if not filled
  className: 'required',

  // (default) if "false" we will let the browser manage the [required] attributes
  override: true,
  
  // callback each time we validate a field ("this" is the current field)
  onValidate: function(valid, settings) {
    if(valid) {
      // do something
    }
  },
  
  // callback when we try to submit the form (return "false" to stop submiting, "this" is the current form)
  onSubmit: function(valid, settings) {
    if(valid) {
      // do something
    }
  }
}
```

### Methods

``` javascript
$('#field').required('validate');

$('#field').required('destroy');
```


## Browsers: Tested and Working In

- IE 6, 7, 8, 9, 10
- Firefox 3+
- Opera 10+
- Safari 4+

