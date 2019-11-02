import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      Dedication
    </Header>
    <p>
      I have never understood why creative works like books have dedications,
      but equally daunting works of digital creativity do not. Well, we are
      going to take a small step towards changing all that by dedicating
      Quizdini to&nbsp;
      <strong>two extraordinary people</strong>&nbsp;that were taken from us far
      too early:
    </p>
    <Header size="large">
      George Ogg
      <Header.Subheader>Musician &bull; Teacher</Header.Subheader>
    </Header>
    <div
      style={{
        padding: '56.25% 0 0 0',
        position: 'relative',
        marginBottom: '1rem'
      }}
    >
      <iframe
        allow="autoplay; fullscreen"
        allowFullScreen
        frameBorder="0"
        src="https://player.vimeo.com/video/18706747?loop=1&byline=0&portrait=0"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%'
        }}
        title="george-ogg-sleepwalk"
      ></iframe>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
    <p>
      George Ogg was an incredible musician, performer, and teacher. While many
      teachers tend to gravitate to either of two polar extremes&mdash;theorist
      or practitioner&mdash;<strong>George was different</strong>. He espoused
      what could best be described as a&nbsp;
      <strong>&quot;Renaissace Approach&quot;</strong>&nbsp;to learning the
      guitar and the creative process, more generally. He incorporated theory,
      trial-and-error, intuition, experience, and passion into his teaching to
      the benefit of his pupils.
    </p>
    <p>
      His legacy lives on through the hundreds of&nbsp;
      <strong>students he impacted</strong>&nbsp;and to whom he&nbsp;
      <strong>gave so much</strong>, including yours truly.
    </p>
    <Divider />
    <Header size="large">
      Donna K. Atherton
      <Header.Subheader>Business Executive &bull; Mother</Header.Subheader>
    </Header>
    <div
      style={{
        padding: '56.25% 0 0 0',
        position: 'relative',
        marginBottom: '1rem'
      }}
    >
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        src="https://www.youtube-nocookie.com/embed/bJcGyM9fzSU?rel=0"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%'
        }}
        title="dka-celebration-of-life"
      ></iframe>
    </div>
    <p>
      Donna Atherton was not only my mom but she was also an&nbsp;
      <strong>accomplished businessperson</strong>. At a time when many thought
      woman ill-suited to serve in any kind of leadership role, she&nbsp;
      <strong>defied the odds</strong>&mdash;and the stereotypes&mdash;to
      achieve great success.
    </p>
    <p>
      My mom always&nbsp;<strong>wanted to become a teacher</strong> and
      she originally attended&nbsp;
      <a
        href="https://www.fortlewis.edu/"
        rel="noopener noreferrer"
        target="_blank"
        title="Fort Lewis College | Durango, Colorado"
      >
        Fort Lewis College
      </a>
      &nbsp;to that end, but life, ultimately, took her in another direction
      before she could complete her studies. As with any mother, her
      legacy&nbsp;
      <strong>lives on through her children</strong>&nbsp;and grandchildren. To
      me, every person that benefits from Quizdini represents, in some strange
      way, a realization of&nbsp;<strong>her childhood dream</strong>.
    </p>
  </Segment>
);
