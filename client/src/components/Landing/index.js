import React from 'react';
import {
  Container,
  Grid,
  Header,
  Image,
} from 'semantic-ui-react';

const index = () => {
  return (
    <main id="landing">
      <section id="intro" as="div" className="banner">
        <Container text>
          <Image
            centered
            fluid
            src="/images/logo.png"
            style={{ maxWidth: '480px' }}
          />
          <Header id="slogan" size="huge" textAlign="center">
            <Header.Content>EdTech That&apos;s Lit!</Header.Content>
          </Header>
        </Container>
      </section>
      <section as="div" className="banner stripe purple" />
      <section id="selling-points" as="div" className="banner">
        <Container>
          <Grid centered columns="equal" divided stackable>
            <Grid.Column textAlign="center">
              Simple, fast, and effective, Quizdini allows you to create
              engaging, online practice activities that your students will think
              are #cra. OK, OK, maybe they will just do them...
            </Grid.Column>
            <Grid.Column textAlign="center">
              Simple, fast, and effective, Quizdini allows you to create
              engaging, online practice activities that your students will think
              are #cra. OK, OK, maybe they will just do them...
            </Grid.Column>
            <Grid.Column textAlign="center">
              Simple, fast, and effective, Quizdini allows you to create
              engaging, online practice activities that your students will think
              are #cra. OK, OK, maybe they will just do them...
            </Grid.Column>
          </Grid>
        </Container>
      </section>
      <section id="mission" as="div" className="banner">
        <Container>
          <Grid centered columns="equal" stackable>
            <Grid.Column id="mission" verticalAlign="middle">
              <Header size="huge" textAlign="center">
                <Header.Content>Our Mission</Header.Content>
              </Header>
              <p>
                <span className="quote">&quot;</span>To put out as many
                worksheet-fueled, Fyre Fest-inspired classroom dumpster fires as
                possible by&nbsp;<strong>empowering teachers</strong>&nbsp;with
                the tools to bring drill n&apos; <del>kill</del> thrill
                opportunities to their students.
                <span className="quote">&quot;</span>
              </p>
            </Grid.Column>
            <Grid.Column verticalAlign="top">
              <Image
                centered
                fluid
                src="/images/dumpster-fire.gif"
                style={{ maxWidth: '320px' }}
              />
              <p className="caption">
                <em>
                  "Hey, hey...ho, ho...
                  <br />
                  all those worksheets got &apos;ta go!"
                </em>
              </p>
            </Grid.Column>
          </Grid>
        </Container>
      </section>
    </main>
  );
};

export default index;
