import IconButton from "../buttons/IconButton"
import ArrowLeftIcon from "../icons/ArrowLeftIcon"
import ArrowRightIcon from "../icons/ArrowRightIcon"
import style from './PageSelector.module.css'

function PageSelector({page, setPage,  totalPages}) {

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages || totalPages === 0;
  return (
    <div className={style.wrapper}>
      <IconButton filled icon={ArrowLeftIcon} disabled={isFirstPage} onClick={() => setPage(page - 1)} />
      <span>Página {page} de {totalPages || 1}</span>
      <IconButton filled icon={ArrowRightIcon} disabled={isLastPage} onClick={() => setPage(page + 1)}/>
    </div>
  )
}

export default PageSelector