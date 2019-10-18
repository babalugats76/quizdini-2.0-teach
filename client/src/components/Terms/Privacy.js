import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default ({ id }) => (
  <Segment as="section" id={id} padded="very">
    <Header size="huge" textAlign="center">
      Quizdini Privacy Policy
    </Header>
    <Header size="medium">
      Effective Date: May 1<sup>st</sup>, 2019
    </Header>
    <p>
      This policy explains what information we collect when you use Quizdini’s
      sites. It also has information about how we store, use, transfer, and
      delete the information involved in providing Quizdini as a service. Our
      aim is to collect just the information that is required to provide our
      services. We see the responsible use and protection of your information as
      essential in securing both compliance and your trust in us.
    </p>
    <Header size="large">Information We Collect & How We Use It</Header>
    <p>
      When you create an account with Quizdini, you will be asked to provide
      personal information such as <strong>name</strong>,&nbsp;
      <strong>general location</strong>, and <strong>email address</strong>.
      This will help to create your unique user account, controlled by the
      username and encrypted password of your choice.
    </p>
    <p>
      If creating your Quizdini account via your <strong>Google login</strong>,
      similar information will be collected. You will also be able to edit and
      update your personal profile once your account has been created and
      verified.
    </p>
    <p>To help... Information about the games you create</p>
    <p>
      Please note that your&nbsp;
      <strong>credit card information will never be stored</strong>.
    </p>
    <Header size="large">Making Changes to Your Information</Header>
    <p>
      You are welcome and encouraged to <strong>verify the information</strong>{' '}
      provided on your Profile page often and to update it as needed. You can
      also <strong>change your password</strong> from that page as well.
    </p>
  </Segment>
);
