// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { Form, Grid, Segment, Tab } from "semantic-ui-react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useResult, useWindowSize } from "../../hooks/";
import { Accordion, Button, IconDropdown, InputText, Notify } from "../UI/";
import HtmlSerializer from "./HtmlSerializer";
import MatchAdd from "./MatchAdd";
import MatchBulk from "./MatchBulk";
import MatchTable from "./MatchTable";
import { matchToString, parseMatch } from "./utils";
// eslint-disable-next-line
import DisplayFormikState from "../UI/FormikHelper";

const itemsPerBoardOptions = [
  { text: "4", value: 4 },
  { text: "6", value: 6 },
  { text: "9", value: 9 }
];

const durationOptions = [
  { text: "10", value: 10 },
  { text: "60", value: 60 },
  { text: "90", value: 90 },
  { text: "120", value: 120 },
  { text: "180", value: 180 },
  { text: "240", value: 240 },
  { text: "300", value: 300 }
];

const colorSchemeOptions = [
  { text: "Basic", value: "Basic" },
  { text: "Rainbow", value: "Rainbow" }
];

/* eslint-disable no-template-curly-in-string */
const validateMatch = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title is too short. ${min} characters are required.")
    .max(40, "Title is too long. ${max} characters are allowed.")
    .required("Title is required."),
  instructions: Yup.string().max(
    60,
    "Instructions are too long. ${max} characters are allowed."
  ),
  itemsPerBoard: Yup.number()
    .integer()
    .positive()
    .required("Game Tiles is required.")
    .oneOf(
      itemsPerBoardOptions.map(i => i.value),
      "Pick a valid number of game tiles."
    ),
  duration: Yup.number()
    .integer()
    .positive()
    .required("Duration is required.")
    .oneOf(
      durationOptions.map(i => i.value),
      "Pick a valid game duration."
    ),
  colorScheme: Yup.string()
    .required("Color Scheme is required.")
    .oneOf(
      colorSchemeOptions.map(i => i.value),
      "Pick a valid color scheme."
    ),
  matches: Yup.array().test({
    name: "min-matches",
    params: {
      itemsPerBoard: Yup.ref("itemsPerBoard")
    },
    message: "${itemsPerBoard} matches required in bank.",
    test: function(value) {
      return value.length >= this.parent.itemsPerBoard;
    }
  })
});

const newMatchSchema = matches => {
  return Yup.object().shape({
    term: Yup.string()
      .required("Term is required.")
      .test("duplicate term", "Duplicate term.", function(value) {
        const passed = !matches.some(element => {
          return element.term === value;
        }); // check for duplicate terms
        return passed;
      }),
    definition: Yup.string().required("Definition is required.")
  });
};

const GAME_OPTS_ACCORDION = "gameOptions";
const GAME_DESC_ACCORDION = "gameDescription";
const HAS_COMMA = RegExp("^(.?)+([,]+)(.?)+$");

const EMPTY_EDITOR =
  '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","text":"","marks":[]}]}]}}';

// Used as the original shape of match edit state
const initialState = {
  accordion: {
    [GAME_OPTS_ACCORDION]: false, // Closed by default
    [GAME_DESC_ACCORDION]: true // Open by default
  },
  activePage: 1,
  activeTab: 0,
  definition: {
    dirty: false,
    placeholder: "",
    touched: false,
    value: HtmlSerializer.deserialize("")
  },
  dirty: {
    bulkMatches: false
  },
  itemsPerPage: 10,
  term: {
    dirty: false,
    placeholder: "",
    touched: false,
    value: HtmlSerializer.deserialize("")
  }
};

