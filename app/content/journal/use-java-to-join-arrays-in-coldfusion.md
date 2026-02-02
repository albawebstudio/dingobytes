---
title: Use Java to Join Arrays In ColdFusion
description: The difference between joining and appending arrays in ColdFusion is explored, demonstrating how to utilize Java methods to effectively join arrays within a custom hasRegistration() method that processes objects or structs and returns an array of registrations.
last_updated_at: 2013-06-11T21:27:00
categories:
  - coldfusion
backgroundImage: /img/code/mergeSign.png
---

Occasionally I forget that joining to arrays is different from appending an array to an array which leads to some real funky results.

Of course, ColdFusion does not have a real cute method to join to arrays, but never fear, Java does!

I will use the following as an example. I am trying to create an abstract method called hasRegistration() to return an array of registrations. The method accepts any argument but will only process an object or struct. The method uses one of two other methods (which all we need to know right now is that they return an array), either hasRegistrationObj() or hasRegistrationStruct(). Returning an empty array is totally acceptable in any case. Here is how I would use the Java method to join to arrays.

```
/**
 * @returnType array
 * @hint "return array of registrations"
*/
public function hasRegistration( required any rc ) {
    registration = [];
    if( isObject(arguments.rc) ) {
        registration.addAll(hasRegistrationObj(arguments.rc));
    }
    else {
        registration.addAll(hasRegistrationStruct(arguments.rc));
    }
    return registration;
}
```

That should do it. If the argument passed is neither an object nor struct, we return an empty array. Otherwise, we join the array returned from one of the other two methods.
