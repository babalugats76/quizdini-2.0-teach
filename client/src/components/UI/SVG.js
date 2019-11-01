import React from 'react';
import PropTypes from 'prop-types';

/**
 * SVG path content for each icon
 */

const icons = {
  avatar:
    'M16 0c8.839 0 16 7.161 16 16 0 8.786-7.125 16-16 16-8.857 0-16-7.196-16-16 0-8.839 7.161-16 16-16zM27.054 24.125c1.661-2.286 2.661-5.089 2.661-8.125 0-7.554-6.161-13.714-13.714-13.714s-13.714 6.161-13.714 13.714c0 3.036 1 5.839 2.661 8.125 0.643-3.196 2.196-5.839 5.464-5.839 1.446 1.411 3.411 2.286 5.589 2.286s4.143-0.875 5.589-2.286c3.268 0 4.821 2.643 5.464 5.839zM22.857 12.571c0-3.786-3.071-6.857-6.857-6.857s-6.857 3.071-6.857 6.857 3.071 6.857 6.857 6.857 6.857-3.071 6.857-6.857z',
  'credit-card':
    'M4 4c-1.104 0-2.107 0.449-2.828 1.172s-1.172 1.724-1.172 2.828v16c0 1.104 0.449 2.107 1.172 2.828s1.724 1.172 2.828 1.172h24c1.104 0 2.107-0.449 2.828-1.172s1.172-1.724 1.172-2.828v-16c0-1.104-0.449-2.107-1.172-2.828s-1.724-1.172-2.828-1.172zM29.333 12h-26.667v-4c0-0.368 0.148-0.7 0.391-0.943s0.575-0.391 0.943-0.391h24c0.368 0 0.7 0.148 0.943 0.391s0.391 0.575 0.391 0.943zM2.667 14.667h26.667v9.333c0 0.368-0.148 0.7-0.391 0.943s-0.575 0.391-0.943 0.391h-24c-0.368 0-0.7-0.148-0.943-0.391s-0.391-0.575-0.391-0.943z',
  edit:
    'M14.667 4h-9.333c-1.104 0-2.107 0.449-2.828 1.172s-1.172 1.724-1.172 2.828v18.667c0 1.104 0.449 2.107 1.172 2.828s1.724 1.172 2.828 1.172h18.667c1.104 0 2.107-0.449 2.828-1.172s1.172-1.724 1.172-2.828v-9.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333v9.333c0 0.368-0.148 0.7-0.391 0.943s-0.575 0.391-0.943 0.391h-18.667c-0.368 0-0.7-0.148-0.943-0.391s-0.391-0.575-0.391-0.943v-18.667c0-0.368 0.148-0.7 0.391-0.943s0.575-0.391 0.943-0.391h9.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333zM23.724 2.391l-12.667 12.667c-0.163 0.161-0.289 0.373-0.351 0.62l-1.333 5.333c-0.052 0.2-0.056 0.424 0 0.647 0.179 0.715 0.903 1.149 1.617 0.971l5.333-1.333c0.223-0.055 0.44-0.172 0.62-0.351l12.667-12.667c0.812-0.812 1.219-1.88 1.219-2.943s-0.407-2.131-1.219-2.943-1.881-1.22-2.944-1.22-2.131 0.407-2.943 1.219zM25.609 4.276c0.292-0.292 0.672-0.437 1.057-0.437s0.765 0.145 1.057 0.437 0.437 0.672 0.437 1.057-0.145 0.765-0.437 1.057l-12.405 12.405-2.819 0.705 0.705-2.819z',
  key:
    'M25.333 7.219l2.115 2.115-2.781 2.781-2.115-2.115zM14.251 16.431c1.179 1.164 1.775 2.693 1.785 4.229 0.011 1.537-0.565 3.075-1.729 4.255s-2.693 1.776-4.231 1.785-3.075-0.565-4.255-1.729l-0.056-0.056c-1.165-1.18-1.74-2.717-1.729-4.255s0.607-3.067 1.785-4.231c1.172-1.156 2.697-1.732 4.225-1.728 1.521 0.003 3.037 0.58 4.203 1.728zM24.391 4.391c-0.521 0.521-0.521 1.365 0 1.885l0.943 0.943 1.885-1.885-0.943-0.943c-0.521-0.521-1.365-0.521-1.885 0zM24.391 4.391c-0.521 0.521-0.521 1.365 0 1.885s1.365 0.521 1.885 0 0.521-1.365 0-1.885-1.365-0.521-1.885 0l-4.667 4.667c-0.521 0.521-0.521 1.365 0 1.885l0.943 0.943 1.885-1.885-0.943-0.943c-0.521-0.521-1.365-0.521-1.885 0s-0.521 1.365 0 1.885 1.365 0.521 1.885 0 0.521-1.365 0-1.885-1.365-0.521-1.885 0l-4.615 4.615c-1.505-1.088-3.283-1.635-5.057-1.639-2.203-0.004-4.411 0.827-6.103 2.497-1.703 1.68-2.564 3.895-2.58 6.111s0.817 4.443 2.497 6.145l0.083 0.083c1.703 1.68 3.929 2.512 6.145 2.497s4.431-0.876 6.111-2.58 2.512-3.929 2.497-6.145c-0.012-1.793-0.579-3.585-1.697-5.095l3.661-3.661 3.057 3.057c0.521 0.521 1.365 0.521 1.885 0l4.667-4.667c0.521-0.521 0.521-1.365 0-1.885l-3.057-3.057 1.724-1.724c0.521-0.521 0.521-1.365 0-1.885s-1.365-0.521-1.885 0z',
  github:
    'M10.667 24.297c-1.153 0.235-1.937 0.161-2.493-0.015-0.308-0.097-0.575-0.235-0.819-0.403-0.548-0.379-0.969-0.9-1.492-1.563-0.475-0.601-1.133-1.476-2.068-1.968-0.247-0.131-0.515-0.236-0.805-0.309-0.715-0.179-1.439 0.256-1.617 0.971s0.256 1.439 0.971 1.617l0.207 0.080c0.336 0.177 0.649 0.539 1.219 1.261 0.488 0.619 1.141 1.464 2.071 2.105 0.443 0.305 0.948 0.568 1.532 0.752 0.949 0.3 2.033 0.373 3.297 0.18l-0.001 2.327c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.16c0-0.028-0.001-0.060-0.003-0.092-0.008-0.112-0.009-0.224-0.005-0.335 0.027-0.759 0.321-1.501 0.887-2.087 0.193-0.199 0.328-0.463 0.365-0.763 0.091-0.731-0.428-1.397-1.159-1.488-0.453-0.056-0.903-0.125-1.341-0.212-1.053-0.208-2.024-0.513-2.863-0.977-1.757-0.972-3.215-2.792-3.215-6.828-0.009-1.476 0.532-2.957 1.632-4.112 0.343-0.365 0.467-0.896 0.284-1.387-0.373-0.999-0.455-2.107-0.188-3.189 0.655 0.143 1.807 0.555 3.529 1.711 0.315 0.209 0.711 0.285 1.101 0.176 2.663-0.743 5.656-0.803 8.627 0.003 0.361 0.097 0.759 0.044 1.091-0.18 1.724-1.155 2.875-1.567 3.529-1.709 0.252 1.021 0.209 2.127-0.188 3.189-0.172 0.469-0.077 1.007 0.284 1.387 1.011 1.060 1.632 2.496 1.632 4.080 0 4.1-1.485 5.927-3.26 6.884-0.831 0.448-1.791 0.74-2.831 0.933-0.429 0.080-0.868 0.141-1.311 0.191-0.28 0.031-0.557 0.152-0.779 0.367-0.529 0.512-0.544 1.356-0.032 1.885 0.089 0.092 0.173 0.191 0.251 0.292 0.455 0.599 0.696 1.353 0.633 2.157 0 0.032-0.001 0.068-0.004 0.104v5.16c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.056c0.069-0.912-0.075-1.791-0.389-2.589 1.036-0.228 2.084-0.569 3.063-1.097 2.777-1.499 4.661-4.323 4.661-9.231 0-2.004-0.688-3.849-1.839-5.308 0.473-1.793 0.301-3.635-0.391-5.244-0.163-0.377-0.479-0.643-0.847-0.752-0.476-0.141-2.309-0.412-5.831 1.816-3.031-0.721-6.076-0.679-8.861-0.003-3.519-2.225-5.351-1.955-5.827-1.813-0.395 0.117-0.695 0.4-0.847 0.753-0.739 1.723-0.832 3.563-0.389 5.243-1.24 1.571-1.849 3.468-1.839 5.356 0 4.829 1.852 7.631 4.588 9.145 1.003 0.555 2.080 0.913 3.143 1.156-0.247 0.624-0.383 1.281-0.405 1.943-0.007 0.188-0.004 0.376 0.007 0.564z',
  globe:
    'M22.601 14.667c-0.285-3.587-1.469-7.137-3.565-10.28 2.093 0.545 3.964 1.643 5.449 3.128 1.877 1.877 3.135 4.371 3.441 7.152zM19.039 27.612c1.977-2.968 3.248-6.471 3.559-10.279h5.329c-0.307 2.781-1.564 5.275-3.441 7.152-1.484 1.484-3.355 2.581-5.447 3.127zM9.399 17.333c0.285 3.587 1.469 7.137 3.565 10.28-2.093-0.545-3.964-1.643-5.449-3.128-1.877-1.877-3.135-4.371-3.441-7.152zM12.961 4.388c-1.976 2.968-3.248 6.471-3.559 10.279h-5.329c0.307-2.781 1.564-5.275 3.441-7.152 1.485-1.484 3.355-2.581 5.447-3.127zM15.996 1.333c-4.048 0.001-7.715 1.644-10.367 4.296-2.653 2.652-4.296 6.321-4.296 10.371s1.643 7.719 4.296 10.371c2.651 2.652 6.317 4.295 10.365 4.296 0.001 0 0.004 0 0.005 0s0.003 0 0.004 0c4.048-0.001 7.715-1.644 10.367-4.296 2.653-2.652 4.296-6.321 4.296-10.371s-1.643-7.719-4.296-10.371c-2.651-2.652-6.317-4.295-10.365-4.296-0.001 0-0.004 0-0.005 0s-0.003 0-0.004 0zM19.928 17.333c-0.336 3.717-1.755 7.147-3.927 9.935-2.305-2.961-3.608-6.424-3.927-9.935zM15.999 4.732c2.305 2.961 3.608 6.424 3.927 9.935h-7.853c0.336-3.717 1.755-7.147 3.927-9.935z',
  link:
    'M12.265 18.132c1.323 1.769 3.24 2.835 5.264 3.127s4.164-0.189 5.933-1.512c0.319-0.239 0.62-0.5 0.873-0.757l3.993-3.992c1.551-1.605 2.296-3.668 2.261-5.713s-0.852-4.081-2.441-5.615c-1.563-1.509-3.585-2.256-5.599-2.244-1.989 0.011-3.977 0.761-5.516 2.244l-2.308 2.295c-0.523 0.519-0.525 1.364-0.005 1.885s1.364 0.525 1.885 0.005l2.279-2.265c1.027-0.989 2.351-1.489 3.68-1.497 1.345-0.008 2.689 0.489 3.731 1.496 1.060 1.024 1.604 2.377 1.628 3.744s-0.473 2.739-1.48 3.781l-4.007 4.008c-0.152 0.155-0.351 0.329-0.571 0.493-1.18 0.883-2.603 1.203-3.956 1.008s-2.628-0.904-3.509-2.084c-0.441-0.589-1.276-0.711-1.867-0.269s-0.711 1.276-0.269 1.867zM19.735 13.868c-1.323-1.769-3.24-2.835-5.264-3.127s-4.165 0.189-5.935 1.512c-0.319 0.239-0.619 0.5-0.873 0.757l-3.993 3.992c-1.551 1.605-2.296 3.668-2.261 5.713s0.852 4.081 2.441 5.615c1.563 1.509 3.585 2.256 5.599 2.244 1.989-0.011 3.977-0.761 5.516-2.244l2.297-2.297c0.521-0.521 0.521-1.365 0-1.885s-1.365-0.521-1.885 0l-2.261 2.265c-1.027 0.989-2.351 1.489-3.68 1.497-1.345 0.008-2.689-0.489-3.731-1.496-1.060-1.024-1.604-2.377-1.628-3.744s0.473-2.739 1.48-3.781l4.007-4.008c0.152-0.155 0.351-0.329 0.571-0.493 1.18-0.883 2.603-1.203 3.956-1.008s2.628 0.904 3.509 2.084c0.441 0.589 1.276 0.711 1.867 0.269s0.711-1.276 0.269-1.867z',
  linkedin:
    'M21.333 9.333c-2.577 0-4.912 1.047-6.6 2.733s-2.733 4.023-2.733 6.6v9.333c0 0.736 0.597 1.333 1.333 1.333h5.333c0.736 0 1.333-0.597 1.333-1.333v-9.333c0-0.368 0.148-0.7 0.391-0.943s0.575-0.391 0.943-0.391 0.7 0.148 0.943 0.391 0.391 0.575 0.391 0.943v9.333c0 0.736 0.597 1.333 1.333 1.333h5.333c0.736 0 1.333-0.597 1.333-1.333v-9.333c0-2.577-1.047-4.912-2.733-6.6s-4.023-2.733-6.6-2.733zM21.333 12c1.841 0 3.507 0.745 4.715 1.952s1.952 2.873 1.952 4.715v8h-2.667v-8c0-1.104-0.449-2.107-1.172-2.828s-1.724-1.172-2.828-1.172-2.107 0.449-2.828 1.172-1.172 1.724-1.172 2.828v8h-2.667v-8c0-1.841 0.745-3.507 1.952-4.715s2.873-1.952 4.715-1.952zM2.667 10.667c-0.736 0-1.333 0.597-1.333 1.333v16c0 0.736 0.597 1.333 1.333 1.333h5.333c0.736 0 1.333-0.597 1.333-1.333v-16c0-0.736-0.597-1.333-1.333-1.333zM4 13.333h2.667v13.333h-2.667zM9.333 5.333c0-1.104-0.449-2.107-1.172-2.828s-1.724-1.172-2.828-1.172-2.107 0.449-2.828 1.172-1.172 1.724-1.172 2.828 0.449 2.107 1.172 2.828 1.724 1.172 2.828 1.172 2.107-0.449 2.828-1.172 1.172-1.724 1.172-2.828zM6.667 5.333c0 0.368-0.148 0.7-0.391 0.943s-0.575 0.391-0.943 0.391-0.7-0.148-0.943-0.391-0.391-0.575-0.391-0.943 0.148-0.7 0.391-0.943 0.575-0.391 0.943-0.391 0.7 0.148 0.943 0.391 0.391 0.575 0.391 0.943z',
  logout:
    'M12 26.667h-5.333c-0.368 0-0.7-0.148-0.943-0.391s-0.391-0.575-0.391-0.943v-18.667c0-0.368 0.148-0.7 0.391-0.943s0.575-0.391 0.943-0.391h5.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-5.333c-1.104 0-2.107 0.449-2.828 1.172s-1.172 1.724-1.172 2.828v18.667c0 1.104 0.449 2.107 1.172 2.828s1.724 1.172 2.828 1.172h5.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333zM24.781 14.667h-12.781c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h12.781l-4.391 4.391c-0.521 0.521-0.521 1.365 0 1.885s1.365 0.521 1.885 0l6.667-6.667c0.128-0.128 0.224-0.275 0.289-0.432 0.2-0.483 0.104-1.060-0.289-1.453l-6.667-6.667c-0.521-0.521-1.365-0.521-1.885 0s-0.521 1.365 0 1.885z',
  mail:
    'M4 10.561l11.236 7.865c0.453 0.313 1.060 0.328 1.529 0l11.235-7.865v13.439c0 0.363-0.147 0.695-0.393 0.94s-0.577 0.393-0.94 0.393h-21.333c-0.363 0-0.695-0.147-0.94-0.393s-0.393-0.577-0.393-0.94zM1.333 8.016v15.984c0 1.104 0.453 2.105 1.173 2.827s1.723 1.173 2.827 1.173h21.333c1.104 0 2.105-0.453 2.827-1.173s1.173-1.723 1.173-2.827v-15.984c0-0.013 0-0.027 0-0.040-0.007-1.095-0.457-2.087-1.173-2.803-0.721-0.72-1.723-1.173-2.827-1.173h-21.333c-1.104 0-2.105 0.453-2.827 1.173-0.716 0.716-1.167 1.708-1.173 2.804 0 0.007 0 0.015 0 0.023zM27.859 7.405l-11.859 8.3-11.859-8.3c0.064-0.128 0.149-0.244 0.251-0.345 0.247-0.247 0.579-0.393 0.941-0.393h21.333c0.363 0 0.695 0.147 0.94 0.393 0.101 0.101 0.187 0.219 0.251 0.345z',
  menu:
    'M4 17.333h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333zM4 9.333h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333zM4 25.333h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z',
  'mouse-pointer':
    'M6.476 6.476l16.379 6.824-6.511 2.211c-0.38 0.131-0.696 0.427-0.833 0.833l-2.211 6.511zM17.347 19.232l7.044 7.044c0.521 0.521 1.365 0.521 1.885 0s0.521-1.365 0-1.885l-7.044-7.044 7.824-2.657c0.697-0.237 1.071-0.995 0.833-1.691-0.128-0.377-0.408-0.659-0.749-0.801l-22.627-9.427c-0.68-0.283-1.46 0.039-1.744 0.719-0.143 0.341-0.132 0.709 0 1.025l9.427 22.627c0.283 0.68 1.064 1.001 1.744 0.719 0.367-0.153 0.629-0.451 0.749-0.801z',
  play:
    'M7.388 2.879c-0.204-0.133-0.453-0.212-0.721-0.212-0.736 0-1.333 0.597-1.333 1.333v24c-0.001 0.243 0.067 0.496 0.212 0.721 0.399 0.62 1.223 0.799 1.843 0.4l18.667-12c0.152-0.096 0.292-0.232 0.4-0.4 0.399-0.62 0.219-1.444-0.4-1.843zM8 6.443l14.868 9.557-14.868 9.557z',
  question:
    'M30.667 16c0-4.049-1.643-7.719-4.296-10.371s-6.321-4.296-10.371-4.296-7.719 1.643-10.371 4.296-4.296 6.321-4.296 10.371 1.643 7.719 4.296 10.371 6.321 4.296 10.371 4.296 7.719-1.643 10.371-4.296 4.296-6.321 4.296-10.371zM28 16c0 3.315-1.341 6.312-3.515 8.485s-5.171 3.515-8.485 3.515-6.312-1.341-8.485-3.515-3.515-5.171-3.515-8.485 1.341-6.312 3.515-8.485 5.171-3.515 8.485-3.515 6.312 1.341 8.485 3.515 3.515 5.171 3.515 8.485zM13.377 12.443c0.244-0.695 0.745-1.224 1.363-1.52s1.343-0.356 2.037-0.111c0.611 0.215 1.092 0.627 1.4 1.145 0.244 0.409 0.38 0.887 0.381 1.383 0 0.207-0.052 0.412-0.156 0.619-0.107 0.213-0.271 0.433-0.491 0.653-0.945 0.945-2.441 1.456-2.441 1.456-0.699 0.233-1.076 0.988-0.843 1.687s0.988 1.076 1.687 0.843c0 0 2.059-0.675 3.484-2.1 0.372-0.372 0.727-0.819 0.991-1.347 0.267-0.533 0.437-1.144 0.437-1.825-0.005-0.975-0.272-1.916-0.756-2.732-0.617-1.037-1.587-1.869-2.807-2.299-1.389-0.488-2.847-0.367-4.076 0.223s-2.237 1.651-2.725 3.040c-0.245 0.695 0.12 1.456 0.815 1.7s1.456-0.121 1.7-0.815zM17.333 22.667c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333 0.597 1.333 1.333 1.333 1.333-0.597 1.333-1.333z',
  share:
    'M21.619 24.131c0.033-0.044 0.064-0.089 0.093-0.139 0.027-0.047 0.051-0.095 0.072-0.143 0.097-0.144 0.208-0.279 0.331-0.401 0.484-0.484 1.148-0.781 1.885-0.781s1.401 0.297 1.885 0.781 0.781 1.148 0.781 1.885-0.297 1.401-0.781 1.885-1.148 0.781-1.885 0.781-1.401-0.297-1.885-0.781-0.781-1.148-0.781-1.885c0-0.433 0.103-0.841 0.285-1.203zM21.735 8.075c-0.012-0.023-0.024-0.045-0.037-0.068s-0.027-0.045-0.041-0.067c-0.205-0.377-0.323-0.811-0.323-1.273 0-0.737 0.297-1.401 0.781-1.885s1.148-0.781 1.885-0.781 1.401 0.297 1.885 0.781 0.781 1.148 0.781 1.885-0.297 1.401-0.781 1.885-1.148 0.781-1.885 0.781-1.401-0.297-1.885-0.781c-0.144-0.144-0.272-0.304-0.38-0.477zM10.265 14.592c0.012 0.023 0.024 0.045 0.037 0.068s0.027 0.045 0.041 0.067c0.205 0.377 0.323 0.811 0.323 1.273s-0.117 0.896-0.324 1.275c-0.015 0.021-0.028 0.044-0.041 0.067s-0.025 0.044-0.036 0.067c-0.108 0.173-0.236 0.333-0.38 0.477-0.484 0.484-1.148 0.781-1.885 0.781s-1.401-0.297-1.885-0.781-0.781-1.148-0.781-1.885 0.297-1.401 0.781-1.885 1.148-0.781 1.885-0.781 1.401 0.297 1.885 0.781c0.144 0.144 0.272 0.304 0.38 0.477zM18.867 8.117l-7.077 4.129c-0.005-0.007-0.012-0.012-0.019-0.019-0.963-0.963-2.299-1.561-3.771-1.561s-2.808 0.599-3.771 1.563-1.563 2.299-1.563 3.771 0.599 2.808 1.563 3.771 2.299 1.563 3.771 1.563 2.808-0.599 3.771-1.563c0.007-0.007 0.012-0.012 0.019-0.019l7.079 4.125c-0.131 0.463-0.201 0.952-0.201 1.456 0 1.472 0.599 2.808 1.563 3.771s2.299 1.563 3.771 1.563 2.808-0.599 3.771-1.563 1.563-2.299 1.563-3.771-0.599-2.808-1.563-3.771-2.299-1.563-3.771-1.563-2.808 0.599-3.771 1.563c-0.004 0.004-0.009 0.009-0.013 0.013l-7.083-4.127c0.131-0.461 0.2-0.947 0.2-1.449s-0.069-0.989-0.2-1.451l7.077-4.131c0.005 0.007 0.012 0.012 0.019 0.019 0.963 0.964 2.299 1.563 3.771 1.563s2.808-0.599 3.771-1.563 1.563-2.299 1.563-3.771-0.599-2.808-1.563-3.771-2.299-1.563-3.771-1.563-2.808 0.599-3.771 1.563-1.563 2.299-1.563 3.771c0 0.503 0.069 0.989 0.2 1.451z',
  spinner:
    'M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z',
  twitter:
    'M27.777 7.016c-0.248 0.323-0.521 0.633-0.821 0.928-0.311 0.309-0.463 0.756-0.371 1.211 0.049 0.243 0.080 0.539 0.081 0.845 0 7.008-3.239 11.961-7.747 14.531-3.529 2.012-7.917 2.607-12.296 1.493 1.66-0.481 3.28-1.228 4.791-2.253 0.196-0.132 0.364-0.324 0.469-0.561 0.299-0.673-0.004-1.461-0.677-1.76-3.699-1.644-5.507-3.908-6.359-6.124-0.556-1.445-0.728-2.931-0.693-4.303 0.028-1.081 0.184-2.080 0.371-2.909 0.527 0.456 1.072 0.94 1.648 1.383 2.735 2.103 6.165 3.307 9.861 3.211 0.721-0.020 1.299-0.609 1.299-1.333v-1.348c-0.003-0.239 0.012-0.476 0.045-0.712 0.151-1.075 0.672-2.092 1.549-2.855 0.967-0.841 2.181-1.211 3.368-1.128s2.337 0.617 3.179 1.584c0.336 0.381 0.865 0.555 1.377 0.405 0.308-0.089 0.617-0.191 0.927-0.304zM29.899 2.911c-0.987 0.696-2.031 1.235-3.049 1.607-1.241-1.115-2.788-1.736-4.368-1.847-1.864-0.129-3.781 0.452-5.303 1.776-1.381 1.201-2.203 2.809-2.44 4.496-0.049 0.353-0.073 0.711-0.072 1.067-2.563-0.189-4.925-1.133-6.868-2.628-1.033-0.795-1.948-1.745-2.712-2.82-0.427-0.6-1.259-0.743-1.859-0.316-0.205 0.145-0.356 0.337-0.447 0.545 0 0-0.176 0.399-0.38 1.013-0.149 0.449-0.321 1.033-0.476 1.72-0.217 0.963-0.403 2.136-0.435 3.428-0.041 1.636 0.16 3.483 0.869 5.328 0.911 2.367 2.621 4.637 5.529 6.431-2.092 0.968-4.327 1.385-6.497 1.289-0.736-0.032-1.359 0.537-1.391 1.273-0.023 0.519 0.253 0.981 0.684 1.224 6.54 3.633 13.901 3.571 19.555 0.348 5.388-3.068 9.093-8.933 9.093-16.845-0.001-0.223-0.011-0.44-0.031-0.652 1.341-1.487 2.235-3.239 2.661-5.041 0.169-0.716-0.275-1.435-0.991-1.604-0.387-0.092-0.773-0.004-1.076 0.208z',
  udemy:
    'M141.58 40.23a3.83 3.83 0 0 0-1.693-.796c-3.655 3.643-8.115 7.48-12.075 10.06-1.827 1.214-4.126 1.82-5.647 1.82-3.503 0-5.025-3.34-5.482-8.65-.61-7.13-1.02-15.672-1.02-28.873 0-13.54-3.073-22.743-11.258-23.465-.346-.03-.696-.052-1.06-.052-5.025 0-7.462 2.58-10.66 9.104-2.74 5.613-7.004 13.806-14.92 29.282C70.913 42.014 63.3 53.85 56.75 62.042c-1.824 2.27-3.265 3.83-4.62 4.72-.905.596-1.774.894-2.688.894-2.585 0-4.47-2.18-5.1-7.26-.15-1.207-.23-2.577-.23-4.12 0-10.47 3.96-27.462 10.8-52.498 5.025-18.206 2.894-30.646-8.07-30.646h-.123l-.007.002c-2.483.03-4.54.928-6.524 2.49-1.952 1.537-3.906 4.857-5.73 9.322C32.413-10.03 19.91 15.047.014 27.966c-.234 4.912 2.546 9.82 8.18 10.353 5.13.486 8.77-1.676 13.46-4.825a1296.183 1296.183 0 0 0-1.858 8.416l-.652 2.986a83.792 83.792 0 0 0-1.417 8.52C14.92 78.494 26.543 90.87 40.155 90.87c2.275 0 4.53-.27 6.767-.84C61.92 86.226 76.36 69.023 93.448 29.42c-.26 4.308-.286 8.33-.1 12.065 1.125 22.697 10.103 29.507 22.787 29.507 9.593 0 18.576-5.006 23.144-11.227 3.35-4.4 4.72-9.256 4.72-13.05 0-2.944-.934-5.295-2.42-6.488',
  youtube:
    'M28.751 8.849c0.383 2.039 0.597 4.393 0.583 6.833 0.025 2.037-0.164 4.356-0.583 6.695-0.076 0.277-0.2 0.537-0.363 0.767-0.303 0.428-0.744 0.753-1.265 0.9-0.805 0.215-2.875 0.367-5.169 0.455-2.973 0.115-5.953 0.115-5.953 0.115s-2.98 0-5.953-0.113c-2.295-0.088-4.364-0.239-5.155-0.451-0.273-0.076-0.528-0.197-0.755-0.357-0.415-0.293-0.735-0.715-0.893-1.231-0.38-2.035-0.592-4.381-0.577-6.813-0.028-2.053 0.161-4.389 0.583-6.747 0.076-0.277 0.2-0.537 0.363-0.767 0.303-0.428 0.744-0.753 1.265-0.9 0.805-0.215 2.875-0.367 5.169-0.455 2.973-0.113 5.953-0.113 5.953-0.113s2.98 0 5.955 0.104c2.292 0.080 4.376 0.217 5.141 0.404 0.292 0.084 0.561 0.22 0.797 0.399 0.409 0.309 0.717 0.748 0.857 1.277zM31.347 8.236c-0.289-1.155-0.957-2.12-1.844-2.791-0.497-0.376-1.061-0.659-1.665-0.833-1.197-0.293-3.595-0.431-5.789-0.507-3.023-0.105-6.048-0.105-6.048-0.105s-3.029 0-6.055 0.116c-2.189 0.084-4.6 0.233-5.756 0.543-1.165 0.329-2.108 1.027-2.752 1.933-0.36 0.508-0.625 1.081-0.783 1.691-0.008 0.032-0.015 0.065-0.020 0.095-0.457 2.531-0.665 5.057-0.635 7.308-0.016 2.565 0.215 5.108 0.636 7.336 0.008 0.041 0.017 0.083 0.028 0.117 0.327 1.147 1.027 2.089 1.935 2.731 0.476 0.336 1.009 0.589 1.575 0.748 1.172 0.313 3.581 0.463 5.771 0.547 3.027 0.116 6.056 0.116 6.056 0.116s3.029 0 6.055-0.116c2.189-0.084 4.599-0.233 5.756-0.543 1.164-0.329 2.108-1.027 2.751-1.933 0.36-0.508 0.627-1.081 0.783-1.689 0.008-0.033 0.016-0.067 0.020-0.095 0.453-2.512 0.661-5.020 0.635-7.253 0.016-2.567-0.215-5.111-0.636-7.339-0.005-0.027-0.011-0.053-0.016-0.076zM14.333 17.735v-4.136l3.636 2.068zM13.659 21.185l7.667-4.36c0.64-0.364 0.864-1.179 0.5-1.819-0.124-0.219-0.301-0.389-0.5-0.5l-7.667-4.36c-0.64-0.364-1.455-0.14-1.819 0.5-0.12 0.211-0.176 0.44-0.175 0.659v8.72c0 0.736 0.597 1.333 1.333 1.333 0.243 0 0.469-0.065 0.659-0.175z'
};

const SVG = ({ fill, height, name, style, viewBox, width }) => {
  /* Use name as additional class identifier */
  const className = ['icon']
    .concat(name)
    .join(' ')
    .trim();

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path fill={fill} d={icons[name]} />
    </svg>
  );
};

SVG.propTypes = {
  fill: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  viewBox: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
};

SVG.defaultProps = {
  width: '100%',
  height: '100%',
  fill: '#000',
  style: {},
  viewBox: '0 0 32 32'
};

export default SVG;
export { SVG as Icon };
