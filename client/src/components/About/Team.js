import React from 'react';
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';

import Icon from '../UI/Icon';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      The Team
    </Header>
    <br />
    <Grid className="member" id="james" stackable>
      <Grid.Row columns={2}>
        <Grid.Column className="member-title" floated="left">
          <Header size="large">
            James Colestock
            <Header.Subheader>Creator &bull; Developer</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column
          className="member-contact"
          floated="right"
          textAlign="right"
        >
          <a
            href="http://www.colestock.com"
            rel="noopener noreferrer"
            target="_blank"
            title="Visit James' Website"
          >
            <Icon name="globe" />
          </a>
          <a
            href="mailto:james@colestock.com"
            rel="noopener noreferrer"
            target="_blank"
            title="Email James"
          >
            <Icon name="mail" />
          </a>
          <a
            href="https://twitter.com/jamescolestock"
            rel="noopener noreferrer"
            target="_blank"
            title="@JamesColestock"
          >
            <Icon name="twitter" />
          </a>
          <a
            href="https://www.youtube.com/c/jamescolestock"
            rel="noopener noreferrer"
            target="_blank"
            title="YouTube - Colestock's Channel"
          >
            <Icon name="youtube" />
          </a>
          <a
            href="https://github.com/babalugats76"
            rel="noopener noreferrer"
            target="_blank"
            title="GitHub - babalugats76"
          >
            <Icon name="github" />
          </a>
          <a
            href="https://www.linkedin.com/in/jamescolestock/"
            rel="noopener noreferrer"
            target="_blank"
            title="Connect on LinkedIn"
          >
            <Icon name="linkedin" />
          </a>
          <a
            href="https://www.udemy.com/user/jamescolestock/"
            rel="noopener noreferrer"
            target="_blank"
            title="Connect on Udemy"
          >
            <Icon name="udemy" viewBox="0 0 144 64" />
          </a>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column className="member-bio">
          <Image
            alt="James Colestock with Dooder"
            circular
            floated="right"
            inline
            size="medium"
            src="https://static.quizdini.com/images/james-and-dooder.jpg"
          />
          <p>
            James Colestock is originally from <strong>Fort Wayne, IN</strong>,
            a Midwestern town equidistant from Chicago, Detroit, and Cincinnati.
          </p>
          <p>
            He is a graduate of&nbsp;
            <a
              href="http://homestead.sacs.k12.in.us/"
              rel="noopener noreferrer"
              target="_blank"
              title="Homestead High School"
            >
              Homestead High School
            </a>
            &nbsp;and of nearby&nbsp;
            <a
              href="https://www.pfw.edu/"
              rel="noopener noreferrer"
              target="_blank"
              title="Purdue University Fort Wayne"
            >
              Indiana-Purdue at Fort Wayne
            </a>
            &nbsp;where he studied Business Administration and Computer Science.
          </p>
          <p>
            Before seguing into Education, James had a successful&nbsp;
            <strong>Information Technology career</strong>, primarily as a
            Database Administrator and Developer. He worked within organizations
            of every conceivable size&mdash;from startup to Fortune 500&mdash;
            and gained experience within nearly every sector of the economy.
          </p>
          <p>
            He holds multiple industry certifications and is a licensed teacher
            (grades 6-12) as well as&nbsp;
            <strong>Career and Technical Education</strong> (CTE) educator.
          </p>
          <p>
            When not feverishly coding Quizdini, he can be found playing
            the&nbsp;<strong>guitar</strong> and rooting on his beloved&nbsp;
            <strong>Chicago Cubs</strong>.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider section clearing />
    <Grid className="member" id="jen" stackable>
      <Grid.Row columns={2}>
        <Grid.Column className="member-title" floated="left">
          <Header size="large">
            Jennifer Colestock
            <Header.Subheader>
              Quality Assurance &bull; Social Media
            </Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column
          className="member-contact"
          floated="right"
          textAlign="right"
        >
          <a
            href="http://profe.colestock.com"
            rel="noopener noreferrer"
            target="_blank"
            title="Visit Jennifer's Website"
          >
            <Icon name="globe" />
          </a>
          <a
            href="mailto:jennifer@colestock.com"
            rel="noopener noreferrer"
            target="_blank"
            title="Email Jennifer"
          >
            <Icon name="mail" />
          </a>
          <a
            href="https://twitter.com/profecolestock"
            rel="noopener noreferrer"
            target="_blank"
            title="@profecolestock"
          >
            <Icon name="twitter" />
          </a>
          <a
            href="https://www.linkedin.com/in/jennifercolestock/"
            rel="noopener noreferrer"
            target="_blank"
            title="Connect on LinkedIn"
          >
            <Icon name="linkedin" />
          </a>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column className="member-bio">
          <Image
            alt="Jennifer Colestock"
            circular
            floated="right"
            inline
            size="medium"
            src="https://static.quizdini.com/images/jennifer.jpg"
          />
          <p>
            Jennifer Colestock grew up in the Pacific Northwest, just outside of{' '}
            <strong>Seattle, WA</strong>.
          </p>
          <p>
            After graduating from&nbsp;
            <a
              href="https://www.lakesideschool.org//"
              rel="noopener noreferrer"
              target="_blank"
              title="Lakeside School"
            >
              Lakeside School
            </a>
            , she went on to&nbsp;
            <a
              href="https://www.whitman.edu/"
              rel="noopener noreferrer"
              target="_blank"
              title="Whitman College"
            >
              Whitman College
            </a>
            &nbsp;where she majored in Spanish. Later, she spent a year abroad
            in Spain as part of her M.A. through&nbsp;
            <a
              href="https://www.middlebury.edu/"
              rel="noopener noreferrer"
              target="_blank"
              title="Middlebury College"
            >
              Middlebury College
            </a>
            .&nbsp;
          </p>
          <p>
            Jennifer has spent <strong>two decades in Education</strong>,
            teaching Spanish to students from middle school to college, and in a
            wide variety of different environments.
          </p>
          <p>
            She is a licensed teacher; she also holds her&nbsp;
            <strong>National Board Certification</strong>.
          </p>
          <p>
            When not asisting with Quizdini, she can be found&nbsp;
            <strong>running</strong>, playing with the best dog ever, or
            planning her next trip.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider section clearing />
  </Segment>
);
