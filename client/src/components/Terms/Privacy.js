/* https://graphicriver.net/item/cyber-crime-concept-with-hacker/22436724?s_rank=25 */

import React from 'react';
import { Header, Segment, Image, Table } from 'semantic-ui-react';
import easel from '../../easel.svg';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      <Header.Content>Privacy Policy</Header.Content>
      <Header.Subheader>
        Effective Date: January 1<sup>st</sup>, 2020
      </Header.Subheader>
    </Header>
    <Header size="large" icon textAlign="center">
      <Image alt="Easel" className="icon easel" src={easel} />
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
            <Table.Cell>Profile Information</Table.Cell>
            <Table.Cell>
              Personalize correspondance, brand activities, and enhance site
              interactions
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Email Address</Table.Cell>
            <Table.Cell>
              Communicate and correspond with you about your account
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Credentials</Table.Cell>
            <Table.Cell>Authenticate you and verify your identity</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Google Profile</Table.Cell>
            <Table.Cell>Support Google OAuth authentication</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Payment Information</Table.Cell>
            <Table.Cell>
              Track credits added to your account and redirect you to
              third-party payment processor (for receipt)
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Log Data</Table.Cell>
            <Table.Cell>
              Quantify traffic, troubleshoot issues, and provide primitive
              analytics, e.g., number of game plays
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </details>
    <details id="information-we-collect">
      <summary>Managing Your Information</summary>
      <p>
        You are welcome and encouraged to&nbsp;<strong>verify</strong>&nbsp;the
        information provided on your Profile page and to update it as needed.
        You can also&nbsp;<strong>change</strong>&nbsp;your password from that
        page as well.
      </p>
    </details>
  </Segment>
);
