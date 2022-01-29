import Header from '@editorjs/header';
import TimeStampImage from '../plugins/TimeStampImage';
import Warning from '@editorjs/warning';
import Alert from 'editorjs-alert';
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Table from 'editorjs-table';
import CodeBox from '@bomdi/codebox';
import Marker from '@editorjs/marker';
import InlineTool from '@editorjs/inline-code';
import Tooltip from 'editorjs-tooltip';
import Underline from '@editorjs/underline';
import VideoPlayer from '../plugins/video';
import RecordPlaceHolder from '../plugins/record-placeholder';

const getToolConfig = (
  data,
  el,
  onPlayClick,
  fileUploader,
  onRecordClick,
  tools,
  otherConfig,
) => {
  console.log('getToolConfig', data, el, onPlayClick, tools, otherConfig);
  const config = {
    time: new Date().getTime(),
    /**
     * Id of Element that should contain the Editor
     */
    holder: el,

    autofocus: false,

    data: data,

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
      ...tools,
      image: {
        class: TimeStampImage,
        shortcut: 'CMD+SHIFT+I',
        config: {
          onPlayClick,
          fileUploader,
        },
      },
      header: {
        class: Header,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+H',
        config: {
          levels: [1, 2, 3, 4, 5, 6],
          defaultLevel: 3,
        },
      },
      warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
          titlePlaceholder: 'Title',
          messagePlaceholder: 'Message',
        },
      },
      list: {
        class: NestedList,
        inlineToolbar: true,
      },
      alert: {
        class: Alert,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+A',
        config: {
          defaultType: 'primary',
        },
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true,
          },
        },
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      codebox: {
        class: CodeBox,
      },
      marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      tooltip: {
        class: Tooltip,
        shortcut: 'CMD+SHIFT+T',
        config: {
          holder: el,
        },
      },
      underline: {
        class: Underline,
        shortcut: 'CMD+SHIFT+U',
        config: {
          holder: el,
        },
      },
      inlineCode: {
        class: InlineTool,
        shortcut: 'CMD+SHIFT+C',
      },
      video: {
        class: VideoPlayer,
        config: {
          fileUploader,
        },
      },
      recordPlaceHolder: {
        class: RecordPlaceHolder,
        config: {
          onRecordClick,
        },
      },

      // ...
    },
    ...otherConfig,
  };
  return config;
};

export default getToolConfig;
