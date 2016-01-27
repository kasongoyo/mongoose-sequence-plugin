# Mongoose Sequence Plugin
#### Auto increment any alphanumeric mongoose schema field
Mongoose plugin to auto-increment any alphanumeric schema field     
It only need to be told about the field and value to start with       
then it will increment the field value up to it's highest value.   

Unique formatted sequence value generator for mongoose schema field. 

## Guide
- [Install](#installation)
- [Usage](#usage)
- [Example](#example)



## Installation

```sh
$ npm install --save mongoose-sequence-plugin
```

## Usage
Require the id-generator-plugin into schema file and plugin it.   

```
var sequenceGenerator = require('mongoose-sequence-plugin');
Schema.plugin(sequenceGenerator, options);
```


### Configuration
The plugin accept configuration as second parameter of the `Schema.plugin` called options. Options include the followings properties;    

- options.field(Optional)  
This options specify the field name that need to be autoincremented. Field can be predefined in the schema or not. Default is 'sequence'      

- options.startAt(Optional)   
This serve two things. It speficy the initial id as well as the format of the value to be incremented.    

-options.prefix(Optional)  
Specify this to prefix your field to increment.  

- options.suffix(Optional)
Specify this to suffix your field to increment.

- options.maxSaveRetries    
Internal this plugin save the instance optimistically with default retry count of 1000, by defined this option then you're overriding default retry counter.    

## Example

```
var sequenceGenerator = require('mongoose-sequence-plugin');

//sample schema
var SampleSchema = new Schema({
    name: {
        type: String
    }
});

//activate id generator plugin
SampleSchema.plugin(sequenceGenerator, {
    field: 'code',
    startAt: '99-ZX',
    prefix: 'MNH-',
    maxSaveRetries: 2
});
```

## Sample output;
```
99-ZX,
99-ZY,
99-ZZ
```

