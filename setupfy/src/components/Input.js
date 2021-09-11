import React, { useRef, useState } from 'react'
import styles from '../../styles/components/Forms.module.scss'

export const Input = ({ label, name, value, onChange }) => {
  console.log(value)
  return (
    <div className={`${styles.inputBlock} flex column`}>
      <input
        id={name}
        type="text"
        onChange={onChange}
        value={value}
      />
      <label
        className={`${styles.onTopLabel}`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  )
}
