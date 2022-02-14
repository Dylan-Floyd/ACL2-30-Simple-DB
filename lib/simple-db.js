const { writeFile, readFile, readdir, rm } = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

class SimpleDb {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  async save(obj) {
    obj.id = nanoid();
    return await this.writeToId(obj.id, obj);
  }

  async get(id) {
    return await this.readJsonFile(`${id}.json`);
  }

  async readJsonFile(fileName) {
    const filePath = path.join(this.rootDir, fileName);
    try {
      const file = await readFile(filePath, 'utf8');
      return JSON.parse(file);
    } catch(e) {
      if(e.code === 'ENOENT') return null;
      throw e;
    }
  }

  async getAll() {
    const files = await readdir(this.rootDir);
    return await Promise.all(files.map(file => this.readJsonFile(file)));
  }

  async remove(id) {
    return await rm(this.getObjectpath(id), { force: true });
  }

  async writeToId(id, obj) {
    return await writeFile(this.getObjectpath(id), JSON.stringify(obj));
  }

  async update(id, newObj) {
    newObj.id = id;
    return await this.writeToId(id, newObj);
  }

  getObjectpath(id) {
    return path.join(this.rootDir, `${id}.json`);
  }
}

module.exports = SimpleDb;
