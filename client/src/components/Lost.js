import React from "react";
import { Formik } from "formik";
import { Container, Divider, Form, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { useAPI, useResult } from "../hooks/";
import { Button, Icon, InputText, LogoHeader, Notify, RadioGroup } from "./UI/";

export default props => {
  // direct API interactions (ephemeral)
  const { POST: sendRecoveryEmail } = useAPI({ url: "/api/account/lost" });

  // what to render
  return (
    <Container as="main" className="page small" id="lost" fluid>
      <LogoHeader>Lost Credentials</LogoHeader>
      <LostForm onRecovery={sendRecoveryEmail} />
    </Container>
  );
};

const validateLost = Yup.object().shape({
  email: Yup.string()
    .email("Valid email required.")
    .required("Email is required.")
});

const recoveryTypes = [
  {
    key: "0",
    label: "recoverying my username",
    value: "username"
  },
  {
    key: "1",
    label: "resetting my password",
    value: "password"
  }
];

const LostForm = props => {
  const getNotify = useResult({ failHeader: "Check yourself..." });

  const handleRecoveryTypeChange = (e, data) => {
    const { value } = e.target;
    const { setFieldValue } = data;
    setFieldValue("recoveryType", value);
  };

  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      initialValues={{
        email: "",
        recoveryType: "username"
      }}
      onSubmit={async (values, actions) => {
        const { onRecovery } = props;
        const { resetForm, setFieldValue, setStatus, setSubmitting } = actions;
        const { email, recoveryType } = values;
        await setSubmitting(true);
        const results = await onRecovery({ email, recoveryType });
        const notify = getNotify(results);
        await resetForm();
        await setFieldValue("recoveryType", recoveryType);
        await setStatus(notify);
        await setSubmitting(false);
      }}
      validationSchema={validateLost}
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
          setFieldValue,
          setStatus,
          status,
          touched,
          values
        } = props;

        return (
          <Segment padded>
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
            <Segment basic textAlign="left">
              <Form id="lost-form" onSubmit={handleSubmit}>
                <Form.Group>
                  <InputText
                    disabled={isSubmitting}
                    error={touched.email && errors.email}
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    required
                    tabIndex={1}
                    type="text"
                    value={values.email}
                    width={16}
                  />
                </Form.Group>
                <Divider horizontal section>
                  <Header as="h4">
                    <Icon name="key" />
                    Recovery Options
                  </Header>
                </Divider>
                <Form.Group grouped={true}>
                  <Header size="small">I need help...</Header>
                  <RadioGroup
                    disabled={isSubmitting}
                    name="recoveryType"
                    onBlur={handleBlur}
                    onChange={(e, data) =>
                      handleRecoveryTypeChange(e, { setFieldValue })
                    }
                    options={recoveryTypes}
                    tabIndex={2}
                    value={values.recoveryType}
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    active
                    disabled={isSubmitting || !isValid || !dirty}
                    icon="mail"
                    labelPosition="left"
                    loading={isSubmitting}
                    positive={
                      isValid && !!values.email && !!values.recoveryType
                    }
                    size="large"
                    tabIndex={3}
                    title="Send Email"
                    type="submit"
                  >
                    SEND EMAIL
                  </Button>
                </Form.Group>
              </Form>
            </Segment>
          </Segment>
        );
      }}
    </Formik>
  );
};
