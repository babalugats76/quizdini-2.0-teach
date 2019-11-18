import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import internet from '../../internet.svg';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      <Header.Content>Cookie Policy</Header.Content>
      <Header.Subheader>
        Effective Date: January 1<sup>st</sup>, 2020
      </Header.Subheader>
    </Header>
    <Header size="large" icon textAlign="center">
      <Image alt="Internet" className="icon internet" src={internet} />
    </Header>
    <Header size="large">What is a Cookie?</Header>
    <p>
      <a
        href="http://whatarecookies.com/"
        rel="noopener noreferrer"
        target="_blank"
        title="What Are Cookies? Computer Cookies Explained"
      >
        Cookies
      </a>
      &nbsp;are the&nbsp;<strong>tiny files</strong>&nbsp;placed on your
      computer by websites you visit which allow them to interact with you
      efficiently.
    </p>
    <p>
      Quizdini uses&nbsp;<strong>session</strong>&nbsp;cookies for the simple
      purpose of helping you stay logged in to your account while you work.
    </p>
    <Header size="large">No Cookies for You!</Header>
    <p>
      If you&apos;d like to&nbsp;<strong>delete cookies</strong>&nbsp;or
      instruct your web browser to delete or refuse cookies, please visit the
      help pages of your web browser.
    </p>
    <p>
      Please note, however, that cookies are&nbsp;
      <strong>required for you to log in</strong>&nbsp;and take advantage of any
      of Quizdini&apos;s personalized services.
    </p>
  </Segment>
);
