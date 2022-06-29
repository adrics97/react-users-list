import { useState } from 'react';
import { SORT_OPTIONS } from '../components/constants/sortOptions';

function useFilters() {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: 1,
		itemsPerPage: 2
	});

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
			sortBy
		});
	};

	const setPage = newPage => {
		setFilters({
			...filters,
			page: newPage
		});
	};

	const setItemsPerPage = newItemsPerPage =>
		setFilters({
			...filters,
			setSearch,
			setOnlyActive,
			setSortBy
		});

	return {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage
	};
}

export default useFilters;
