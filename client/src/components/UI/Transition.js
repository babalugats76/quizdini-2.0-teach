import React from "react";
import { Transition } from "react-transition-group";

export default ({ children, ...props }) => {
  /**
   * Returns style object for transistion state.
   *
   * @param {Object} styles  CSS each transition state
   */
  const getStyles = styles => transitionState => {
    return { ...styles["default"], ...styles[transitionState] };
  };

  /**
   * Return transition after cloning children and pushing down style
   * Make sure props.styles is pushed down to rendered HTML
   */
  return (
    <Transition {...props}>
      {(transitionState, innerProps) =>
        React.cloneElement(children, {
          style: getStyles({ ...props.transitionStyles })(transitionState)
        })
      }
    </Transition>
  );

  /**
   * Should other techniques fail, you could
   * return a transition that wraps the children in a div
   */

  /* return(<Transition {...props}
            timeout={timeout}
            mountonEnter={true}
            unmountOnExit={false}>{
              (transitionState) => <div style={{
        ...defaultStyle,
        ...transitionStyles[transitionState]}}>{children}</div>}
  </Transition>); */
};