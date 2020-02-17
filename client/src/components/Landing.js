import React from "react";
import { Container, Grid, Header, Image } from "semantic-ui-react";

export default props => {
  return (
    <main id="landing">
      <section id="intro" as="div" className="banner">
        <Container text>
          <Image centered fluid src="/images/logo.png" style={{ maxWidth: "480px" }} />
          <Header id="slogan" size="huge" textAlign="center">
            <Header.Content>EdTech That&apos;s Lit!</Header.Content>
          </Header>
        </Container>
      </section>
      <section id="selling-points" as="div" className="banner">
        <Container>
          <Grid centered columns="equal" divided stackable>
            <Grid.Column className="speed" textAlign="center">
              <Image
                alt="TBD"
                centered
                className="icon"
                src="https://via.placeholder.com/210?text=speedometer"
                style={{ borderRadius: "50%", height: "auto" }}
              />
              <Header size="medium">Create an Activity in a Passing Period</Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Image
                alt="TBD"
                centered
                className="icon"
                src="https://via.placeholder.com/210?text=shield"
                style={{ borderRadius: "50%", height: "auto" }}
              />
              <Header size="medium">Protect Your Students&apos; Privacy</Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Image
                alt="TBD"
                centered
                className="icon"
                src="https://via.placeholder.com/210?text=line+graph"
                style={{ borderRadius: "50%", height: "auto" }}
              />
              <Header size="medium">Adapt Your Instruction With Instant Feedback</Header>
            </Grid.Column>
          </Grid>
        </Container>
      </section>
      <section as="div" className="banner stripe purple" />
      <section id="mission" as="div" className="banner">
        <Container>
          <Grid centered columns="equal" stackable>
            <Grid.Column id="mission-statement" verticalAlign="middle">
              <Header size="huge" textAlign="center">
                <Header.Content>Our Mission</Header.Content>
              </Header>
              <blockquote>
                <span className="quote">&ldquo;</span>To put out as many worksheet-fueled, Fyre
                Fest-inspired classroom dumpster fires as possible by&nbsp;
                <strong>
                  <em>empowering teachers</em>
                </strong>
                &nbsp;with the tools to bring drill n&apos;&nbsp;<del>kill</del>&nbsp;thrill
                opportunities to their students.<span className="quote">&rdquo;</span>
              </blockquote>
            </Grid.Column>
            <Grid.Column>
              <Image centered className="dumpster" fluid src="/images/dumpster-fire.gif" />
              <p className="caption">
                &#x266b;&nbsp;...No, we didn&apos;t light it,
                <br />
                but we&apos;re tryin&apos; to fight it...&nbsp;&#x266b;
              </p>
            </Grid.Column>
          </Grid>
        </Container>
      </section>
    </main>
  );
};
