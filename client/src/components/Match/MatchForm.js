import React, { Component } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { matchToString, parseMatch } from './utils';
import Button from '../UI/Button';
import InputText from '../UI/InputText';
import IconDropdown from '../UI/IconDropdown';
import Message from '../UI/Message';
import HtmlSerializer from './HtmlSerializer';
import MatchExpert from './MatchExpert';
import MatchBulk from './MatchBulk';
import MatchTable from './MatchTable';

/* Used to debug behind-the-scenes Formik state, etc. */
import DisplayFormikState from '../UI/FormikHelper';

// eslint-disable-next-line
import { Grid, Tab, Divider, Segment, Form } from 'semantic-ui-react';
import { Accordion } from '../UI/Accordion';

/* eslint-disable no-template-curly-in-string */
const transformMatch = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short. ${min} characters are required.')
    .max(40, 'Title is too long. ${max} characters are allowed.')
    .required('Title is required.')
    .default(''),
  instructions: Yup.string()
    .max(60, 'Instructions are too long. ${max} characters are allowed.')
    .default(''),
  options: Yup.object({
    itemsPerBoard: Yup.number()
      .integer()
      .positive()
      .required('Game Tiles is required.')
      .oneOf([4, 6, 9], 'Game may contain 4, 6, or 9 tiles.')
      .default(9),
    duration: Yup.number()
      .integer()
      .positive()
      .required('Duration is required.')
      .min(10, 'Games must last at least ${min} seconds.')
      .max(300, 'Game may last no more than ${max} seconds.')
      .default(180),
    colorScheme: Yup.string()
      .required('Color Scheme is required.')
      .oneOf(['mono', 'rainbow'], "Color Scheme must be 'mono' or 'rainbow'.")
      .default('mono')
  }),
  matches: Yup.array()
    .required('Matches are required.')
    .default(() => [])
});

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
    .min(4, 'Game must contain at least ${min} tiles.')
    .max(9, 'Game may contain no more than ${max} tiles.'),
  duration: Yup.number()
    .integer()
    .positive()
    .required('Duration is required.')
    .min(10, 'Games must last at least ${min} seconds.')
    .max(300, 'Game may last no more than ${max} seconds.'),
  colorScheme: Yup.string()
    .required('Color Scheme is required.')
    .oneOf(['mono', 'rainbow'], "Color Scheme must be 'mono' or 'rainbow'."),
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

const newMatchSchema = matches => {
  return Yup.object().shape({
    term: Yup.string()
      .required('Term is required')
      .test('duplicate term', 'Duplicate term', function(value) {
        const passed = !matches.some(element => {
          return element.term === value;
        }); // check for duplicate terms
        return passed;
      }),
    definition: Yup.string().required('Definition is required')
  });
};

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
  { text: 'mono', value: 'mono' },
  { text: 'rainbow', value: 'rainbow' }
];

class MatchForm extends Component {
  static MATCH_TAB = 0;
  static BULK_TAB = 1;
  static GAME_OPTS_ACCORDION = 'gameOptions';
  static GAME_DESC_ACCORDION = 'gameDescription';
  static HAS_COMMA = RegExp('^(.?)+([,]+)(.?)+$');

