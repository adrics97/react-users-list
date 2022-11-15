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

export const filtersReducer = (state, action) => {
	switch (action.type) {
		case FILTERS_ACTION.SEARCH:
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				search: action.value
			};
		case FILTERS_ACTION.ONLY_ACTIVE: {
			const newSortBy =
				action.value && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;
			return {
				...state,
				sortBy: newSortBy,
				page: 1,
				onlyActive: action.value
			};
		}
		case FILTERS_ACTION.SORT_BY:
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				sortBy: action.value
			};
		case FILTERS_ACTION.PAGE:
			return {
				...state,
				page: action.value
			};
		case FILTERS_ACTION.ITEMS_PER_PAGE:
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				itemsPerPage: action.value
			};
		case FILTERS_ACTION.RESET:
			return { ...FILTERS_INITIAL_STATE };
		default:
			throw new Error('Invalid action type');
	}
};
