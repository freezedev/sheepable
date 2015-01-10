var isObject = function(obj) {
  return typeof obj === 'object' && obj !== null;
};

var valTo = function(obj) {
  if (isObject(obj)) {
    var result = {};

    // TODO: Be more strict here!

    Object.keys(obj).forEach(function(propName) {
      result[propName] = new SObject(obj[propName]);
    });

    return result;
  } else {
    return new Primitive(obj);
  }
};

var SObject = function(value) {


  // TODO: This shouldn't be editable
  Object.defineProperty(this, 'value', {
    value: valTo(value),
    enumerable: true
  });
};

SObject.prototype.clone = function() {
  return new SObject(this.toJSON());
};

SObject.prototype.pick = function() {
  var args = [].slice.call(arguments);

  var obj = {};

  args.forEach(function(name) {
    var o = this.value[name];

    if (o instanceof SObject) {
      obj[name] = o.toJSON();
    } else {
      obj[name] = o.value;
    }
  }, this);

  return new SObject(obj);
};

SObject.prototype.change = function(property, value) {
  var obj = this.toJSON();

  obj[property] = value;

  return new SObject(obj);
};

var jsonify = function(obj) {
  var result = {};

  Object.keys(obj).forEach(function(name) {
    var o = obj[name];

    if (o instanceof SObject) {
      result[name] = jsonify(o.value);
    } else {
      result[name] = o.value;
    }
  });

  return result;
};

SObject.prototype.toJSON = function() {
  return jsonify(this.value);
};
