import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import measuringTape from '../../measuring-tape.svg';
import payToPlay from '../../pay-to-play.svg';
import easel from '../../easel.svg';

export default props => (
  <Segment {...props}>
    <Header size="huge" textAlign="center">
      Philosophy
    </Header>
    <br />
    <div className="belief" id="creativity">
      <Header size="large" icon textAlign="center">
        <Image alt="Easel" className="icon easel" src={easel} />
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
        about nature? A handful of organic compounds comprise most life.
        Aren&apos;t sports just a ball and some rules? And Oregami? Doesn&apos;t
        the same flat, square sheet of paper yield infinite sculptural
        possibilities?
      </p>
      <p>
        Although often overlooked,&nbsp;
        <strong>this maxim applies squarely to technology</strong> as well.
        Computers helped us land on the moon, yet relatively basic technological
        stuffs, like memes and selfies, rule the day. Swipe left, swipe right,
        not exactly augmented reality, huh? Think that a podcast is just
        on-demand radio? Me too!
      </p>
      <p>
        Since Quizdini is targeted at the same audience that&nbsp;
        <strong>still uses popscicle sticks</strong> to call upon students at
        random, we are proud of creating tools that could be characterized as
        &quot;spartan&quot; and that&nbsp;
        <strong>call upon teachers&apos; creativity</strong>. After all, we
        teachers truly shine when we have a little less to work with.
      </p>
    </div>
    <div className="belief" id="formative">
      <Header size="large" icon textAlign="center">
        <Image
          alt="Measuring Tape"
          className="icon measuring-tape"
          src={measuringTape}
        />
        <Header.Content>&quot;Everything Is Formative&quot;</Header.Content>
      </Header>
      <p>
        They say that &quot;you never stop learning.&quot; If that is true, then
        that must also mean that you never stop receiving feedback. As
        teachers,&nbsp;<strong>we are merely facilitators</strong> of the
        learning process: a veritable infinite loop of practice interlaced with
        feedback. Take away formative assessment, especially of the informal
        variety, and the &quot;wheels of learning&quot; grind to an
        unceremonious halt.
      </p>
      <p>
        In reality, most educators are not teaching rocket science&mdash;neither
        literally nor figuratively&mdash;so success centers around the ability
        to orchestrate the learning process in such a way that&nbsp;
        <strong>every student receives the feedback they need</strong>, how they
        need it, when they need it. Under ideal circumstances, students
        themselves would be empowered with tools to track their own progress.
      </p>
      <p>
        Our goal at Quizdini is to make tools that are consistent with this
        principle. To provide teacher and student alike with tools that
        &quot;keep the wheels turning.&quot; To us,&nbsp;
        <strong>empowering teachers</strong> with what they need and&nbsp;
        <strong>trusting their judgement</strong> is the way forward vis-à-vis
        our embattled Education system.
      </p>
    </div>
    <div className="belief" id="pay-to-play">
      <Header size="large" icon textAlign="center">
        <Image alt="Pay to Play" className="icon pay-to-play" src={payToPlay} />
        <Header.Content>&quot;You Gotta Pay to Play&quot;</Header.Content>
      </Header>
      <p>
        It&apos;s true:&nbsp;
        <strong>there is no such thing as a free lunch</strong>. In reality, all
        digital stuff costs money to produce. Notwithstanding labor, there are
        significant cloud-computing costs, etc., involved in bringing technology
        to the Interwebs. Unless you want to wake up with a horsehead in your
        bed,&nbsp;<strong>someone has to bear the costs</strong>.
      </p>
      <p>
        Other ostensibly &quot;free&quot; services, provided by technology
        behemoths&mdash;and those espousing their business models&mdash;require
        you to&nbsp;<strong>sacrifice your privacy</strong> and, ipso facto, the
        privacy of your students, to use them.
      </p>
      <p>
        In truth,&nbsp;<strong>your data is big business</strong>. Always
        considered yourself kind of a big deal? Well, consider it confirmed! Big
        Tech uses the information they collect to&nbsp;
        <strong>track you</strong> and to serve you targeted, behavioral
        advertising. Oh, and they&nbsp;<strong>sell your data</strong> to a
        small cadre of shady data brokers too. Admittedly, our technology is
        simpleton in comparison, but we designed things to provide the&nbsp;
        <strong>functionality you need without the intrusion</strong>, that
        frankly, you don&apos;t.
      </p>
      <p>
        Our bargain is a simple one:&nbsp;<strong>pay for what you use</strong>{' '}
        and have&nbsp;<strong>peace of mind</strong>. Call it a little
        old-fashioned, but having a little "skin in the game" can be a good
        thing. Think of it as supporting "the local paper" of the EdTech world.
      </p>
    </div>
  </Segment>
);
