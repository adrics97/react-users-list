import React from 'react';
import { useSelectedForm } from '../../hooks/useSelectedForm';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';

function UserFormProvider({ resetFilters, children }) {
	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

	const onSuccess = () => {
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
