import React from 'react';
// eslint-disable-next-line
import { Grid, Divider } from 'semantic-ui-react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MatchEditor from './MatchEditor';
import InputFeedback from '../UI/InputFeedback';
import Button from '../UI/Button';

const MatchExpert = ({
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
          <InputFeedback error={!term.touched ? term.error : null} />
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
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Divider horizontal>Definition</Divider>
          <InputFeedback
            error={!definition.touched ? definition.error : null}
          />
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
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button
            title="Add to the Match Bank"
            icon="plus"
            positive={term.touched && definition.touched}
            type="button"
            active={term.touched && definition.touched}
            tabIndex={5}
            disabled={disabled}
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

MatchExpert.propTypes = {
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

export default MatchExpert;
