import type { TextBoxType } from '../../../ui/TextBox'
import React from 'react'

export const TextBox: TextBoxType = (props) => (
  <input data-testid='ui' {...props} />
)
