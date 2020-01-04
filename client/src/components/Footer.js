import React from 'react';
import { Container, Grid, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Icon from './UI/Icon';

const Footer = props => {
  return (
    <Segment as="footer" id="footer" inverted vertical>
      <Container textAlign="center">
        <Grid columns={3} stackable inverted verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <List divided horizontal inverted link size="big">
                <List.Item key="about" as={Link} to="/about" tabIndex={-1}>
                  About
                </List.Item>
                <List.Item key="terms" as={Link} to="/terms" tabIndex={-1}>
                  Terms
                </List.Item>
                <List.Item
                  key="contact"
                  href="mailto:james@colestock.com"
                  tabIndex={-1}
                >
                  Contact Us
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List divided horizontal inverted link size="big">
                <List.Item
                  as="a"
                  href="https://twitter.com/quizdini"
                  key="twitter"
                  style={{ fill: '#ffffff' }}
                  tabIndex={-1}
                  target="_blank"
                  title="Follow us on Twitter"
                >
                  <Icon name="twitter" />
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.youtube.com/user/quizdini"
                  key="youtube"
                  style={{ fill: '#ffffff' }}
                  tabIndex={-1}
                  target="_blank"
                  title="Check us out on YouTube"
                >
                  <Icon name="youtube" />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List horizontal inverted divided link size="big">
                <List.Item>Copyright &copy; Quizdini, 2013-2020</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
