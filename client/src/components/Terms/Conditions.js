import React from 'react';
import { Header, List, Segment } from 'semantic-ui-react';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      Quizdini Terms &amp; Conditions
    </Header>
    <Header size="medium">
      Effective Date: July 9<sup>th</sup>, 2019
    </Header>
    <p>
      Please read these Terms and Conditions carefully before using Quizdini and
      understand that every time you visit this website, use its services, or
      make a purchase, you are&nbsp;
      <strong>accepting the conditions of this agreement</strong>.
    </p>
    <p>
      If you feel that you are unable or unwilling to do abide by and comply
      with the items outlined below, please do not use this service. Obviously,
      we will miss you, but if you can't <strong>play by the rules</strong>, you
      gotta go.
    </p>
    <Header size="large">Basic Terms of Use</Header>
    <List as="ul" bulleted>
      <List.Item as="li">
        You must be <strong>at least 13 years old</strong> to create or use an
        account with Quizdini. (You can, and should, feel free to play the games
        at any age, however.)
      </List.Item>
      <List.Item as="li">
        Quizdini was designed for the creative use of&nbsp;
        <strong>individual teachers</strong>. No student, class, or group
        accounts will be allowed.
      </List.Item>
      <List.Item as="li">
        Given the educational intent of this tool, let's keep things&nbsp;
        <strong>school appropriate</strong>. Users may not post violent, sexual,
        descriminatory, or otherwise icky content via the site.
      </List.Item>
      <List.Item as="li">
        All content published on this site is propery of Quizdini and/or its
        content creators and is protected by&nbsp;
        <strong>international copyright laws</strong>.
      </List.Item>
      <List.Item as="li">
        If you create an account, which we certainly hope you do,&nbsp;
        <strong>you are solely responsible</strong> for maintaining the
        confidentiality of your private user details, as well as all activities
        that occur under your account.
      </List.Item>
      <List.Item as="li">
        We reserve <strong>all rights</strong> to terminate accounts as well as
        edit or remove content at our sole discretion.
      </List.Item>
    </List>
  </Segment>
);
