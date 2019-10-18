import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      Quizdini Cookie Policy
    </Header>
    <Header size="large">What is a Cookie?</Header>
    <p>Not just for fuzzy blue monsters anymore, people!</p>
    <p>
      They may not be as tasty as Grandma used to make them, but they are almost
      as popular these days! A cookie, at least in our world, is a
      <strong>tiny file</strong>
      placed on your device that <strong>allows us to remember you</strong> and
      make your next visit easier and more efficient.
    </p>
    <Header size="large">
      What Kinds of Cookies Does Quizdini Use and Why?
    </Header>
    <p>
      Unlike many sites, Quizdini uses only what are called&nbsp;
      <strong>session cookies</strong>, which&nbsp;
      <strong>do not collect personally-identifying information</strong>. These
      guys are kind of like those oatmeal raisin classics: still a cookie, but
      almost good for you! These session cookies&nbsp;
      <strong>help you stay logged in</strong> to your account while you work.
    </p>
    <p>
      In case you were wondering about advertising, let's put your mind at ease
      about <em>those</em> cookies for a moment. Since we don't allow
      advertising on Quizdini, you <strong>never have to worry</strong> about
      what crazy third party rando is hovering in the dark shadows, just waiting
      to steal your info. We apologize if that comes as a disappointment, but
      it's just not our thing.
    </p>
    <Header size="large">No Cookies for You!</Header>
    <p>
      If you'd like to delete cookies or instruct your web browser to delete or
      refuse cookies, please&nbsp;
      <strong>visit the help pages of your web browser</strong>.
    </p>
    <p>
      Please note, though, that if you delete cookies or refuse to accept them,
      you may not be able to use all of the features we offer or store your
      preferences, and some of our pages might not display properly.
    </p>
  </Segment>
);
