import React from "react";
import { Header, Image, List, Segment, Table } from "semantic-ui-react";
import privacy from "../../privacy.svg";

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      <Header.Content>Privacy Policy</Header.Content>
      <Header.Subheader>
        Effective Date: January 1<sup>st</sup>, 2020
      </Header.Subheader>
    </Header>
    <Header size="large" icon textAlign="center">
      <Image alt="Privacy" className="icon privacy" src={privacy} />
    </Header>
    <p>
      At Quizdini, we believe in protecting and honoring students' privacy. Our
      aim is to collect just the information that is&nbsp;
      <strong>required to provide our services</strong>. We see the responsible
      use and protection of user information as essential in securing both
      compliance and trust.
    </p>

    <details id="information-we-collect">
      <summary>Information We Collect</summary>
      <Table id="what-we-collect" celled stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>What We Collect</Table.HeaderCell>
            <Table.HeaderCell>We Use It To...</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <strong>Profile Information</strong>
            </Table.Cell>
            <Table.Cell>
              Personalize correspondance, brand activities, and enhance site
              interactions
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Email Address</strong>
            </Table.Cell>
            <Table.Cell>
              Communicate and correspond with you about your account
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Credentials</strong>
            </Table.Cell>
            <Table.Cell>Authenticate you and verify your identity</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Google Profile</strong>
            </Table.Cell>
            <Table.Cell>Support Google OAuth authentication</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Payment Information</strong>
            </Table.Cell>
            <Table.Cell>
              Track credits added to your account and redirect you to
              third-party payment processor (for receipt)
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>Log Data</strong>
            </Table.Cell>
            <Table.Cell>
              Quantify traffic, troubleshoot issues, and provide primitive
              analytics, e.g., number of game plays
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </details>
    <details id="credit-card-data">
      <summary>Credit Card Data</summary>
      <List as="ul" bulleted>
         <List.Item as="li">We use&nbsp;
        <a
          href="https://stripe.com/"
          rel="noopener noreferrer"
          target="_blank"
          title="Online payment processing for internet businesses - Stripe"
        >
          Stripe
        </a>
        &nbsp;to process all payments.</List.Item>
         <List.Item as="li">We&nbsp;
        <strong>do not store</strong>&nbsp;your complete credit card number.</List.Item>
         <List.Item as="li">In your account, we retain enough information to direct you back to
        Stripe.</List.Item>
         <List.Item as="li">We believe&nbsp;
        <strong>the less we store, the better</strong>.</List.Item>
      </List>
    </details>
    <details id="information-we-collect">
      <summary>Managing Your Information</summary>
      <p>
        Remember, your data is exactly that: yours!&nbsp;<strong>Verify</strong>&nbsp;the
        information on your Profile page and update it as needed.
        You may also&nbsp;<strong>change</strong>&nbsp;your password from that
        page as well.
      </p>
    </details>
  </Segment>
);
