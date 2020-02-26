import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Segment } from 'semantic-ui-react';
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
    <Grid id="rich-match-editor">
      <Grid.Row>
        <Grid.Column>
          <Segment vertical basic>
            <Divider horizontal>Term</Divider>
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
          </Segment>
          <Segment vertical basic>
            <Divider horizontal>Definition</Divider>
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
            <InputFeedback
              error={!definition.touched ? definition.error : null}
            />
          </Segment>
          <Button
            disabled={disabled || !term.dirty || !definition.dirty}
            icon="plus"
            labelPosition="left"
            onClick={event => onNewMatch(event)}
            positive={!disabled && term.dirty && definition.dirty}
            tabIndex={5}
            title="Add to the Match Bank"
            type="button"
          >
            ADD
          </Button>
          <br />
          <br />
          <div className="match-tip">Maximum # of terms = {maxMatches}</div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
