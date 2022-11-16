export const FILTERS_ACTION = {
	SEARCH: 'search_changed',
	ONLY_ACTIVE: 'only_active_changed',
	SORT_BY: 'sort_by_changed',
	PAGE: 'page_changed',
	ITEMS_PER_PAGE: 'items_per_page_changed',
	RESET: 'reset'
};

export const searchChanged = search => ({
	type: FILTERS_ACTION.SEARCH,
	payload: search
});

export const onlyActiveChanged = onlyActive => ({
	type: FILTERS_ACTION.ONLY_ACTIVE,
	payload: onlyActive
});

export const sortByChanged = sortBy => ({
	type: FILTERS_ACTION.SORT_BY,
	payload: sortBy
});

export const pageChanged = page => ({
	type: FILTERS_ACTION.PAGE,
	payload: page
});

export const itemsPerPageChanged = itemsPerPage => ({
	type: FILTERS_ACTION.ITEMS_PER_PAGE,
	payload: itemsPerPage
});

export const reset = () => ({
	type: FILTERS_ACTION.RESET
});
