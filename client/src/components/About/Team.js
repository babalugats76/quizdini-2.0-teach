import React from "react";
import { Dimmer, Divider, Header, Image, Segment } from "semantic-ui-react";

export default () => (
  <div basic id="team">
    <Segment basic textAlign="center">
      <Header as="h1">The Team</Header>
    </Segment>
      <div className="team-member">
        <Segment.Group>
          <Segment
            basic
            className="team-member-top"
            style={{ backgroundColor: "rgba(50,50,50,.01)" }}>
            <Segment basic>
              <Header as="h2" className="member-name-role">
                James Colestock
                <Header.Subheader>Creator &bull; Developer</Header.Subheader>
              </Header>
            </Segment>
          </Segment>
          <Segment basic className="team-member-middle">
            <Segment basic className="bio">
              <Image
                alt="James Colestock with Dooder"
                circular
                floated="right"
                fluid
                inline
                spaced
                src="https://static.quizdini.com/images/james-and-dooder.jpg"
                style={{ maxWidth: "200px", marginTop: "4em" }}
              />
              <p>
                James Colestock is originally from&nbsp;
                <a
                  href="https://www.visitfortwayne.com/"
                  target="_blank"
                  title="Visit Fort Wayne, IN">
                  Fort Wayne, IN
                </a>
                &nbsp;, a Midwestern town equidistant from Chicago, Detroit, and
                Cincinnati.
              </p>
              <p>
                He is a graduate of&nbsp;
                <a
                  href="http://homestead.sacs.k12.in.us/"
                  target="_blank"
                  title="Homestead High School">
                  Homestead High School
                </a>
                &nbsp;and of nearby&nbsp;
                <a
                  href="https://www.pfw.edu/"
                  target="_blank"
                  title="Purdue University Fort Wayne">
                  Indiana-Purdue at Fort Wayne
                </a>
                &nbsp;where he studied Business Administration and Computer
                Science.
              </p>
              <p>
                Before seguing into Education, James had a successful
                Information Technology career, primarily as a Database
                Administrator and Developer. He worked within organizations of
                every conceivable size&mdash;from startup to Fortune 500&mdash; and gained experience within nearly every sector
                of the economy.
              </p>
              <p>
                He holds multiple industry certifications and is a licensed
                teacher (grades 6-12) as well as Career and Technical Education (CTE)
                educator.
              </p>
            </Segment>
          </Segment>
          <Segment
            basic
            className="team-member-bottom"
            style={{ backgroundColor: "rgba(50,50,50,.01)" }}>
            <Segment basic className="contact">
              Bottom Content Goes Here...
            </Segment>
          </Segment>
        </Segment.Group>
      </div>
      <Divider section clearing />
  </div>
);
