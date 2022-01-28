import EditorJS from '@editorjs/editorjs';
import getToolConfig from './tools';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';

class Editor {
  constructor(el, data, onPlayClick, tools, otherConfig) {
    this.config = getToolConfig(data, el, onPlayClick, tools, otherConfig);
    this.editor = null;
    console.log('Editor constructor', this.config);
  }

  init() {
    this.editor = new EditorJS({
      ...this.config,
    });
    return this.editor;
  }
}
export { Editor, DragDrop, Undo };
export default Editor;
