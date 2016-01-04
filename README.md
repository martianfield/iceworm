# Iceworm

A lightweight object mapping and validation library.

## Getting started

Install iceworm using npm:

```shell
npm install iceworm --save
``` 

Iceworm lets you quickly define schemas and validate objects against them.

Here an example:

```javascript
const iceworm = require('iceworm');

let schema = {
    firstName: '*string>3',
    userName: '*string>10<60',
    age: 'int>0',
    email: 'email'
}

var obj = {
    firstName: "Martin",
    userName: "martianfield",
    email: "test@test.com"
}

var result = iceworm.exec(schema, obj);

if(result.isValid) {
    console.dir(result.object)
} 
else {
    result.errors.forEach((error) => {
        console.dir(error);
    });
}
```

## Schema Definition

A schema is an object containing keys for fields and values for definitions:

```javascript
let schema = {
    <field_1>:<definition_1>,
    ...
    <field_n>:<definition_n>
}
```

The definition consist of

- indicator if the field is required ... if required, put an asterisk `*` at the beginning
- a type name, currently the following types are supported
    - string
    - int
    - float
    - bool
- an optional max value, indicated by `<` and a number (the meaning of max depends on the type, see below)
- an optional min value, indicated by `>` and a number (the meaning of min depends on the type, see below)

The meaning of min and max depends on the type:

- `string` : maximal minimal (including) / (excluding) length of string
- `int`, `float`: minimal (including) / maximal (excluding) value of number
- `bool`, `email`: ignored


Here a few examples:

```javascript
// a required string with minimal length of 10 characters and maximal length of 64 characters:
{ firstName: '*string>10<65' }
// an optional integer with a maximal value of 100. Note: max is excluding the value
{ age: 'int<101' }
// an optional string of minimal length of 3 characters: Note: min is including the value
{ middleName: 'string>3' }
```
    