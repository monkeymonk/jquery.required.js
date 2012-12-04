jQuery.required Plugin - Beta
==================

HTML5 [required] attribute support for old browsers.

http://monkeymonk.github.com/jquery.required.js


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
  className: 'required',                  // (default) added to each label and field if not filled
  override: true,                         // (default) if "false" we will let the browser manage the [required] attributes
  
  // Callbacks
  onValidate: function(valid, settings) { // callback each time we validate a field ("this" is the current field)
    if(valid) {
      // do something
    }
  },
  onSubmit: function(valid, settings) {   // callback when we try to submit the form (return "false" to stop submiting, "this" is the current form)
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

