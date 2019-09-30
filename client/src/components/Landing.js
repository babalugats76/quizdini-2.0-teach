import React from "react";
import { Segment, Image, Divider, Header, Grid } from "semantic-ui-react";

const Landing = () => {
  return (
    <Segment id="intro" as="section" vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header size="huge" textAlign="center">
              EdTech that's Lit!
            </Header>
            <p>
              Simple and effective, Quizdini allows you to create engaging,
              online practice activities that your students will think are #cra.
              OK, OK, maybe they will just do them...
            </p>
            <Header size="small">Our Mission</Header>
            <p>
              To put as many worksheet-fueled, Fyre Fest-inspired classroom
              dumpster fires out as possible by empowering teachers with the
              tools to bring drill n' <del>kill</del> thrill opportunities to
              their students.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6} textAlign="center">
            <Image
              styles={{ maxWidth: "300px" }}
              fluid
              src="/img/dumpster-fire.gif"
              centered
            />
            <p className="caption">
              <em>
                "Hey, hey...ho, ho...
                <br />
                all those worksheets got 'ta go!"
              </em>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Divider />
      </Grid>
    </Segment>
  );
};

export default Landing;
