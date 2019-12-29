import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Grid, Segment, Tab } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button } from '../UI/';
import HtmlSerializer from './HtmlSerializer';
import { matchToString, parseMatch } from './utils';
import DisplayFormikState from '../UI/FormikHelper';

const itemsPerBoardOptions = [
  { text: '4', value: 4 },
  { text: '6', value: 6 },
  { text: '9', value: 9 }
];

const durationOptions = [
  { text: '10', value: 10 },
  { text: '60', value: 60 },
  { text: '90', value: 90 },
  { text: '120', value: 120 },
  { text: '180', value: 180 },
  { text: '240', value: 240 },
  { text: '300', value: 300 }
];

const colorSchemeOptions = [
  { text: 'Basic', value: 'Basic' },
  { text: 'Rainbow', value: 'Rainbow' }
];

/* eslint-disable no-template-curly-in-string */
const validateMatch = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short. ${min} characters are required.')
    .max(40, 'Title is too long. ${max} characters are allowed.')
    .required('Title is required.'),
  instructions: Yup.string().max(
    60,
    'Instructions are too long. ${max} characters are allowed.'
  ),
  itemsPerBoard: Yup.number()
    .integer()
    .positive()
    .required('Game Tiles is required.')
    .oneOf(
      itemsPerBoardOptions.map(i => i.value),
      'Pick a valid number of game tiles.'
    ),
  duration: Yup.number()
    .integer()
    .positive()
    .required('Duration is required.')
    .oneOf(
      durationOptions.map(i => i.value),
      'Pick a valid game duration.'
    ),
  colorScheme: Yup.string()
    .required('Color Scheme is required.')
    .oneOf(
      colorSchemeOptions.map(i => i.value),
      'Pick a valid color scheme.'
    ),
  matches: Yup.array().test({
    name: 'min-matches',
    params: {
      itemsPerBoard: Yup.ref('itemsPerBoard')
    },
    message: '${itemsPerBoard} matches required in bank.',
    test: function(value) {
      return value.length >= this.parent.itemsPerBoard;
    }
  })
});

const MATCH_TAB = 0;
const BULK_TAB = 1;
const GAME_OPTS_ACCORDION = 'gameOptions';
const GAME_DESC_ACCORDION = 'gameDescription';
const HAS_COMMA = RegExp('^(.?)+([,]+)(.?)+$');

// Use to track open/close state of accordions
const initialState = {
  accordion: {
    [GAME_OPTS_ACCORDION]: false, // Closed by default
    [GAME_DESC_ACCORDION]: true // Open by default
  },
  activePage: 1,
  activeTab: MATCH_TAB,
  definition: {
    placeholder: '',
    touched: false,
    value: HtmlSerializer.deserialize('')
  },
  dirty: {
    bulkMatches: false
  },
  itemsPerPage: 10,
  term: {
    placeholder: '',
    touched: false,
    value: HtmlSerializer.deserialize('')
  }
};

const MatchForm = props => {
  const [state, setState] = useState(initialState);

  const {
    accordion,
    activePage,
    activeTab,
    definition,
    dirty: { bulkMatches: isMatchDirty }
  } = state;

  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
      initialValues={{
        matchId: props.game.matchId || null,
        title: props.game.title || '',
        instructions: props.game.instructions || '',
        itemsPerBoard:
          (props.game.options && props.game.options.itemsPerBoard) || 9,
        duration: (props.game.options && props.game.options.duration) || 90,
        colorScheme:
          (props.game.options && props.game.options.colorScheme) || 'Basic',
        matches: props.game.matches || [],
        bulkMatches: matchToString(props.game.matches || [])
      }}
      onSubmit={async (values, actions) => {}}
      validationSchema={validateMatch}
    >
      {props => {
        const {
          dirty,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          setStatus,
          status,
          touched,
          values
        } = props;

        return (
          <Form id="match-form" onSubmit={handleSubmit}>
            <span id="match-id">
              {values.matchId ? values.matchId : 'UNPUBLISHED'}
            </span>
            <Grid columns={2} stackable>
              <Grid.Column computer={8} mobile={16} tablet={16}>
                <Segment>
                  <Form.Group inline>
                    <Button
                      active
                      as={Link}
                      disabled={isSubmitting}
                      icon="back"
                      labelPosition="left"
                      tabIndex={-1}
                      title="Back to Dashboard"
                      to={{ pathname: '/dashboard', state: { from: 'MATCH' } }}
                      type="button"
                    >
                      BACK
                    </Button>
                    <Button
                      active
                      disabled={isSubmitting}
                      icon="save"
                      labelPosition="left"
                      loading={isSubmitting}
                      positive={dirty && isValid && !isMatchDirty}
                      tabIndex={6}
                      title="Save Game"
                      type="submit"
                    >
                      SAVE
                    </Button>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid>
            <div>{<DisplayFormikState {...props} />}</div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MatchForm;
