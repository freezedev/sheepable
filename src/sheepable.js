var Primitive = function(value) {
 Object.defineProperty(this, 'value', {
   value: value,
   enumerable: true
 });
};

Primitive.prototype.clone = function() {
  return new Primitive(this.value);
};

Primitive.prototype.change = function(val) {
  if (val != this.value) {
    return new Primitive(val);
  } else {
    return this.clone();
  }
};



var valTo = function(obj) {
  if (typeof obj === 'object' && obj !== null) {
    var retObj = {};

    // TODO: Be more strict here!

    Object.keys(obj).forEach(function(propName) {
      retObj[propName] = valTo(obj[propName]);
    });

    return retObj;
  } else {
    return new Primitive(obj);
  }
};

var Objector = function(value) {
  // TODO: This shouldn't be editable
  Object.defineProperty(this, 'value', {
    value: valTo(value),
    enumerable: true
  });
};

Objector.prototype.pick = function() {

};

Objector.prototype.change = function(property, name) {

};
