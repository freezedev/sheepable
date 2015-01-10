var isObject = function(obj) {
  return typeof obj === 'object' && obj !== null;
};

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
  if (isObject(obj)) {
    var result = {};

    // TODO: Be more strict here!

    Object.keys(obj).forEach(function(propName) {
      result[propName] = valTo(obj[propName]);
    });

    return result;
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
  var args = [].slice.call(arguments);

  var obj = {};

  args.forEach(function(name) {
    var o = this.value[name];

    if (o instanceof Objector) {
      obj[name] = o.toJSON();
    } else {
      obj[name] = o.value;
    }
  }, this);

  return new Objector(obj);
};

Objector.prototype.change = function(property, value) {
  var obj = this.toJSON();

  obj[property] = value;

  return new Objector(obj);
};

var jsonify = function(obj) {
  var result = {};
  
  Object.keys(obj).forEach(function(name) {
    var o = obj[name];

    if (o instanceof Objector) {
      result[name] = jsonify(o.value);
    } else {
      result[name] = o.value;
    }
  });
  
  return result;
};

Objector.prototype.toJSON = function() {
  return jsonify(this.value);
};
