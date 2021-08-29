import { useState } from "react"
import styles from "../../styles/components/Searchbar.module.scss"

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState()
  return (
    <input
      className={styles.searchbar}
      placeholder="Pesquisar # ou usuários"
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
    />
  )
}

export default Searchbar
