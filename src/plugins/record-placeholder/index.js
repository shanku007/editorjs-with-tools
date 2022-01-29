/**
 * Build styles
 */
import './index.scss';

/**
 * RecordPlaceHolder Tool for the Editor.js
 *
 * @typedef {object} RecordPlaceHolder
 */
class RecordPlaceHolder {
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: SimpleImageData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({ data, config, api, block }) {
    /**
     * Editor.js API
     */
    this.api = api;

    /**
     * When block is only constructing,
     * current block points to previous block.
     * So real block index will be +1 after rendering
     * @todo place it at the `rendered` event hook to get real block index without +1;
     * @type {number}
     */
    this.block = block;

    /**
     * Styles
     */
    this.CSS = {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-record-placeholder',
      buttonWrap: 'cdx-record-placeholder__button-wrap',
      label: 'cdx-record-placeholder__label',
      button: 'cdx-record-placeholder__button',
    };

    /**
     * Nodes cache
     */
    this.nodes = {
      wrapper: null,
      buttonWrap: null,
      label: null,
      button: null,
    };

    /**
     * Tool's initial data
     */
    this.data = {};

    this.config = config || {};
  }

  /**
   * @public
   * Saving method
   * @param {Element} blockContent - Tool's wrapper
   * @return {SimpleImageData}
   */
  save(blockContent) {
    return Object.assign(this.data, {});
  }

  getBlockHolder() {
    return this.block.holder;
  }

  static get toolbox() {
    return {
      title: 'Record',
      icon: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.526 6.15A1 1 0 0 1 21 7v10a1 1 0 0 1-1.447.894l-6-3A1 1 0 0 1 13 14v-4a1 1 0 0 1 .553-.894l6-3a1 1 0 0 1 .973.043zM15 10.617v2.764l4 2V8.618l-4 2z" fill="#000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9zm3-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H6z" fill="#000"/></svg>',
    };
  }

  /**
   * Creates a Block:
   *  0) Show a button if there is no image
   *  1) Show preloader
   *  2) Start to load an image
   *  3) After loading, append image and caption input
   * @public
   */
  render() {
    this.nodes.wrapper = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    this.nodes.buttonWrap = this._make('div', [this.CSS.buttonWrap], {});
    this.nodes.button = this._make('button', [this.CSS.button], {
      innerHTML:
        '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.526 6.15A1 1 0 0 1 21 7v10a1 1 0 0 1-1.447.894l-6-3A1 1 0 0 1 13 14v-4a1 1 0 0 1 .553-.894l6-3a1 1 0 0 1 .973.043zM15 10.617v2.764l4 2V8.618l-4 2z" fill="#000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9zm3-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H6z" fill="#000"/></svg>',
    });
    this.nodes.label = this._make('label', [this.CSS.label], {
      innerHTML: 'Click the button to record',
    });

    this.nodes.wrapper.appendChild(this.nodes.buttonWrap);
    this.nodes.buttonWrap.appendChild(this.nodes.button);
    this.nodes.wrapper.appendChild(this.nodes.label);
    this.nodes.button.addEventListener('click', () => {
      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      this.config.onRecordClick(currentBlockIndex);
    });
    return this.nodes.wrapper;
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @return {Element}
   */
  _make(tagName, classNames = null, attributes = {}, internalAtrributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }
    for (let attrName in internalAtrributes) {
      el.setAttribute(attrName, internalAtrributes[attrName]);
    }

    return el;
  }
}

export default RecordPlaceHolder;
