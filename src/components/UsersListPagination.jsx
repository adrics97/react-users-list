import PageSelector from './forms/PageSelector';
import Select from './forms/Select';
import style from './UsersListPagination.module.css';

function UsersListPagination({
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage,
	totalPages
}) {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={evt => setItemsPerPage(Number(evt.target.value))}
				>
					<option value={4}>4</option>
					<option value={6}>6</option>
					<option value={8}>8</option>
				</Select>
				<p> Elementos por página </p>
			</div>
			<PageSelector page={page} totalPages={totalPages} setPage={setPage} />
		</div>
	);
}

export default UsersListPagination;
