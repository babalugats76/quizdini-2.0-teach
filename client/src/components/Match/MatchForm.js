import React from 'react';
import { Formik } from 'formik';
import { Form } from 'semantic-ui-react';
import * as Yup from 'yup';
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

const MatchForm = props => {
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
            <div>{<DisplayFormikState {...props} />}</div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MatchForm;
