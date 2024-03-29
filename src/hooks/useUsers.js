import { useEffect, useState } from 'react';
import { findAllUsers } from '../lib/api/usersApi';
import { alertBox } from '../lib/events/alertEvents';

const useUsers = filters => {
	const [users, setUsers] = useState({
		data: [],
		count: 0,
		error: false,
		loading: true
	});

	const setData = (newData, newCount) =>
		setUsers({ data: newData, count: newCount, loading: false, error: false });

	const setError = () =>
		setUsers({ data: [], count: 0, loading: false, error: true });

	useEffect(() => {
		const controller = new AbortController();
		loadUsers(setData, setError, controller.signal, filters);
		return () => controller.abort();
	}, [filters]);

	return {
		users: users.data,
		totalUsers: users.count,
		usersError: users.error,
		usersLoading: users.loading
	};
};

export default useUsers;

const loadUsers = async (setData, setError, signal, filters) => {
	const { users, count, aborted } = await findAllUsers(signal, filters);
	if (aborted) return;
	if (users) setData(users, count);
	else {
		setError();
		alertBox.error('Error al cargar usuarios');
	}
};
