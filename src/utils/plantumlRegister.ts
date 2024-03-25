import { languageDef } from '@sinm/monaco-plantuml/src/monaco/hightlight';

// import { PUmlExtension } from '@sinm/monaco-plantuml';
// import PUmlWorker from '@sinm/monaco-plantuml/lib/puml.worker?worker';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const initMonaco = (ed: IStandaloneCodeEditor, monaco: any) => {
  // const worker = new PUmlWorker();
  // const extension = new PUmlExtension(worker);
  // const disposer = extension.active(ed);
  // // console.log(extension, disposer);
  // // disposer.dispose();
};

export const onBeforeMount = (monaco: any) => {
  monaco.languages.register({
    id: 'plantuml'
  });
  monaco.languages.setMonarchTokensProvider('plantuml', languageDef);

  monaco.editor.defineTheme('plantuml-theme', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'annotation', foreground: '#8b59c4', fontStyle: 'bold' },
      { token: 'keyword', foreground: '#2980b9', fontStyle: 'bold' },
      { token: 'identifier', foreground: '#16a085', fontStyle: 'bold' },
      { token: 'number', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'string', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'number.float', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'number.hex', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'brackets', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'delimiter', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'number.float', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'number.hex', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'brackets', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'delimiter', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'preprocessor', foreground: '#8e44ad', fontStyle: 'bold' }
    ],
    colors: {}
  });

  monaco.editor.defineTheme('plantuml-theme-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'annotation', foreground: '#8b59c4', fontStyle: 'bold' },
      { token: 'keyword', foreground: '#2980b9', fontStyle: 'bold' },
      { token: 'identifier', foreground: '#16a085', fontStyle: 'bold' },
      { token: 'number', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'string', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'number.float', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'number.hex', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'brackets', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'delimiter', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'number.float', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'number.hex', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'brackets', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'delimiter', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'preprocessor', foreground: '#8e44ad', fontStyle: 'bold' }
    ],
    colors: {}
  });

  // custom hover
  monaco.languages.registerHoverProvider('plantuml', {
    provideHover: function (model: any, position: any) {
      const word: any = model.getWordAtPosition(position);
      if (word) {
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn
        };
        return {
          range,
          contents: [{ value: '**' + word.word + '**' }]
        };
      }
      return {
        contents: []
      };
    }
  });
};

export default initMonaco;
