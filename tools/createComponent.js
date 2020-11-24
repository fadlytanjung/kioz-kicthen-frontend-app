import { mkdirSync, readFileSync, writeFile } from 'fs';
import path from 'path';

const baseDir = path.resolve(__dirname, '../src');
const typeList = ['pages', 'elements', 'forms', 'layouts'];
const namePattern = /^[A-Za-z0-9\_\-]+$/;
const type = process.argv[2] || '';
const name = process.argv[3] || '';

class CreateComponent {
  constructor() {
    this.type = type.toLowerCase();
    this.name = name;
    this.componentPath = '';
  }
  
  _callback() {
    return err => {
      if (err) throw new Error(err);
    };
  }

  _checkArguments() {
    const { type, name } = this;

    if (typeList.indexOf(type) == -1) {
      throw new Error('Type should be pages/elements/forms/layouts');
    }

    if (!namePattern.test(name)) {
      throw new Error('Name should be include alphanumeric, -, or _ only');
    }
  }

  _createFileItem(fileName, exampleName) {
    const { componentPath } = this;
    const filePath = path.resolve(componentPath, `./${fileName}`);
    const examplePath = path.resolve(__dirname, `./examples/${exampleName}`);
    const data = readFileSync(examplePath);

    writeFile(filePath, data, this._callback());
  }

  _createFiles() {
    const { type } = this;

    if (type == 'elements' || type == 'layouts') {
      this._createFileItem('index.js', 'index.js');
      this._createFileItem('component.js', 'component.js');
      this._createFileItem('styles.css', 'styles.css');
    } else if (type == 'forms') {
      this._createFileItem('index.js', 'index-form.js');
      this._createFileItem('component.js', 'component-form.js');
      this._createFileItem('styles.css', 'styles.css');
      this._createFileItem('validate.js', 'validate.js');
    } else if (type == 'pages') {
      this._createFileItem('index.js', 'index-redux.js');
      this._createFileItem('component.js', 'component.js');
      this._createFileItem('styles.css', 'styles.css');
      this._createFileItem('action.js', 'action.js');
      this._createFileItem('reducer.js', 'reducer.js');
    }
  }

  _createFolder(typePath) {
    const { name } = this;
    const componentPath = path.resolve(typePath, `./${name}`);
    
    mkdirSync(componentPath);
    return componentPath;
  }

  _resolvePath() {
    const { type } = this;

    if (type == 'pages') {
      return path.resolve(baseDir, './pages');
    }

    return path.resolve(baseDir, `./components/${type}`);
  }

  run() {
    this._checkArguments();
    const typePath = this._resolvePath();
    this.componentPath = this._createFolder(typePath);
    this._createFiles();
  }
}

const createComponent = new CreateComponent();
createComponent.run();