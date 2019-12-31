import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Grid, Segment, Tab } from "semantic-ui-react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Accordion, Button, IconDropdown, InputText } from "../UI/";
import HtmlSerializer from "./HtmlSerializer";
import MatchBulk from "./MatchBulk";
import MatchTable from "./MatchTable";
import { matchToString, parseMatch } from "./utils";
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

const MATCH_TAB = 0;
const BULK_TAB = 1;
const GAME_OPTS_ACCORDION = "gameOptions";
const GAME_DESC_ACCORDION = "gameDescription";
const HAS_COMMA = RegExp("^(.?)+([,]+)(.?)+$");

// Used as the original shape of match edit state
const initialState = {
  accordion: {
    [GAME_OPTS_ACCORDION]: false, // Closed by default
    [GAME_DESC_ACCORDION]: true // Open by default
  },
  activePage: 1,
  activeTab: MATCH_TAB,
  definition: {
    placeholder: "",
    touched: false,
    value: HtmlSerializer.deserialize("")
  },
  dirty: {
    bulkMatches: false
  },
  itemsPerPage: 10,
  term: {
    placeholder: "",
    touched: false,
    value: HtmlSerializer.deserialize("")
  }
};

const MatchForm = props => {
  const [state, setState] = useState(initialState);

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
    const activeTab = data.activeIndex; // activeIndex is the current tab pane
    setState(prevState => {
      return {
        ...prevState,
        activeTab
      };
    });
  };

  /**
   * Update state with new `value` from textarea
   *
   * @param {Event} event Event to handle
   * @param {Object} data Contains components data value and props
   * @param {string} prevBulkMatches The value of `bulkMatches` as of last save (from initialValues)
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   */
  const handleBulkChange = (event, data, prevBulkMatches, setFieldValue) => {
    event.preventDefault();
    setFieldValue("bulkMatches", data.value);
    setState(prevState => {
      return {
        ...prevState,
        dirty: {
          ...prevState.dirty,
          bulkMatches: prevBulkMatches !== data.value
        }
      };
    });
  };

  const handleFileChange = () => {
    console.log('handle file change goes here...')
  }

  const handleUpdateMatches = () => {
    console.log('handle update matches goes here...')
  }

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
    const activePage = data.activePage;
    setActivePage(activePage);
  };

  /**
   * Remove a match
   *
   * @param {Event} event Event to handle
   * @param {string} term The term to be removed from matches
   * @param {array} matches The current value of `matches`
   * @param {function} setFieldValue Reference to Formik `setFieldValue` function
   */
  const handleMatchDelete = (event, term, matches, setFieldValue) => {
    event.preventDefault();
    const filtered = matches.filter(match => match.term !== term);
    setFieldValue("matches", filtered); // Update state (in Formik) with matches minus (deleted) term
    setFieldValue("bulkMatches", matchToString(filtered)); // Format bulkMatches then update Formik state
    const { activePage, itemsPerPage } = state; // Grab pagination value from state
    const totalPages = Math.ceil(
      (filtered.length ? filtered.length : 0) / itemsPerPage
    ); // Calculate total # of pages
    if (activePage > totalPages) setActivePage(totalPages); // If active page no longer exists (because of delete)
  };

  // Temporary while migrating...
  useEffect(() => {
    console.log(JSON.stringify(state));
  }, [state]);

  const { isMobile, maxMatches } = props;

  const {
    accordion,
    activePage,
    activeTab,
    definition,
    dirty: { bulkMatches: isMatchDirty },
    itemsPerPage
  } = state;

  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
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
          initialValues,
          isSubmitting,
          isValid,
          setFieldValue,
          setStatus,
          status,
          touched,
          values
        } = props;

        const editorPanes = [
          {
            hideOnMobile: false,
            menuItem: "Match Bank",
            render: () => (
              <Tab.Pane id="match-bulk" as={Segment} padded>
                <MatchBulk
                  dirty={isMatchDirty}
                  disabled={isSubmitting}
                  maxMatches={maxMatches}
                  onBulkChange={(event, data) =>
                    handleBulkChange(
                      event,
                      data,
                      initialValues.bulkMatches,
                      setFieldValue
                    )
                  }
                  onFileChange={event => handleFileChange(event)}
                  onUpdateMatches={event => handleUpdateMatches(event)}
                  placeholder="Term, Definition"
                  value={values.bulkMatches}
                />
              </Tab.Pane>
            )
          },
          {
            hideOnMobile: true,
            menuItem: "Expert Mode",
            render: () => (
              <Tab.Pane id="match-expert" as={Segment} padded>
                <div>Expert Goes Here..</div>
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
                      to={{ pathname: "/dashboard", state: { from: "MATCH" } }}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                      setFieldValue
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
