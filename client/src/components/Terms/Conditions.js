/*https://graphicriver.net/item/hands-holding-contract/10536720*/

import React from 'react';
import { Header, Image, List, Segment } from 'semantic-ui-react';
import handsHoldingContract from '../../hands-holding-contract.svg';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      <Header.Content>Terms &amp; Conditions</Header.Content>
      <Header.Subheader>
        Effective Date: January 1<sup>st</sup>, 2020
      </Header.Subheader>
    </Header>
    <Header size="large" icon textAlign="center">
      <Image alt="Hands Holding Contract" className="icon hands-holding-contract" src={handsHoldingContract} />
    </Header>
    <p>
      Please read these Terms and Conditions carefully before using Quizdini and
      understand that every time you visit this website, use its services, or
      make a purchase, you are accepting the&nbsp;
      <strong>conditions of this agreement</strong>.
    </p>
    <List as="ul" bulleted>
      <List.Item as="li">
        You must be <strong>at least 13 years old</strong>&nbsp;to create an
        account
      </List.Item>
      <List.Item as="li">
        <strong>Student</strong>&nbsp;accounts are prohibited
      </List.Item>
      <List.Item as="li">
        <strong>Shared</strong>&nbsp;accounts are prohibited
      </List.Item>
      <List.Item as="li">
        All content must be&nbsp;<strong>school appropriate</strong>
      </List.Item>
      <List.Item as="li">
        All content published on this site is property of Quizdini and/or its
        content creators and is protected by international&nbsp;
        <strong>copyright laws</strong>
      </List.Item>
      <List.Item as="li">
        You are&nbsp;<strong>solely responsible</strong>&nbsp;for all activities that
        occur under your account
      </List.Item>
      <List.Item as="li">
        We reserve the right to&nbsp;<strong>terminate accounts</strong>
        &nbsp;and/or remove content that violates our policies
      </List.Item>
    </List>
  </Segment>
);
