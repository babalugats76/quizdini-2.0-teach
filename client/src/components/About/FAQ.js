import React from "react";
import { Header, Step } from "semantic-ui-react";
import Icon from "../UI/Icon";

export default () => (
  <React.Fragment>
    <Header as="h1">Frequently Asked Questions</Header>
    <Header as="h2">What is Quizdini?</Header>
    <p>
      Quizdini - created by teachers, for teachers - is the answer to so many of
      the expensive and restrictive options that currently exist in the online
      educational game market. Quizdini allows teachers to quickly and easily
      create and customize engaging activities for their students!
    </p>
    <Header as="h2">Who should use it?</Header>
    <p>
      As an evolving tool, Quizdini allows YOU to create the material your
      students will use. Will we write your questions for you? No. Will we
      support you as you build a collection of activities that help your
      students learn, practice, and review? Heck, yes!
    </p>
    <Header as="h2">What makes Quizdini different?</Header>
    <p>
      At Quizdini, our goal is to help you teach and your students learn! Since
      we wouldn't want anyone tracking our children - a practice we actually
      find quite creepy - we don't advertise or store sensitive information
      about your students. We don’t believe in behavioral targeting and all that
      goes with it, so we are committed to providing you a simple easy-to-use,
      easy-to-control system that helps you help your students without crossing
      boundaries.
    </p>
    <Header as="h2">So, like, how does it work?</Header>
    <p>
      Simple! Just follow the steps below and you'll have a fun and effective
      learning tool in the hands of your students before you realize it!
    </p>
    <Step.Group vertical attached="bottom" size="small">
    <Step>
      <Icon icon='plus' />
      <Step.Content>
        <Step.Title>Create account</Step.Title>
        <Step.Description>Check your email to verify!</Step.Description>
      </Step.Content>
    </Step>
    <Step>
      <Icon icon='dollar-sign' />
      <Step.Content>
        <Step.Title>Purchase Credits</Step.Title>
        <Step.Description>Pay-as-you-go for what
        you need</Step.Description>
      </Step.Content>
    </Step>
    <Step>
      <Icon icon='edit' />
      <Step.Content>
        <Step.Title>Design Your Game</Step.Title>
        <Step.Description>Enter terms and definitions, or
        upload a csv</Step.Description>
      </Step.Content>
    </Step>
    <Step>
      <Icon icon='link' />
      <Step.Content>
        <Step.Title>Copy URL</Step.Title>
        <Step.Description>Watch your students drag and learn
        you need</Step.Description>
      </Step.Content>
    </Step>
    </Step.Group>
    <ul>
      <li>
      <Icon icon="plus"/><strong>Create</strong> account: Check your email to verify!
      </li>
      <li>
      <Icon icon="dollar-sign"/><strong>Purchase</strong> credits: Pay-as-you-go lets you buy only what
        you need
      </li>
      <li>
      <Icon icon="edit"/><strong>Design</strong> your game: Enter your terms and definitions, or
        upload a csv
      </li>
      <li>
      <Icon icon="link"/><strong>Copy</strong> the URL and watch your students drag and learn!
      </li>
    </ul>
    <Header as="h2">
      What sort of technical vetting has Quizdini gone through?
    </Header>
    <p>
      Behind it all, Quizdini is created and maintained by humans, so we'll
      admit the teeny-tiny potential of the occasional glitch in the system.
      That said, we have worked hard and will continue to do so to make sure
      that Quizdini is ready to use by both you and your students on as many
      different browswers and devices as possible.
    </p>
    <p>
      As part of our due-diligence, we have done our best to make sure that
      Quizdini works well in most modern browsers: Internet Explorer, Firefox
      and Chrome. We’ve also successfully played it on a variety of iPhones and
      Android tablets and phones.
    </p>
    <p>
      Techy note: In order to play, please make sure that cookies are enabled in
      your browser and that your system can handle JavaScript.
    </p>
    <Header as="h2">
      But why again can't I access individual student scores?
    </Header>
    <p>
      As we said earlier, it just doesn't feel right to us to hold on to
      personal information about your students. While we aim to provide you with
      valuable information about the overall "play" of your game, we will not
      track individual students.
    </p>
  </React.Fragment>
);
