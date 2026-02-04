function createLookupObject(arrayOfObjects, newObjectKey, newObjectValue) {
  const lookupObj = {};

  for (let i = 0; i < arrayOfObjects.length; i++) {
    const keyToAdd = arrayOfObjects[i][newObjectKey];
    const valToAdd = arrayOfObjects[i][newObjectValue];
    lookupObj[keyToAdd] = valToAdd;
  }

  return lookupObj;
}

module.exports = createLookupObject;
