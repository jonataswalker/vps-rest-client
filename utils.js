/**
 * Overwrites obj1's values with obj2's and adds obj2's if
 * non existent in obj1
 * @returns obj3 a new object based on obj1 and obj2
 */
function mergeOptions(obj1, obj2) {
  var obj3 = {};
  for (var attr1 in obj1) { obj3[attr1] = obj1[attr1]; }
  for (var attr2 in obj2) { obj3[attr2] = obj2[attr2]; }
  return obj3;
}

function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    throw new Error(message);
  }
}

function isDefAndNotNull(val) {
  // Note that undefined == null.
  return val != null;
}

function typeOf(obj){
  return ({}).toString.call(obj)
    .match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

module.exports = {
  mergeOptions: mergeOptions,
  isDefAndNotNull: isDefAndNotNull,
  typeOf: typeOf,
  assert: assert
};