  state = {
    // Use to track open/close state of accordions
    accordion: {
      [MatchForm.GAME_OPTS_ACCORDION]: false, // Closed by default
      [MatchForm.GAME_DESC_ACCORDION]: true // Open by default
    },
    activePage: 1,
    activeTab: MatchForm.MATCH_TAB,
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

  termRef = React.createRef();
  definitionRef = React.createRef();

  setFocus = ref => {
    ref.current.focus();
  };

  /**
   * If title is clicked, toggle state of accordion
   * Used to expand/collapse accordions
   *
   * @param {Event} event Event to handle.
   * @param {Object} titleProps Props from <Accordion.Title>
   * @param {boolean} invalid Validation state of accordion contents
   */
  handleAccordionClick = (event, titleProps, invalid) => {
    !invalid &&
      this.setState((state, props) => {
        return {
          accordion: {
            ...state.accordion,
            [titleProps.index]: !state.accordion[titleProps.index]
          }
        };
      });
  };

  /**
   * Update state with new value for the active editor tab.
   *
   * @param {Event} event Event to handle.
   * @param {Object} data Contains all form data and props, including activeIndex.
   */
  handleTabChange = (event, data) => {
    event.preventDefault();
    const activeTab = data.activeIndex; // activeIndex is the current tab pane
    this.setState((state, props) => {
      return { activeTab: activeTab };
    });
  };

  /**
   * Update state with new value for the active page in match paginator.
   *
   * @param {Event} event Event to handle.
   * @param {Object} data Contains all form data and props, including activePage.
   */
  handlePageChange = (event, data) => {
    event.preventDefault();
    const activePage = data.activePage;
    this.setActivePage(activePage);
  };

  /**
   * Update state with new `activePage` value of the paginator.
   *
   * @param {number} activePage Value to set for activePage.
   */
  setActivePage = activePage => {
    this.setState((state, props) => {
      return { activePage };
    });
  };

  /**
   * Update state with new `value` (Map) of the editor.
   *
   * @param {Editor} editor Editor object to grab `value` from.
   * @param {string} field Name of the field.
   */
  handleEditorChange = ({ value }, field) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], value: value } };
    });
  };

  /**
   * Updated `touched` state of field.
   *
   * @param {string} field Name of the field.
   * @param {boolean} touched Whether interactive with field has occurred (or not).
   */
  handleEditorTouch = (field, touched) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], touched: touched } };
    });
  };

  /**
   * Updated `error` state of field.
   *
   * @param {string} field Name of the field.
   * @param {boolean} error Error message.
   */
  setError = (field, error) => {
    this.setState((state, props) => {
      return { [field]: { ...state[field], error: error } };
    });
  };

  /***
   * Validates and processes new matches input by the 'Expert' editor
   *
   * There is a lot going on here:
   *
   *  Get current matches from Formik (props), term and definition (state)\
   *  Serialize using custom HTMLSerializer
   *  Quote (as needed - regex test) to match bulk editor, allow for duplicate detection, etc.
   *  Validate using Yup
   *  If valid, add to matches and update state
   *  Reset editors' contents, clear errors, set focus, etc.
   *
   *  @param {Event} event Synthetic event passed by React
   */
  handleNewMatch = event => {
    event.preventDefault();

    const { matches } = this.props.values; // Get matches (from Formik)
    const term = this.state.term.value; // Get editors' contents (from state)
    const definition = this.state.definition.value;

    let termHtml = HtmlSerializer.serialize(term);
    termHtml = MatchForm.HAS_COMMA.test(termHtml) ? `"${termHtml}"` : termHtml;

    let definitionHtml = HtmlSerializer.serialize(definition);
    definitionHtml = MatchForm.HAS_COMMA.test(definitionHtml)
      ? `"${definitionHtml}"`
      : definitionHtml;

    const { setFieldValue } = this.props; // Get function used to update matches (in Formik)

    newMatchSchema(matches)
      .validate(
        { term: termHtml, definition: definitionHtml },
        { abortEarly: false }
      ) // Validate serialized term and definition
      .then(valid => {
        // If valid, merge into matches
        const updated = [
          {
            term: termHtml,
            definition: definitionHtml
          },
          ...matches
        ];
        setFieldValue('matches', updated); // Update Formik state
        setFieldValue('bulkMatches', matchToString(updated)); // Format bulkMatches then update Formik state
        this.handleEditorChange(
          { value: HtmlSerializer.deserialize('') },
          'term'
        ); // Reset editors' contents
        this.handleEditorChange(
          { value: HtmlSerializer.deserialize('') },
          'definition'
        );
        this.setError('term', ''); // Clear errors (using custom function)
        this.setError('definition', '');
        this.setFocus(this.termRef); // Move focus to term editor
      })
      .catch(errors => {
        // If invalid, update state with errors
        errors.inner.forEach((value, index) => {
          let { path, message } = value;
          this.setError(path, message);
        });
      });
    this.handleEditorTouch('term', false); // Mark fields untouched
    this.handleEditorTouch('definition', false);
    this.setActivePage(1); // Reset pagination to beginning
  };

  /**
   * Remove a match.
   *
   * @param {string} term The term to be removed from matches.
   */
  handleMatchDelete = (event, term) => {
    event.preventDefault();
    const { setFieldValue } = this.props; // Get function used to update matches (Formik)
    const { matches } = this.props.values; // Get matches array (Formik)
    const filtered = matches.filter(match => {
      // Filter out (deleted) term
      return match.term !== term;
    });
    setFieldValue('matches', filtered); // Update state (in Formik) with matches minus (deleted) term
    setFieldValue('bulkMatches', matchToString(filtered)); // Format bulkMatches then update Formik state
    const { activePage, itemsPerPage } = this.state; // Grab pagination value from state
    const totalPages = Math.ceil(
      (filtered.length ? filtered.length : 0) / itemsPerPage
    ); // Calculate total # of pages
    if (activePage > totalPages) {
      // If active page does not exist (because of delete)
      this.setActivePage(totalPages); // Set to current number of pages
    }
  };

  /**
   * Update state with new `value` from textarea
   *
   * @param {Event} event Event to handle.
   * @param {Object} data Contains components data value and props.
   */
  handleBulkChange = (event, data) => {
    event.preventDefault();
    const { setFieldValue } = this.props;
    setFieldValue('bulkMatches', data.value);
    this.setState((state, props) => {
      return {
        dirty: {
          ...state.dirty,
          bulkMatches:
            state.dirty.bulkMatches || props.values.bulkMatches === data.value
        }
      };
    });
  };

  /**
   * Process bulk matches, updating Formik state, etc.
   *
   * @param {Event} event Event to handle.
   */
  handleUpdateMatches = event => {
    event.preventDefault();
    const { bulkMatches } = this.props.values; // Grab bulk matches from Formik state
    this.updateMatches(bulkMatches); // Call common function to parse, santize, dedup, and update state, etc.
    this.setState((state, props) => {
      return { dirty: { ...state.dirty, bulkMatches: false } };
    });
  };

  /**
   * Perform shared bulk match processing.
   *
   * @param {string} bulkMatches Matches in unprocessed csv form.
   */
  updateMatches = bulkMatches => {
    const { setFieldValue, maxMatches } = this.props; // Grab Formik function (to update state)
    const parsed = parseMatch(bulkMatches, maxMatches); // Split, Sanitize, Dedup -> array of matches
    setFieldValue('matches', parsed); // Update matches in Formik state
    setFieldValue('bulkMatches', matchToString(parsed)); // Flatten parsed matches
    this.setActivePage(1); // Reset pagination to beginning
  };

  /**
   * Process bulk matches from user-provided text file.
   *
   * @param {Event} event. Event to handle.
   */
  handleFileChange = event => {
    event.preventDefault();

    if (event.target.files.length) {
      const file = event.target.files[0]; // Assumes single file processing
      const contents = event.target.files[0].slice(0, file.size, ''); // 0, size, '' are defaults
      const reader = new FileReader(); // To read file from disk

      reader.onload = (function(file, updateMatches) {
        // Closure run upon read completion
        return function(event) {
          console.log(`Loaded ${file.size} bytes from ${file.name}...`);
          if (event.target.result) {
            // If results are returned
            updateMatches(event.target.result); // Call common function to parse, santize, dedup, and update state, etc.
            event.target.value = null;
          }
        };
      })(file, this.updateMatches);

      reader.readAsText(contents, 'UTF-8'); // Initiate file read, assuming UTF-8 encoding
    }
  };

  handleDismiss = (e, setStatus) => {
    e.preventDefault();
    setStatus(null);
  };

  renderMessage = (message, color, setStatus) => {
    return (
      <Message
        hidden={!message}
        content={message}
        color={color}
        onDismiss={(e, data) => this.handleDismiss(e, setStatus)}
      />
    );
  };

  render() {
    // eslint-disable-next-line
    const {
      dirty,
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      isMobile,
      isSubmitting,
      isValid,
      loading,
      maxMatches,
      setFieldValue,
      setStatus,
      status,
      touched,
      values
    } = this.props;

    const {
      accordion,
      activePage,
      activeTab,
      definition,
      dirty: { bulkMatches: isMatchDirty },
      itemsPerPage,
      term
    } = this.state;

    const disabled = isSubmitting || loading;

    const editorPanes = [
      {
        hideOnMobile: false,
        menuItem: 'Match Bank',
        render: () => (
          <Tab.Pane as={Segment} padded>
            <MatchBulk
              dirty={isMatchDirty}
              disabled={disabled}
              maxMatches={maxMatches}
              onBulkChange={(event, data) => this.handleBulkChange(event, data)}
              onFileChange={event => this.handleFileChange(event)}
              onUpdateMatches={event => this.handleUpdateMatches(event)}
              placeholder="Term, Definition"
              value={values.bulkMatches}
            />
          </Tab.Pane>
        )
      },
      {
        hideOnMobile: true,
        menuItem: 'Expert Mode',
        render: () => (
          <Tab.Pane as={Segment} padded>
            <MatchExpert
              definition={definition}
              definitionRef={this.definitionRef}
              disabled={disabled || values.matches.length >= maxMatches}
              maxMatches={maxMatches}
              error={errors.matches}
              onEditorChange={(value, field) =>
                this.handleEditorChange(value, field)
              }
              onEditorTouch={(field, touched) =>
                this.handleEditorTouch(field, touched)
              }
              onNewMatch={this.handleNewMatch}
              term={term}
              termRef={this.termRef}
            />
          </Tab.Pane>
        )
      }
    ]
      .filter(pane => {
        return !isMobile || pane.hideOnMobile !== isMobile;
      })
      .map(pane => {
        return { menuItem: pane.menuItem, render: pane.render };
      });

    return (
      <Form id="match-edit" onSubmit={handleSubmit} size="large">
        <span id="match-id">
          {values.matchId ? values.matchId : 'UNPUBLISHED'}
        </span>
        <Grid columns={2} stackable>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            {status &&
              this.renderMessage(status.message, status.color, setStatus)}
            <Form.Group inline>
              <Button
                active
                as={Link}
                disabled={disabled}
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
                disabled={disabled}
                icon="save"
                labelPosition="left"
                loading={disabled}
                positive={dirty && isValid && !isMatchDirty}
                tabIndex={6}
                title="Save Game"
                type="submit"
              >
                SAVE
              </Button>
            </Form.Group>
            <Segment>
              <Accordion
                forceOpen={!!errors.title || !!errors.instructions}
                icon="tag"
                index={MatchForm.GAME_DESC_ACCORDION}
                onClick={(event, titleProps, invalid) =>
                  this.handleAccordionClick(
                    event,
                    titleProps,
                    !!errors.title || !!errors.instructions
                  )
                }
                open={accordion[MatchForm.GAME_DESC_ACCORDION]}
                title="Description"
              >
                <Form.Group>
                  <InputText
                    disabled={disabled}
                    error={touched.title && errors.title}
                    label="Title"
                    maxLength={40}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    required
                    tabIndex={1}
                    type="text"
                    value={values.title}
                    width={16}
                  />
                </Form.Group>
                <Form.Group>
                  <InputText
                    disabled={disabled}
                    error={touched.instructions && errors.instructions}
                    label="Instructions"
                    maxLength={60}
                    name="instructions"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    tabIndex={2}
                    type="text"
                    value={values.instructions}
                    width={16}
                  />
                </Form.Group>
              </Accordion>
              <Accordion
                forceOpen={!!errors.itemsPerBoard || !!errors.duration}
                icon="sliders"
                index={MatchForm.GAME_OPTS_ACCORDION}
                onClick={(event, titleProps, invalid) =>
                  this.handleAccordionClick(
                    event,
                    titleProps,
                    !!errors.itemsPerBoard || !!errors.duration
                  )
                }
                open={accordion[MatchForm.GAME_OPTS_ACCORDION]}
                title="Options"
              >
                <Grid columns={3} stackable textAlign="center">
                  <Grid.Row>
                    <Grid.Column verticalAlign="top">
                      <IconDropdown
                        compact
                        disabled={disabled}
                        error={touched.itemsPerBoard && errors.itemsPerBoard}
                        icon="grid"
                        label="Game Tiles"
                        name="itemsPerBoard"
                        onBlur={handleBlur}
                        options={itemsPerBoardOptions}
                        selection
                        setFieldValue={setFieldValue}
                        tabIndex={-1}
                        value={values.itemsPerBoard}
                      />
                    </Grid.Column>
                    <Grid.Column verticalAlign="top">
                      <IconDropdown
                        compact
                        disabled={disabled}
                        error={touched.duration && errors.duration}
                        icon="watch"
                        label="Seconds"
                        name="duration"
                        onBlur={handleBlur}
                        options={durationOptions}
                        selection
                        setFieldValue={setFieldValue}
                        tabIndex={-1}
                        value={values.duration}
                      />
                    </Grid.Column>
                    <Grid.Column verticalAlign="top">
                      <IconDropdown
                        compact
                        disabled={disabled}
                        error={touched.colorScheme && errors.colorScheme}
                        icon="palette"
                        label="Color Scheme"
                        name="colorScheme"
                        onBlur={handleBlur}
                        options={colorSchemeOptions}
                        selection
                        setFieldValue={setFieldValue}
                        tabIndex={-1}
                        value={values.colorScheme}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion>
            </Segment>
            <Tab
              as="div"
              activeIndex={activeTab}
              onTabChange={(event, data) => this.handleTabChange(event, data)}
              panes={editorPanes}
              renderActiveOnly={true}
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <MatchTable
              activePage={activePage}
              disabled={disabled}
              error={
                errors.matches &&
                `Add at least ${values.itemsPerBoard -
                  values.matches.length} more term${
                  values.itemsPerBoard - values.matches.length === 1 ? '' : 's'
                }...`
              }
              id="table-match"
              itemsPerPage={itemsPerPage}
              matches={values.matches}
              onMatchDelete={(event, term) =>
                this.handleMatchDelete(event, term)
              }
              onPageChange={(event, data) => this.handlePageChange(event, data)}
            />
          </Grid.Column>
        </Grid>
        <DisplayFormikState {...this.props} />
        {/*<pre>{JSON.stringify(this.state, null, 2)}</pre> */}
      </Form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  validateOnChange: true,
  validateOnBlur: true,
  mapPropsToValues: ({ game }) => {
    // 1. Cast and transform incoming data as appropriate
    const data = transformMatch.cast(game || {});

    // 2. Map data to Formik's 'values'
    return {
      matchId: data.matchId,
      title: data.title,
      instructions: data.instructions,
      itemsPerBoard: data.options.itemsPerBoard,
      duration: data.options.duration,
      colorScheme: data.options.colorScheme,
      matches: data.matches || [],
      bulkMatches: matchToString(data.matches || [])
    };
  },
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateMatch,
  handleSubmit: async (values, formikBag) => {
    const { handleSave } = formikBag.props;
    const { setSubmitting, setStatus } = formikBag;
    await handleSave(values, { setSubmitting, setStatus });
  }
})(MatchForm);
