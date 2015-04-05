# sheepable
When modifying a value, return a clone. Doesn't modify the reference.

## Philosophy
* When you change a value, always return a new instance
* Very Small (less than 3kb)
* Low-level (provides primitives, objects and arrays)

## How is it different from immutable-js?
immutable-js provides high-level classes like Map, List, etc. Sheepable provides more low-level access.

## Changing a value
Any Sheepable instance has a `change` method to change a value:

```javascript
var pri = new Sheepable.Primitive('hello');
console.log(pri.value); //< "hello"
var newPri = pri.change('goodbye');
console.log(newPri.value); //< "goodbye"
console.log(pri.value); //< "hello"
```
