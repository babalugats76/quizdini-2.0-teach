import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import Toolbar from '../UI/Toolbar';

const schema = {
  document: {
    nodes: [
      {
        match: { type: 'paragraph' },
        min: 1,
        max: 1
      }
    ]
  },
  blocks: {
    paragraph: {
      marks: [
        { type: 'underline' },
        { type: 'code' },
        { type: 'superscript' },
        { type: 'subscript' }
      ],
      nodes: [{ match: { object: 'text' } }]
    }
  }
};

const MatchEditor = props => {
  const [editor, setEditor] = useState(null);

  const {
    forwardedRef,
    name,
    onChange,
    onEditorTouch,
    placeholder,
    readOnly,
    tabIndex,
    value
  } = props;

  /* Used to reference instance of Editor component */
  const setRefs = element => {
    setEditor(element);
    forwardedRef.current = element;
  };

  /**
   * Renders a mark (used for formatting) with props
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {function} next Callback function (if no custom action to take)
   * @return {Element}
   */
  const renderMark = (props, editor, next) => {
    const { attributes, children, mark } = props;

    switch (mark.type) {
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'underline':
        return <u {...attributes}>{children}</u>;
      case 'superscript':
        return <sup {...attributes}>{children}</sup>;
      case 'subscript':
        return <sub {...attributes}>{children}</sub>;
      default:
        return next();
    }
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */
  const onKeyDown = (event, editor, next) => {
    const isUnderline = isKeyHotkey('mod+u');
    const isCode = isKeyHotkey('mod+`');
    const isSuperscript = isKeyHotkey('mod+ArrowUp');
    const isSubscript = isKeyHotkey('mod+ArrowDown');
    const isClearFormatting = isKeyHotkey('mod+space');
    const isPi = event => {
      return isKeyHotkey('alt+p', event) || isKeyHotkey('opt+p', event);
    };

    if (isUnderline(event)) {
      event.preventDefault();
      editor.toggleMark('underline');
    } else if (isCode(event)) {
      event.preventDefault();
      editor.toggleMark('code');
    } else if (isSuperscript(event)) {
      event.preventDefault();
      editor.toggleMark('superscript');
    } else if (isSubscript(event)) {
      event.preventDefault();
      editor.toggleMark('subscript');
    } else if (isClearFormatting(event)) {
      event.preventDefault();
      onClearFormatting(event);
    } else if (isPi(event)) {
      event.preventDefault();
      onClickCharacter(event, 'pi');
    } else {
      return next();
    }
  };

  /**
   * Generic event handler to attach to mark buttons
   *
   * @param {Event} event
   * @param {String} type  Type of mark (formatting) to apply, e.g., underline
   */
  const onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = editor;
    const originalSelection = value.selection;
    editor.toggleMark(type);
    editor.onChange(editor.select(originalSelection));
  };

  /**
   * Event handler for clear formatting tooltip
   * Prevent default -> Find active marks -> remove -> focus
   *
   * @param {Event} event
   */
  const onClearFormatting = event => {
    event.preventDefault();
    const { value } = editor;
    const originalSelection = value.selection;

    /* Remove existing marks */
    if (value.marks.size) {
      value.marks.forEach(mark => {
        editor.removeMark(mark);
      });
    }

    editor.onChange(editor.select(originalSelection));
  };

  /**
   * Event handler for inserting special characters tooltip
   * Prevent default -> Determine char -> insert char -> flush changes
   *
   * @param {Event} event
   */
  const onClickCharacter = (event, character) => {
    event.preventDefault();
    const { value } = editor;
    const originalSelection = value.selection;

    let char;

    switch (character) {
      case 'pi':
        char = '\u03C0';
        break;
      default:
        return;
    }

    editor.insertText(char);
    editor.onChange(editor.select(originalSelection));
  };

  /**
   * Implement slate's onFocus event handler
   * Asynchronously call passed in onEditorTouch function
   * This let's formik know that the field has been touched
   * If not done asynchronously, focus is screwed up
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Function} next
   * @param {String} field Name of form element to mark touched
   */
  const onFocus = (event, editor, next, field) => {
    event.preventDefault();
    setTimeout(() => {
      onEditorTouch(field, true);
    }, 250);
    next();
  };

  /* Tooltip buttons the formatting toolbar will have */
  const buttons = [
    {
      icon: 'underline',
      tooltip: 'Underline',
      onClick: event => onClickMark(event, 'underline')
    },
    {
      icon: 'code',
      tooltip: 'Code',
      onClick: event => onClickMark(event, 'code')
    },
    {
      icon: 'superscript',
      tooltip: 'Superscript',
      onClick: event => onClickMark(event, 'superscript')
    },
    {
      icon: 'subscript',
      tooltip: 'Subscript',
      onClick: event => onClickMark(event, 'subscript')
    },
    {
      icon: 'clear',
      tooltip: 'Clear Formatting',
      onClick: event => onClearFormatting(event)
    },
    {
      icon: 'pi',
      tooltip: 'Insert pi symbol',
      onClick: event => onClickCharacter(event, 'pi')
    }
  ];

  return (
    <div className="match-editor">
      <Editor
        name={name}
        autoFocus={false}
        tabIndex={tabIndex}
        readOnly={readOnly}
        schema={schema}
        spellCheck={false}
        className="rich-text-editor"
        placeholder={placeholder}
        ref={setRefs}
        value={value}
        onFocus={(event, editor, next, field) =>
          onFocus(event, editor, next, name)
        }
        onChange={(value, field) => onChange(value, name)}
        onKeyDown={onKeyDown}
        renderMark={renderMark}
      />
      <Toolbar buttons={buttons} className="format-toolbar" />
    </div>
  );
};

export default React.forwardRef((props, ref) => (
  <MatchEditor forwardedRef={ref} {...props} />
));
