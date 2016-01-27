## Id Generator Plugin
Mongoose plugin to auto-increment any alphanumeric schema field     
It only need to be told about the field and value to start with       
then it will increment the field value to the final number and leave        
it constant.

Unique formatted sequence value generator for mongoose schema field. 

## Guide
- [Install](#installation)
- [Usage](#usage)
- [Example](#example)



## Installation

```sh
$ npm install --save id-generator-plugin
```

## Usage
Require the id-generator-plugin into schema file and plugin it.   

```
var IdAutoGenerator = require('id-generator-plugin');
Schema.plugin(IdAutoGenerator, options);
```

### Configuration
The plugin accept configuration as second parameter of the `Schema.plugin` called options. Options object must be specified for the plugin to work, options include the followings properties;    
- options.field  
This is mandatory options, it specify the field name that will be used as id.      
- options.startAt   
This serve two things. It speficy the initial id as well as the format of the value to be incremented.    

-options.prefix(Optional)  
Specify this to prefix your field to increment.  

- options.suffix(Optional)
Specify this to suffix your field to increment. 

## Example

```
var IdAutoGenerator = require('id-generator-plugin');

//sample schema
var SampleSchema = new Schema({
    name: {
        type: String
    }
});

//activate id generator plugin
SampleSchema.plugin(idAutoGenerator, {
    field: 'code',
    startAt: '99-ZX',
});
```



