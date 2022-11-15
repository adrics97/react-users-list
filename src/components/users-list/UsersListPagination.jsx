import { FILTERS_ACTION } from '../constants/filtersActions';
import { PAGINATION } from '../constants/pagination';
import PageSelector from '../forms/PageSelector';
import Select from '../forms/Select';
import style from './UsersListPagination.module.css';

function UsersListPagination({
	page,
	itemsPerPage,
	totalUsers,
	dispatchFilters
}) {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={evt =>
						dispatchFilters({
							type: FILTERS_ACTION.ITEMS_PER_PAGE,
							value: Number(evt.target.value)
						})
					}
				>
					{PAGINATION.ITEMS_PER_PAGE.map(value => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</Select>
				<p> Elementos por página </p>
			</div>
			<PageSelector
				page={page}
				totalPages={Math.ceil(totalUsers / itemsPerPage)}
				setPage={newPage =>
					dispatchFilters({ type: FILTERS_ACTION.PAGE, value: newPage })
				}
			/>
		</div>
	);
}

export default UsersListPagination;
