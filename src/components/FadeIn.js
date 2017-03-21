import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './fadein.css'

const props = {
  transitionName: "fadein",
  transitionAppear: true,
  transitionAppearTimeout: 500,
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 300,
}

export const FadeIn = ({ children}) => (
  <ReactCSSTransitionGroup {...props}>
    {children}
  </ReactCSSTransitionGroup>
)
