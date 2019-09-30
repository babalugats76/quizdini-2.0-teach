const copyToClipboard = text => {
  // If navigator.clipboard (synchronous Clipboard API) is supported, use it
  // See https://caniuse.com/#feat=clipboard for browser support

  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }

  // Otherwise, use document.execCommand() fallback
  // which involves creating and deleting DOM elements
  // See https://caniuse.com/#search=execCommand for browser support

  // Put the text to copy into a <span>
  var span = document.createElement('span');
  span.textContent = text;

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre';

  // Add the <span> to the page
  document.body.appendChild(span);

  // Make a selection object representing the range of text selected by the user
  var selection = window.getSelection();
  var range = window.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range);

  // Copy text to the clipboard
  var success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (err) {
    console.log('error', err);
  }

  // Cleanup
  selection.removeAllRanges();
  window.document.body.removeChild(span);

  // The Async Clipboard API returns a promise that may reject with `undefined`
  // eslint-disable-line prefer-promise-reject-errors
  return success ? Promise.resolve() : Promise.reject();
};

export { copyToClipboard };
