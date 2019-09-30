import React from 'react';
import PropTypes from 'prop-types';
import { Image, Item, Label, Segment } from 'semantic-ui-react';
import avatar from '../../avatar.svg';

const { format } = require('date-fns');

const AccountSummary = ({
  createDate,
  email,
  fullName,
  googleId,
  googlePicture,
  username
}) => {
  /* Use Google-provided avatar; otherwise, placeholder */
  const picture = googlePicture || avatar;

  return (
    <Segment basic className="account-summary">
      <Item.Group>
        <Item>
          <Image avatar size="small" spaced="right" src={picture} />
          <Item.Content verticalAlign="middle">
            <Item.Header className="fullname">{fullName}</Item.Header>
            {username ? (
              <Item.Description className="username">
                {username}
              </Item.Description>
            ) : null}
            <Item.Description className="email">{email}</Item.Description>
            <Item.Extra attached="top" className="since">
              Since&nbsp;{format(createDate, "MMM. 'YY")}
            </Item.Extra>
            <Label attached="top right">
              {googleId ? 'Google account' : 'Local account'}
            </Label>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

AccountSummary.propTypes = {
  createDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  googleId: PropTypes.string,
  googlePicture: PropTypes.string,
  username: PropTypes.string
};

export default AccountSummary;
