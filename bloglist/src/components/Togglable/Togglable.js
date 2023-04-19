import React from 'react'
import PropTypes from 'prop-types'

function Togglable({ buttonLabel, children, cancelButtonLabel }) {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    cancelButtonLabel: PropTypes.string.isRequired,
  }

  const [visible, setVisible] = React.useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{cancelButtonLabel}</button>
      </div>
    </div>
  )
}

export default Togglable