const MatchForm = props => {
  const [state, setState] = useState(initialState);
  const termRef = useRef();
  const definitionRef = useRef();
  const [isMobile] = useWindowSize();
  const [getNotify] = useResult({});

  const {
    loading,
    maxMatches,
    onCreateMatch,
    onSuccess,
    onUpdateMatch
  } = props;

  const {
    accordion,
    activePage,
    activeTab,
    definition,
    dirty: { bulkMatches: isMatchDirty },
    itemsPerPage,
    term
  } = state;

  /**
   * If title is clicked, toggle state of accordion
   * Used to expand/collapse accordions
   *
   * @param {Event} event Event to handle
   * @param {Object} titleProps Props from <Accordion.Title>
   * @param {boolean} invalid Validation state of accordion contents
   */
  const handleAccordionClick = (event, titleProps, invalid) => {
    event.preventDefault();
    !invalid &&
      setState(prevState => {
        return {
          ...prevState,
          accordion: {
            ...prevState.accordion,
            [titleProps.index]: !prevState.accordion[titleProps.index]
          }
        };
      });
  };

  /**
   * Update state with new value for the active editor tab
   *
   * @param {Event} event Event to handle
   * @param {Object} data Contains all form data and props, including activeIndex
   */
  const handleTabChange = (event, data) => {
    event.preventDefault();
    setState(prevState => {
      return {
        ...prevState,
        activeTab: data.activeIndex // activeIndex is the current tab pane
      };
    });
  };

  /**
   * Update state with new `activePage` value of the paginator
   *
   * @param {number} activePage Value to set for activePage
   */
  const setActivePage = activePage => {
    setState(prevState => {
      return { ...prevState, activePage };
    });
  };

  /**
   * Update state with new value for the active page in match paginator
   *
   * @param {Event} event Event to handle
   * @param {Object} data Contains all form data and props, including activePage
   */
  const handlePageChange = (event, data) => {
    event.preventDefault();
    setActivePage(data.activePage);
  };

  /**
   * Update state with new `value` from textarea
   *
   * @param {Event} event Event to handle
   * @param {Object} data Contains components data value and props
   * @param {string} prevBulkMatches The value of `bulkMatches` as of last save (from initialValues)
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   * @param {function} validateForm Reference to Formik `validateForm` function
   */
  const handleBulkChange = async (
    event,
    data,
    prevBulkMatches,
    setFieldValue,
    validateForm
  ) => {
    event.preventDefault();
    await setFieldValue("bulkMatches", data.value, false);
    setState(prevState => {
      return {
        ...prevState,
        dirty: {
          ...prevState.dirty,
          bulkMatches: prevBulkMatches !== data.value
        }
      };
    });
    await validateForm();
  };

  /**
   * Perform shared bulk match processing
   *
   * @param {string} bulkMatches Matches in unprocessed csv form
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   * @param {function} validateForm Reference to Formik `validateForm` function
   *
   * There is a bug in Formik which required the use of ValidateForm
   * Once validateField works, retro fit to use this instead
   * https://github.com/jaredpalmer/formik/pull/1784
   *
   * The idea here is to programmatically update the field,
   * forcing the user of `await` and setting not to validate
   * (because this is broken too)
   * Then, we validate the form using validateForm because validateField is busted
   */
  const updateMatches = async (bulkMatches, setFieldValue, validateForm) => {
    const parsed = parseMatch(bulkMatches, maxMatches); // Split, Sanitize, Dedup -> array of matches
    await setFieldValue("matches", parsed, false); // Update matches in Formik state
    await setFieldValue("bulkMatches", matchToString(parsed), false); // Flatten parsed matches
    setActivePage(1); // Reset pagination to beginning
    await validateForm();
  };

  /**
   * Process bulk matches from user-provided text file.
   *
   * @param {Event} event Event to handle
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   * @param {function} validateForm Reference to Formik `validateForm` function
   */
  const handleFileChange = async (event, setFieldValue, validateForm) => {
    event.preventDefault();

    if (event.target.files.length) {
      const file = event.target.files[0]; // Assumes single file processing
      const contents = event.target.files[0].slice(0, file.size, ""); // 0, size, '' are defaults
      const reader = new FileReader(); // To read file from disk

      reader.onload = (function(file, updateMatches) {
        // Closure run upon read completion
        return async function(event) {
          console.log(`Loaded ${file.size} bytes from ${file.name}...`);
          if (event.target.result) {
            // If results are returned
            await updateMatches(
              event.target.result,
              setFieldValue,
              validateForm
            ); // Call common function to parse, santize, dedup, and update state, etc.
            event.target.value = null;
          }
        };
      })(file, updateMatches);

      reader.readAsText(contents, "UTF-8"); // Initiate file read, assuming UTF-8 encoding
    }
  };

  /**
   * Process bulk matches, updating Formik state, etc.
   *
   * @param {Event} event Event to handle
   * @param {string} bulkMatches Current value of `bulkMatches`
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   * @param {function} validateForm Reference to Formik `validateForm` function
   */
  const handleUpdateMatches = async (
    event,
    bulkMatches,
    setFieldValue,
    validateForm
  ) => {
    event.preventDefault();
    await updateMatches(bulkMatches, setFieldValue, validateForm); // Call common function to parse, santize, dedup, and update state, etc.
    setState(prevState => {
      return {
        ...prevState,
        dirty: { ...prevState.dirty, bulkMatches: false }
      };
    });
  };

  /**
   * Update state with new `value` (Map) of the editor
   *
   * @param {Editor} editor Editor object to grab `value` from
   * @param {string} field Name of the field
   */
  const handleEditorChange = ({ value }, field) => {
    setState(prevState => {
      return {
        ...prevState,
        [field]: {
          ...prevState[field],
          dirty: EMPTY_EDITOR !== JSON.stringify(value) ? true : false,
          value: value
        }
      };
    });
  };

  /**
   * Updated `touched` state of field
   *
   * @param {string} field Name of the field
   * @param {boolean} touched Whether interactive with field has occurred (or not)
   */
  const handleEditorTouch = (field, touched) => {
    setState(prevState => {
      return {
        ...prevState,
        [field]: {
          ...prevState[field],
          touched: touched
        }
      };
    });
  };

  /**
   * Updated `error` state of field
   *
   * @param {string} field Name of the field
   * @param {boolean} error Error message
   */
  const setError = (field, error) => {
    setState(prevState => {
      return {
        ...prevState,
        [field]: {
          ...prevState[field],
          error: error
        }
      };
    });
  };

  /**
   * Sets focus for the given ref
   *
   * @param {*} ref Reference to set focus upon
   */
  const setFocus = ref => {
    ref.current.focus();
  };

  /***
   * Validates and processes new matches input by the 'Expert' editor
   *
   * There is a lot going on here:
   *
   *  Get current matches from Formik (props), term and definition (state)
   *  Serialize using custom HTMLSerializer
   *  Quote (as needed - regex test) to match bulk editor, allow for duplicate detection, etc.
   *  Validate using Yup
   *  If valid, add to matches and update state
   *  Reset editors' contents, clear errors, set focus, etc.
   *
   * @param {Event} event Event to handle
   * @param {array} matches The current value of `matches`
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   * @param {function} validateForm Reference to Formik `validateForm` function
   */
  const handleNewMatch = async (
    event,
    matches,
    setFieldValue,
    validateForm
  ) => {
    event.preventDefault();

    let termHtml = HtmlSerializer.serialize(term.value);
    termHtml = HAS_COMMA.test(termHtml) ? `"${termHtml}"` : termHtml;

    let definitionHtml = HtmlSerializer.serialize(definition.value);
    definitionHtml = HAS_COMMA.test(definitionHtml)
      ? `"${definitionHtml}"`
      : definitionHtml;

    newMatchSchema(matches)
      .validate(
        { term: termHtml, definition: definitionHtml },
        { abortEarly: false }
      ) // Validate serialized term and definition
      .then(async valid => {
        // If valid, merge into matches
        const updated = [
          {
            term: termHtml,
            definition: definitionHtml
          },
          ...matches
        ];
        await setFieldValue("matches", updated, false); // Update Formik state
        await setFieldValue("bulkMatches", matchToString(updated), false); // Format bulkMatches then update Formik state
        await validateForm();
        handleEditorChange({ value: HtmlSerializer.deserialize("") }, "term"); // Reset editors' contents
        handleEditorChange(
          { value: HtmlSerializer.deserialize("") },
          "definition"
        );
        setError("term", ""); // Clear errors (using custom function)
        setError("definition", "");
        setFocus(termRef); // Move focus to term editor
      })
      .catch(errors => {
        // If invalid, update state with errors
        errors.inner.forEach((value, index) => {
          let { path, message } = value;
          setError(path, message);
        });
      });
    handleEditorTouch("term", false); // Mark fields untouched
    handleEditorTouch("definition", false);
    setActivePage(1); // Reset pagination to beginning
  };

  /**
   * Remove a match
   *
   * @param {Event} event Event to handle
   * @param {string} term The term to be removed from matches
   * @param {array} matches The current value of `matches`
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   * @param {function} validateForm Reference to Formik `validateForm` function
   */
  const handleMatchDelete = async (
    event,
    term,
    matches,
    setFieldValue,
    validateForm
  ) => {
    event.preventDefault();
    const filtered = matches.filter(match => match.term !== term);
    await setFieldValue("matches", filtered, false); // Update state (in Formik) with matches minus (deleted) term
    await setFieldValue("bulkMatches", matchToString(filtered), false); // Format bulkMatches then update Formik state
    const totalPages = Math.ceil(
      (filtered.length ? filtered.length : 0) / itemsPerPage
    ); // Calculate total # of pages
    if (activePage > totalPages) setActivePage(totalPages); // If active page no longer exists (because of delete)
    await validateForm();
  };

  // Temporary while migrating...
  /*useEffect(() => {
    console.log(JSON.stringify(state, null, 5));
  }, [state]);*/

  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={false}
      initialValues={{
        matchId: props.game.matchId || null,
        title: props.game.title || "",
        instructions: props.game.instructions || "",
        itemsPerBoard:
          (props.game.options && props.game.options.itemsPerBoard) || 9,
        duration: (props.game.options && props.game.options.duration) || 90,
        colorScheme:
          (props.game.options && props.game.options.colorScheme) || "Basic",
        matches: props.game.matches || [],
        bulkMatches: matchToString(props.game.matches || [])
      }}
      onSubmit={async (values, actions) => {
        let results;
        const { setStatus, setSubmitting } = actions;
        await setSubmitting(true);
        const {
          duration,
          instructions,
          itemsPerBoard,
          colorScheme,
          matchId,
          matches,
          title
        } = values;
        const options = { duration, itemsPerBoard, colorScheme };
        if (matchId) {
          results = await onUpdateMatch(
            {
              instructions,
              matches,
              options,
              title
            },
            matchId
          );
        } else {
          results = await onCreateMatch({
            instructions,
            matches,
            options,
            title
          });
        }
        const success = results.data || false;
        const notify = getNotify(results);
        if (success) {
          await onSuccess(results.data.matchId);
        } else {
          await setStatus(notify);
        }
        await setSubmitting(false);
      }}
      validationSchema={validateMatch}
    >
      {props => {
        const {
          dirty,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          initialValues,
          isSubmitting,
          isValid,
          setFieldValue,
          setStatus,
          status,
          touched,
          validateForm,
          values
        } = props;

        const disabled = loading || isSubmitting;

        const editorPanes = [
          {
            hideOnMobile: true,
            menuItem: "Add Match",
            render: () => (
              <Tab.Pane id="match-add" as={Segment} padded>
                <MatchAdd
                  definition={definition}
                  definitionRef={definitionRef}
                  disabled={disabled || values.matches.length >= maxMatches}
                  maxMatches={maxMatches}
                  error={errors.matches}
                  onEditorChange={(value, field) =>
                    handleEditorChange(value, field)
                  }
                  onEditorTouch={(field, touched) =>
                    handleEditorTouch(field, touched)
                  }
                  onNewMatch={event =>
                    handleNewMatch(
                      event,
                      values.matches,
                      setFieldValue,
                      validateForm
                    )
                  }
                  term={term}
                  termRef={termRef}
                />
              </Tab.Pane>
            )
          },
          {
            hideOnMobile: false,
            menuItem: "Bulk Editor",
            render: () => (
              <Tab.Pane id="match-bulk" as={Segment} padded>
                <MatchBulk
                  dirty={isMatchDirty}
                  disabled={disabled}
                  maxMatches={maxMatches}
                  onBulkChange={(event, data) =>
                    handleBulkChange(
                      event,
                      data,
                      initialValues.bulkMatches,
                      setFieldValue,
                      validateForm
                    )
                  }
                  onFileChange={event =>
                    handleFileChange(event, setFieldValue, validateForm)
                  }
                  onUpdateMatches={event =>
                    handleUpdateMatches(
                      event,
                      values.bulkMatches,
                      setFieldValue,
                      validateForm
                    )
                  }
                  placeholder="Term, Definition"
                  value={values.bulkMatches}
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
          <Form id="match-form" onSubmit={handleSubmit}>
            <span id="match-id">
              {values.matchId ? values.matchId : "UNPUBLISHED"}
            </span>
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
            <Grid columns={2} stackable>
              <Grid.Column computer={8} mobile={16} tablet={16}>
                <Segment>
                  <Form.Group inline>
                    <Button
                      active
                      as={Link}
                      disabled={disabled}
                      icon="back"
                      labelPosition="left"
                      tabIndex={-1}
                      title="Back to Dashboard"
                      to={{ pathname: "/dashboard", state: { from: "MATCH" } }}
                      type="button"
                    >
                      BACK
                    </Button>
                    <Button
                      active
                      disabled={disabled || !isValid || !dirty || isMatchDirty}
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
                  <Accordion
                    forceOpen={!!errors.title || !!errors.instructions}
                    icon="tag"
                    index={GAME_DESC_ACCORDION}
                    onClick={(event, titleProps) =>
                      handleAccordionClick(
                        event,
                        titleProps,
                        !!errors.title || !!errors.instructions
                      )
                    }
                    open={accordion[GAME_DESC_ACCORDION]}
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
                    id="game-options"
                    forceOpen={!!errors.itemsPerBoard || !!errors.duration}
                    icon="sliders"
                    index={GAME_OPTS_ACCORDION}
                    onClick={(event, titleProps) =>
                      handleAccordionClick(
                        event,
                        titleProps,
                        !!errors.itemsPerBoard || !!errors.duration
                      )
                    }
                    open={accordion[GAME_OPTS_ACCORDION]}
                    title="Options"
                  >
                    <Grid
                      columns={2}
                      stackable
                      textAlign="center"
                      verticalAlign="middle"
                    >
                      <Grid.Row>
                        <Grid.Column verticalAlign="top">
                          <IconDropdown
                            headerSize="h5"
                            compact
                            disabled={disabled}
                            error={
                              touched.itemsPerBoard && errors.itemsPerBoard
                            }
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
                            headerSize="h5"
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
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column verticalAlign="top">
                          <IconDropdown
                            headerSize="h5"
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
                  onTabChange={(event, data) => handleTabChange(event, data)}
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
                      values.itemsPerBoard - values.matches.length === 1
                        ? ""
                        : "s"
                    }...`
                  }
                  id="match-table"
                  isMobile={isMobile}
                  itemsPerPage={itemsPerPage}
                  matches={values.matches}
                  onMatchDelete={(event, term) =>
                    handleMatchDelete(
                      event,
                      term,
                      values.matches,
                      setFieldValue,
                      validateForm
                    )
                  }
                  onPageChange={(event, data) => handlePageChange(event, data)}
                />
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
