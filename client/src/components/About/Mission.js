import React from "react";
import { Divider, Header, Image, Segment } from "semantic-ui-react";

import logo from "../../logo.svg";

//Raleway for p, li; line height 1.5em for p, 1.4 for em//

export default () => (
  <div>
    <Header as="h1" attached="top">
      <Header.Content>Quizdini - Doing EdTech Differently</Header.Content>
    </Header>
    <Segment Divider>
      <Image
        alt="Quizdini Logo"
        floated="right"
        className="logo"
        size="medium"
        src={logo}
      />
      <p> Better stuff
        </p>
    </Segment>
  </div>
);
