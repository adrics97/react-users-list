import IconButton from "./buttons/IconButton"
import PageSelector from "./forms/PageSelector"
import Select from "./forms/Select"
import SearchIcon from "./icons/SearchIcon"
import style from "./UsersListPagination.module.css"

function UsersListPagination({page, itemsPerPage, setPage, setItemsPerPage, totalPages}) {
  return (
    <div className={style.wrapper}>
      <div className={style.itemsPerPage}>
        <Select value={itemsPerPage} onChange={evt => setItemsPerPage(evt.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </Select>
        <p> Elementos por página </p>
      </div>
      <IconButton kind="red" icon={SearchIcon}/>
      <PageSelector page={page} totalPages={totalPages} setPage={setPage}/> 
    </div>
  )
}

export default UsersListPagination