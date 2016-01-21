## Id Generator Plugin
Mongoose plugin to auto-increment any alphanumeric schema field     
It only need to be told about the field and value to start with       
then it will increment the field value to the final number and leave        
it constant.

## Guide
- [Prerequisite](#prerequisite)
- [Install](#installation)
- [Usage](#usage)
- [Example](#example)




## Prerequisite
To have this plugin work on your application, you have to create model **(IdGeneratorModel)** that will keep
track of the highest id and act as lookup table for all field used by plugin. Name that model anyname you like but make sure you register it into mongoose before you register any other model that utilize this plugin.

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
The plugin accept second parameter which is the options object. Options must be specified for the plugin to work, options include the followings properties;    
- options.field  
This refer to schema field that you want to be incremented. It complusory options.      
- options.idName  
This must be unique with respect to the application. It is the name that will uniquely identify the field and its value at any given time in generator schema. It complusory options.        
- options.startAt   
This serve two things. It speficy the initial id as well as the format of the value to be incremented.    

## Example

```
var IdAutoGenerator = require('id-generator-plugin');

//sample schema
var SampleSchema = new Schema({
    name: {
        type: String
    },
    //field to auto-increment
    code: {
        type: String
    }
});

//activate id generator plugin
SampleSchema.plugin(idAutoGenerator, {
    field: 'code',
    idName: 'SAMPLE_CODE',
    startAt: '99-ZX',
    generatorModel: GeneratorModel
});
```



