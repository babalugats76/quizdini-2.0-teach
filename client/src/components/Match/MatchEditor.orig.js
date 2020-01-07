import React, { Component } from 'react';
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

class MatchEditor extends Component {
  /* Used to reference instance of Editor component */
  setRefs = element => {
    this.editor = element;
    this.props.forwardedRef.current = element;
  };

  /**
   * Renders a mark (used for formatting) with props
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {function} next Callback function (if no custom action to take)
   * @return {Element}
   */
  renderMark(props, editor, next) {
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
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */
  onKeyDown = (event, editor, next) => {
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
      this.onClearFormatting(event);
    } else if (isPi(event)) {
      event.preventDefault();
      this.onClickCharacter(event, 'pi');
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
  onClickMark = (event, type) => {
    event.preventDefault();
    const editor = this.editor;
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
  onClearFormatting = event => {
    event.preventDefault();
    const editor = this.editor;
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
  onClickCharacter = (event, character) => {
    event.preventDefault();
    const editor = this.editor;
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
  onFocus = (event, editor, next, field) => {
    event.preventDefault();
    const { onEditorTouch } = this.props;
    setTimeout(() => {
      onEditorTouch(field, true);
    }, 250);
    next();
  };

  render() {
    const {
      name,
      placeholder,
      value,
      tabIndex,
      onChange,
      readOnly
    } = this.props;

    /* Tooltip buttons the formatting toolbar will have */
    const buttons = [
      {
        icon: 'underline',
        tooltip: 'Underline',
        onClick: event => this.onClickMark(event, 'underline')
      },
      {
        icon: 'code',
        tooltip: 'Code',
        onClick: event => this.onClickMark(event, 'code')
      },
      {
        icon: 'superscript',
        tooltip: 'Superscript',
        onClick: event => this.onClickMark(event, 'superscript')
      },
      {
        icon: 'subscript',
        tooltip: 'Subscript',
        onClick: event => this.onClickMark(event, 'subscript')
      },
      {
        icon: 'clear',
        tooltip: 'Clear Formatting',
        onClick: event => this.onClearFormatting(event)
      },
      {
        icon: 'pi',
        tooltip: 'Insert pi symbol',
        onClick: event => this.onClickCharacter(event, 'pi')
      }
    ];

    return (
      <div id="match-editor">
        <Editor
          name={name}
          autoFocus={false}
          tabIndex={tabIndex}
          readOnly={readOnly}
          schema={schema}
          spellCheck={false}
          className="rich-text-editor"
          placeholder={placeholder}
          ref={this.setRefs}
          value={value}
          onFocus={(event, editor, next, field) =>
            this.onFocus(event, editor, next, name)
          }
          onChange={(value, field) => onChange(value, name)}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
        <Toolbar buttons={buttons} className="format-toolbar" />
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <MatchEditor forwardedRef={ref} {...props} />
));
