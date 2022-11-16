import { PAGINATION } from '../constants/pagination';
import PageSelector from '../forms/PageSelector';
import Select from '../forms/Select';
import style from './UsersListPagination.module.css';
import {
	itemsPerPageChanged,
	pageChanged
} from '../../lib/actions/filtersActions.js';

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
						dispatchFilters(itemsPerPageChanged(Number(evt.target.value)))
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
				setPage={newPage => dispatchFilters(pageChanged(newPage))}
			/>
		</div>
	);
}

export default UsersListPagination;
