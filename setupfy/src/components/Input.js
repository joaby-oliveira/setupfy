import React, { useRef, useState } from 'react'
import styles from '../../styles/components/Forms.module.scss'

export const Input = ({ label, name, value, onChange, onBlur, error }) => {
  return (
    <>
      <div className={`${styles.inputBlock} flex column`}>
        <input
          id={name}
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        <label
          className={`${styles.onTopLabel}`}
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </>
  )
}
