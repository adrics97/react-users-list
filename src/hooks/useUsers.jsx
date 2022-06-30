import { useEffect, useState } from 'react';
import {
	filtersUsersByActive,
	filtersUsersByName,
	paginateUsers,
	sortUsers
} from '../lib/users/filterUsers';

const fetchUsers = async (setData, setError, signal) => {
	try {
		const res = await fetch('http://localhost:4000/users', { signal });
		if (res.ok) {
			const data = await res.json();
			setData(data);
		} else {
			setError();
		}
	} catch (err) {
		setError();
	}
};

const getUsersToDisplay = (
	users,
	{ onlyActive, search, sortBy, page, itemsPerPage }
) => {
	let usersFiltered = filtersUsersByActive(users, onlyActive);
	usersFiltered = filtersUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	const { paginatedUsers, totalPages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	);

	return { paginatedUsers, totalPages };
};

const useUsers = filters => {
	const [users, setUsers] = useState({
		data: [],
		error: false,
		loading: true
	});

	const setData = newData =>
		setUsers({ data: newData, loading: false, error: false });

	const setError = () => setUsers({ data: [], loading: false, error: true });

	useEffect(() => {
		const controller = new AbortController();
		fetchUsers(setData, setError, controller.signal);
		return () => controller.abort();
	}, []);

	const { paginatedUsers, totalPages } = getUsersToDisplay(users.data, filters);

	return {
		users: paginatedUsers,
		totalPages,
		error: users.error,
		loading: users.loading
	};
};

export default useUsers;
