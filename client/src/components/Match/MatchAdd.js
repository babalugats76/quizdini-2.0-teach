import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid } from 'semantic-ui-react';
import { Button, InputFeedback } from "../UI/";
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
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Divider horizontal>Term</Divider>
          <MatchEditor
            name="term"
            ref={termRef}
            value={term.value}
            tabIndex={3}
            placeholder={term.placeholder}
            readOnly={disabled}
            onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
            onChange={(value, field) => onEditorChange(value, field)}
          />
          <InputFeedback error={!term.touched ? term.error : null} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Divider horizontal>Definition</Divider>
          <MatchEditor
            name="definition"
            ref={definitionRef}
            value={definition.value}
            tabIndex={4}
            placeholder={definition.placeholder}
            readOnly={disabled}
            onEditorTouch={(field, touched) => onEditorTouch(field, touched)}
            onChange={(value, field) => onEditorChange(value, field)}
          />
          <InputFeedback
            error={!definition.touched ? definition.error : null}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button
            title="Add to the Match Bank"
            icon="plus"
            positive={!disabled && term.dirty && definition.dirty}
            type="button"
            tabIndex={5}
            disabled={disabled || !term.dirty || !definition.dirty }
            onClick={event => onNewMatch(event)}
            labelPosition="left"
          >
            ADD
          </Button>
          <br/>
          <br/>
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
