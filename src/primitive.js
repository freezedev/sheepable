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

Primitive.prototype.toString = function() {
  return this.value + '';
};

module.exports = Primitive;
