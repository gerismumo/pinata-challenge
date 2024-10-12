"use client"

import React from 'react'

type Props = {
    close: (value: boolean) => void;
}

const AddForm:React.FC<Props> = ({close}) => {
  return (
    <div>Form</div>
  )
}

export default AddForm