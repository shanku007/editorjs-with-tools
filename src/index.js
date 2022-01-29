import EditorJS from '@editorjs/editorjs';
import getToolConfig from './editor/tools';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import './index.scss';

class Editor {
  constructor(data, el, onPlayClick, fileUploader, onRecordClick, tools, otherConfig) {
    this.config = getToolConfig(
      data,
      el,
      onPlayClick,
      fileUploader,
      onRecordClick,
      tools,
      otherConfig,
    );
    console.log(this.config);
    this.editor = null;
  }

  init() {
    this.editor = new EditorJS({
      ...this.config,
    });
    return this.editor;
  }
}
export { Editor, DragDrop, Undo, getToolConfig };
export default Editor;
