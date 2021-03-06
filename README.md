# Iceworm

A lightweight object validation and projection library.

## Quickstart

Install iceworm using npm:

```shell
npm install iceworm --save
``` 

Iceworm lets you quickly define schemas and validate objects against them. It also returns a projected version of the object (see below).

Here an example:

```javascript
const iceworm = require('iceworm');

// define the schema
let schema_definition = {
    firstName: '*string>3',
    userName: '*string>10<60',
    age: 'int>0',
    email: 'email'
}

// the object to be evaluated ... this could be a POST body, for instance
var obj = {
    firstName: "Martin",
    userName: "martianfield",
    email: "test@test.com"
}

// evaluate
var result = iceworm.evaluate(obj, schema_definition);

if(result.isValid) {
    console.dir(result.obj)
} 
else {
    result.errors.forEach((error) => {
        console.dir(error);
    });
}
```

## Schema Definition

A schema is defined through an object containing keys for fields and values for definitions:

```javascript
let schema = {
    <field_1>:<definition_1>,
    ...
    <field_n>:<definition_n>
}
```

The definition consist of

- `*` : indicator if the field is required ... if required, put an asterisk `*` at the beginning
- `-` : indicator if the field is projected ... if not projected, prefix with `-`
- `!` : indicator if the field's value should be unique. Note that iceworm ignores this when validating. The FieldInfo's property `unique` is set to true if this is set.
- a type name, currently the following types are supported
    - `string`
    - `int`
    - `float`
    - `bool`
    - `email`
- arrays are indicated by following the type name by `[]`
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
// a required string that is not projected
{ middleName: '*-string' }
// an optional integer with a maximal value of 100. Note: max is excluding the value
{ age: 'int<101' }
// an optional string of minimal length of 3 characters: Note: min is including the value
{ middleName: 'string>3' }
// an array of strings
{ tags: 'string[]' }
```
    

## Evaluation Result

The `evaluate(<obj>, <schema>)` function returns an object containing 

- the validation result (`true` or `false`)
- an array of validation errors (if any)
- a projected version of the object passed (see the note about Projection further down)


Here an example:

```json
{
    valid: true,
    errors: [
        { 
            field: 'age',
            errors: [
                { message: 'value is too small', reason: 'min' }
            ]
        }
    ],
    obj: {
        name: 'Amy Pond',
        age: 1,
        scottish: true
    }
```

A note on the errors array:

- each item has a `field` and an `errors` property
- the `field` property tells you what field caused the error (use this to indicate the corresponding UI element, for instance)
- the `errors` property contains yet another array of errors (a field may have more than one error). Each error at this level has
    - a `message` (this is mainly meant as a feedback for you, the developer)
    - a `reason` ... possible reasons are:
        - `'required'` - the value was required, but not provided
        - `'type'` - the value was not of the expected type (e.g. a non-numeric string in an int field)
        - `'min'` - the value did not fulfill the minimal length / amount criterion
        - `'max'` - the value did not fulfill the maximal length / amount criterion
        - `'format'` - the value was not formatted correctly (e.g. invalid email address)


## Validation

Validation can also be executed on its own:

```javascript
iceworm.validate(<obj>, <schema> [,<options>])
```

The optional options object supports the following fields:

- `ignoreRequired`: if set to true, the field will not cause a validation error if no value is provided. Default: `false`


## Projection

Calling `evaluate(<obj>,<schema>)` will return a result containing a projected version of the object you passed:

```javascript
let result = iceworm.project(obj, schema);
let projected = result.obj;
```

A projected version means that 

- possible type conversions have been executed. E.g. if your schema calls for a string but a number was supplied, the projected version is of type string
- hidden fields are not projected. E.g. if you have a field `'{'middleName':'-string'}` it will not be contained in the projected object


Notes:

- if the source object contains `null` or `undefined` values, the projected version makes no assumption about your use of those values. I.e. it will not change such values; it is up to you to decide what to do with them.
- the `int` and `float` types are projected to `undefined` if the provided value cannot be converted to a numeric value
- floating point values in an `int` field are floored
- projection of `email` fields only converts the given value into a string, since no more sensible patching can be done
- projection of array fields will return in an empty array if the supplied value is not an array


## Reusing and Caching Schemas

Instead of having iceworm recreate the schema each time you want to evaluate an object against it, you can use a re-usable schema object:

```javascript
let raw_schema = {
    name: '*string',
    age: 'int>0'
}
// create the schema using the static Schema.create() function
let schema1 = iceworm.Schema.create(raw_schema)
// or simply use the Schema constructor
let schema2 = new iceworm.Schema(raw_schema)
```

To evaluate an object you can then either 

- pass the schema object to the evaluate function
- use the evaluate method of the schema object:

```javascript
let result_1 = iceworm.evaluate(schema)
let result_2 = schema.evaluate()
```

Additionally, `Schema.create()` takes an additional, `<name>` parameter. If this parameter is supplied, the Schema is cached.

```javascript
let schema = iceworm.Schema.create(raw_schema, 'cat')
```

Cached schemas can be retrieved using the static method `iceworm.Schema.fromCache(<name>)` object. E.g.:

```javascript
let schema = iceworm.Schema.fromCache('cat')
```

Caching is also used when embedding documents (see below).


## Embedding Documents

NOT YET IMPLEMENTED


## Extensions

Extensions increase the number of supported types. One example is [iceworm-mongo](https://github.com/martianfield/iceworm-mongo) which extends Iceworm with a handful of MongoDB specific types.


### Using extensions

Each extension you use is assigned a namespace. To do so, use Iceworm's `extend(<namespace>, <extension>)` method. Make sure you have `iceworm-mongo` installed to follow the example:

```javascript
const iceworm_mongo = require('iceworm-mongo');
const iceworm = require('iceworm');

iceworm.use('mongo', iceworm_mongo);
```

We then use the namespace we assigned (in our example `'mongo'`) when defining our schema:

```javascript
// our schema has a standard field (no namespace) and a iceworm-mongo field (with namespace)
const schema = {
    name:'*string',
    city_id:'mongo.objectid'
}
```


## Roadmap

- nested documents
- document how to write extensions
- document `FieldInfo`