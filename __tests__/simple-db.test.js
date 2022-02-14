const { rm, mkdir, readdir } = require('fs/promises');
const SimpleDb = require('../lib/simple-db.js');

describe('simple database', () => {
  const rootDir = './store/';

  const clearStore = () => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  };

  beforeEach(clearStore);
  afterEach(clearStore);

  test('SimpleDb can save and get an object', () => {
    const obj = {
      abc: 123,
      bob: 'bobbert'
    };
    const expected = Object.assign({
      id: expect.any(String)
    }, obj);

    const simpleDb = new SimpleDb(rootDir);
    return simpleDb.save(obj)
      .then(() => simpleDb.get(obj.id))
      .then(actual => expect(actual).toEqual(expected));
  });

  test('SimpleDb can getAll saved objects', () => {
    const obj1 = {
      abc: 123,
      bob: 'bobbert'
    };

    const obj2 = {
      abc: 123,
      bob: 'bobbert'
    };

    const simpleDb = new SimpleDb(rootDir);
    return simpleDb.save(obj1)
      .then(() => simpleDb.save(obj2))
      .then(() => simpleDb.getAll())
      .then(actual => expect(actual).toEqual(expect.arrayContaining([obj1, obj2])));
  });

  test('SimpleDb can remove an object', () => {
    const obj = {
      abc: 123,
      bob: 'bobbert'
    };

    const simpleDb = new SimpleDb(rootDir);
    return simpleDb.save(obj)
      .then(() => simpleDb.remove(obj.id))
      .then(() => readdir(rootDir))
      .then(files => expect(files).not.toEqual(expect.arrayContaining([`${obj.id}.json`])));
  });

  test('SimpleDb can update an object', () => {
    const obj1 = {
      abc: 123,
      bob: 'bobbert'
    };

    const obj2 = {
      abc: 123,
      bob: 'rob'
    };

    const expected = {
     id: expect.any(String),
     ...obj2 
    };

    const simpleDb = new SimpleDb(rootDir);
    return simpleDb.save(obj1)
      .then(() => simpleDb.update(obj1.id, obj2))
      .then(() => simpleDb.get(obj1.id))
      .then(actual => expect(actual).toEqual(expected));
  });

  test('SimpleDb returns null when getting a non-existent object', () => {
    const simpleDb = new SimpleDb(rootDir);
    return simpleDb.get('bob')
      .then(actual => expect(actual).toEqual(null));
  });

});
