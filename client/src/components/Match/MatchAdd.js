import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputFeedback } from '../UI/';
import MatchEditor from './MatchEditor';

const MatchAdd = ({
  definition,
  definitionRef,
  disabled,
  maxMatches,
  onEditorChange,
  onEditorTouch,
  onNewMatch,
  term,
  termRef
}) => {
  return (
    <div id="rich-match-editor">
      <fieldset>
        <legend>Term</legend>
        <MatchEditor
          name="term"
          onChange={(value, field) => onEditorChange(value, field)}
          onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
          placeholder={term.placeholder}
          readOnly={disabled}
          ref={termRef}
          tabIndex={3}
          value={term.value}
        />
        <InputFeedback error={!term.touched ? term.error : null} />
      </fieldset>
      <fieldset>
        <legend>Definition</legend>
        <MatchEditor
          name="definition"
          onChange={(value, field) => onEditorChange(value, field)}
          onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
          placeholder={definition.placeholder}
          readOnly={disabled}
          ref={definitionRef}
          tabIndex={4}
          value={definition.value}
        />
        <InputFeedback error={!definition.touched ? definition.error : null} />
      </fieldset>
      <Button
        disabled={disabled || !term.dirty || !definition.dirty}
        floated="right"
        icon="plus"
        labelPosition="right"
        onClick={event => onNewMatch(event)}
        positive={!disabled && term.dirty && definition.dirty}
        size="tiny"
        tabIndex={5}
        title="Add to the Match Bank"
        type="button"
      >
        Add
      </Button>
    </div>
  );
};

MatchAdd.propTypes = {
  definition: PropTypes.object.isRequired,
  definitionRef: PropTypes.shape({ current: PropTypes.any }),
  disabled: PropTypes.bool,
  maxMatches: PropTypes.number.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  onEditorTouch: PropTypes.func.isRequired,
  onNewMatch: PropTypes.func.isRequired,
  term: PropTypes.object.isRequired,
  termRef: PropTypes.shape({ current: PropTypes.any })
};

export default MatchAdd;
