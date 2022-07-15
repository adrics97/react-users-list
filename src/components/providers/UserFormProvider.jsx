import React from 'react';
import { useSelectedForm } from '../../hooks/useSelectedForm';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';

function UserFormProvider({ reloadUsers, resetFilters, children }) {
	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<UserFormsContext.Provider
			value={{
				setFiltersForm,
				onSuccess,
				...restSelectedForm
			}}
		>
			{children}
		</UserFormsContext.Provider>
	);
}

export default UserFormProvider;
