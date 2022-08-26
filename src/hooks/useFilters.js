import { useState } from 'react';
import { SORT_OPTIONS } from '../components/constants/sortOptions';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: 1,
	itemsPerPage: 6
};

const useFilters = () => {
	const [filters, setFilters] = useState(INITIAL_STATE);

	const setSearch = search => {
		setFilters({
			...filters,
			page: 1,
			search
		});
	};

	const setOnlyActive = onlyActive => {
		const newSortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;
		setFilters({
			...filters,
			sortBy: newSortBy,
			page: 1,
			onlyActive
		});
	};

	const setSortBy = sortBy => {
		setFilters({
			...filters,
			page: 1,
			sortBy
		});
	};

	const setPage = newPage => {
		setFilters({
			...filters,
			page: newPage
		});
	};

	const setItemsPerPage = newItemsPerPage => {
		setFilters({
			...filters,
			page: 1,
			itemsPerPage: newItemsPerPage
		});
	};

	const resetFilters = () => {
		setFilters({ ...INITIAL_STATE });
	};

	return {
		filters,
		filtersSetters: {
			setSearch,
			setOnlyActive,
			setSortBy
		},
		paginationSetters: {
			setPage,
			setItemsPerPage
		},
		resetFilters
	};
};

export default useFilters;
