import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'semantic-ui-react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button primary onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Divider />
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
}

export default Togglable