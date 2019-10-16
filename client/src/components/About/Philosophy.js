import React from 'react';
import { Header, Icon, Image, Segment } from 'semantic-ui-react';
import logo from '../../logo.svg';
import measuringTape from '../../measuring-tape.svg';
import payToPlay from '../../pay-to-play.svg';
import easel from '../../easel.svg';

export default () => (
  <div id="philosophy">
    <Segment basic textAlign="center">
      <Header as="h1">Philosophy</Header>
    </Segment>
    <div className="belief" style={{ marginBottom: '2rem' }}>
      <Header as="h2" icon textAlign="center" style={{ margin: '0 auto 1rem' }}>
        <Image
          alt="Measuring Tape"
          className="icon measuring-tape"
          src={measuringTape}
          style={{ height: '100px', marginBottom: '1rem' }}
        />
        <Header.Content>
          &quot;Everything is Formative &amp;<br/>Formative is Everything&quot;
        </Header.Content>
      </Header>
      <p>Paragraph 1
      </p>
      <p>
        Paragraph 2
      </p>
      <p>
        Paragraph 3
      </p>
    </div>
    <div className="belief" style={{ marginBottom: '2rem' }}>
      <Header as="h2" icon textAlign="center" style={{ margin: '0 auto 1rem' }}>
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
      <Header as="h2" icon textAlign="center" style={{ margin: '0 auto 1rem' }}>
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
  </div>
);
