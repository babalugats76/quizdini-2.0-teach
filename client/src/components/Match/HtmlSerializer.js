import React from 'react';

import Html from 'slate-html-serializer';

const BLOCK_TAGS = {
  p: 'paragraph'
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
  u: 'underline',
  code: 'code',
  sup: 'superscript',
  sub: 'subscript'
};

const rules = [
  {
    deserialize(el, next) {
      if (BLOCK_TAGS[el.tagName.toLowerCase()] === 'p') {
        return {
          object: 'block',
          type: 'paragraph',
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    // Add a serializing function property to our rule...
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            /**
             * In this case, do not wrap in <p>
             * Return plain text, coupled with HTML mark for styling only
             * (of the children)
             */
            return (<React.Fragment>{children}</React.Fragment>);
          default:
            break;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      /* whitelist of tags */
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'underline':
            return <u>{children}</u>;
          case 'code':
            return <code>{children}</code>;
          case 'superscript':
            return <sup>{children}</sup>;
          case 'subscript':
            return <sub>{children}</sub>;
          default:
            break;
        }
      }
    }
  }
];

const HtmlSerializer = new Html({ rules: rules });

export default HtmlSerializer;