import { FILTERS_ACTION } from '../../components/constants/filtersActions';
import { PAGINATION } from '../../components/constants/pagination';
import { SORT_OPTIONS } from '../../components/constants/sortOptions';

export const FILTERS_INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEM_PER_PAGE
};

export const filtersReducer = (state, { type, payload }) => {
	switch (type) {
		case FILTERS_ACTION.SEARCH:
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				search: payload
			};
		case FILTERS_ACTION.ONLY_ACTIVE: {
			const newSortBy =
				payload && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;
			return {
				...state,
				sortBy: newSortBy,
				page: 1,
				onlyActive: payload
			};
		}
		case FILTERS_ACTION.SORT_BY:
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				sortBy: payload
			};
		case FILTERS_ACTION.PAGE:
			return {
				...state,
				page: payload
			};
		case FILTERS_ACTION.ITEMS_PER_PAGE:
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				itemsPerPage: payload
			};
		case FILTERS_ACTION.RESET:
			return { ...FILTERS_INITIAL_STATE };
		default:
			throw new Error('Invalid action type');
	}
};
