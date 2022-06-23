import { SORT_OPTIONS } from './constants/sortOptions'
import InputCheckbox from './forms/InputCheckbox'
import InputSearch from './forms/InputSearch'
import Select from './forms/Select'
import style from './UsersListFilters.module.css'
function UsersListFilters({search, setSearch, onlyActive, setOnlyActive, sortBy, setSortBy}) {
  return (
    <div className={style.form}>
      <div className={style.row}>
        <InputSearch placeholder='Buscar...' value={search} onChange={evt => setSearch(evt.target.value)}/>
        <Select value={sortBy} onChange={evt => setSortBy(Number(evt.target.value))}>
          <option value={SORT_OPTIONS.DEFAULT}>Por defecto</option>
          <option value={SORT_OPTIONS.NAME}>Por nombre</option>
          <option value={SORT_OPTIONS.ROLE}>Por rol</option>
          {!onlyActive && <option value={SORT_OPTIONS.ACTIVE}>Por activos</option>}
        </Select>
      </div>
      <div className={style.row}>
        <div className={style.active}>
          <InputCheckbox 
              className={style.checkbox}
              checked={onlyActive}
              onChange={evt => setOnlyActive(evt.target.checked)}
          />
          <p>Mostrar sólo activos</p>
        </div>
      </div>

    </div>
  )
}

export default UsersListFilters