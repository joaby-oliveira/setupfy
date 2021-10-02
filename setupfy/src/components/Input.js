import React, { useRef, useState } from 'react'
import styles from '../../styles/components/Forms.module.scss'

export const Input = ({ label, name, value, onChange, type, onBlur, error, required }) => {
  if(value.length === 1 || value.length === 8) {
    error = ''
  }
  return (
    <>
      <div className={`${styles.inputBlock} flex column`}>
        <input
          id={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          required={required}
        />
        <label
          className={`${value !== '' ? styles.onTopLabel : ''}`}
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </>
  )
}
