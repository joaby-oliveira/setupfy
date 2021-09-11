import React, { useRef, useState } from 'react'
import styles from '../../styles/components/Forms.module.scss'

export const Input = ({ label, name }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  
  return (
    <div className={`${styles.inputBlock} flex column`}>
      <input
        id={name}
        type="text"
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
