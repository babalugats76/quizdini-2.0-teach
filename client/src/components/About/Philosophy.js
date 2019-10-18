import React from 'react';
/*eslint-disable */
import { Header, Icon, Image, Segment } from 'semantic-ui-react';
/*eslint-disable */
import logo from '../../logo.svg';
import measuringTape from '../../measuring-tape.svg';
import payToPlay from '../../pay-to-play.svg';
import easel from '../../easel.svg';

export default ({ id }) => (
  <Segment as="section" id={id} padded="very">
    <Header size="huge" textAlign="center">
      Philosophy
    </Header>
    <br />
    <div className="belief" style={{ marginBottom: '2rem' }}>
      <Header
        size="large"
        icon
        textAlign="center"
        style={{ margin: '0 auto 1rem' }}
      >
        <Image
          alt="Pay to Play"
          className="icon easel"
          src={easel}
          style={{ height: '125px', marginBottom: '1rem' }}
        />
        <Header.Content>
          &quot;Creativity Is in the Constraints&quot;
        </Header.Content>
      </Header>
      <p>
        Contrary to popular belief,&nbsp;
        <a
          href="https://www.fastcompany.com/3067925/how-constraints-force-your-brain-to-be-more-creative"
          rel="noopener noreferrer"
          target="_blank"
          title="How Constraints Force Your Brain To Be More Creative"
        >
          constraints force your brain to be more creative
        </a>
        . Consider music: there are just 12 tones in the chromatic scale. How
        about nature: a handful of organic compounds comprise most life. Aren't
        sports just a ball and some rules? And Oregami? Doesn't the same flat,
        square sheet of paper yield infinite sculptural possibilities? I think
        you get where I am calling from.
      </p>
      <p>
        Although often overlooked, this maxim applies squarely to technology as
        well. Computers helped us land on the moon, yet memes and selfies are
        all the rage. Swipe left, swipe right, not exactly augmented reality,
        huh? Think that a podcast is just on-demand radio? Me too!
      </p>
      <p>
        Since Quizdini is targeted at the same audience that still uses
        popscicle sticks to call upon students at random, we are not ashamed by
        any creation or tool we make that could be characterized as "spartan" or
        that calls upon teachers' creativity; much to the contrary: we celebrate
        it. After all, we teachers truly shine when we have a little less to
        work with.
      </p>
    </div>
    <div className="belief" style={{ marginBottom: '2rem' }}>
      <Header
        size="large"
        icon
        textAlign="center"
        style={{ margin: '0 auto 1rem' }}
      >
        <Image
          alt="Measuring Tape"
          className="icon measuring-tape"
          src={measuringTape}
          style={{ height: '100px', marginBottom: '1rem' }}
        />
        <Header.Content>
          &quot;Everything Is Formative &amp;
          <br />
          Formative Is Everything&quot;
        </Header.Content>
      </Header>
      <p>
        They say that &quot;you never stop learning.&quot; If that is true, then
        that must also mean that you never stop receiving feedback. As teachers,
        we are merely facilitators of the learning process: a veritable infinite
        loop of practice acquiring some skill or knowledge interlaced with
        feedback. Take away formative assessment, especially of the informal
        variety, and the &quot;wheels of learning&quot; grind to an
        unceremonious halt.
      </p>
      <p>
        In reality, most educators are not teaching rocket science&mdash;neither
        literally nor figuratively&mdash;so their success very much centers
        around their ability to orchestrate the learning process in such a way
        that every student receives the feedback they need, how they need it,
        when they need it. Under ideal circumstances, students themselves would
        be empowered with tools that help them self-grade, etc.
      </p>
      <p>
        Our goal at Quizdini is to make tools that are consistent with this
        principle. To provide teacher and student alike with learning tools that
        &quot;keep the wheels turning.&quot; To us, empowering teachers with
        what they need and trusting their judgement is the way forward vis-à-vis
        our embattled Education system. In the end, those espousing high-stakes
        testing or turning teaching into some perverse cross between heartless
        statistics and ivory tower postulates, a la Hattie, are simply on the
        wrong track.
      </p>
    </div>
    <div className="belief" style={{ marginBottom: '2rem' }}>
      <Header
        size="large"
        icon
        textAlign="center"
        style={{ margin: '0 auto 1rem' }}
      >
        <Image
          alt="Pay to Play"
          className="icon pay-to-play"
          src={payToPlay}
          style={{ height: '125px', marginBottom: '1rem' }}
        />
        <Header.Content>&quot;You Gotta' Pay to Play&quot;</Header.Content>
      </Header>
      <p>
        It's true: <strong>there is no such thing as a free lunch</strong>. In
        reality, all digital stuff costs money to produce. Notwithstanding
        labor, there are significant cloud-computing costs, etc., involved in
        bringing technology to the Interwebs. Unless you want to wake up with a
        horsehead in your bed, someone has to bear the costs.
      </p>
      <p>
        Other ostensibly &quot;free&quot; services, provided by technology
        behemoths&mdash;and those espousing their business models&mdash;require
        you to sacrifice your privacy and, ipso facto, the privacy of your
        students, to use them.
      </p>
      <p>
        In truth, your data is big business. Always considered yourself kind of
        a big deal? Well, consider it confirmed. Big Tech uses the information
        they collect to track you and to serve you targeted, behavioral
        advertising. Oh, and they sell your data to a small cadre of shady data
        brokers too. Admittedly, our technology is simpleton in comparison, but
        we designed things to provide the value you need without the intrusion,
        that frankly, you don't.
      </p>
      <p>
        Our bargain is a simple one: pay for what you use and have piece of
        mind. Call it a little old-fashioned, but having a little "skin in the
        game" can be a good thing. Think of it as supporting "the local paper"
        of the EdTech world.
      </p>
    </div>
  </Segment>
);
