import { useState } from 'react';
import {
	onlyActiveChanged,
	searchChanged,
	sortByChanged
} from '../../lib/actions/filtersActions';
import Button from '../buttons/Button';
import { SORT_OPTIONS } from '../constants/sortOptions';
import InputCheckbox from '../forms/InputCheckbox';
import InputSearch from '../forms/InputSearch';
import Select from '../forms/Select';
import Modal from '../modal/Modal';
import UserCreateForm from '../user-forms/UserCreateForm';
import style from './UsersListFilters.module.css';
function UsersListFilters({ search, onlyActive, sortBy, dispatchFilters }) {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className={style.form}>
			<Modal closeModal={() => setShowModal(false)}>
				{showModal && <UserCreateForm closeModal={() => setShowModal(false)} />}
			</Modal>
			<div className={style.row}>
				<InputSearch
					placeholder='Buscar...'
					value={search}
					onChange={evt => dispatchFilters(searchChanged(evt.target.value))}
				/>
				<Select
					value={sortBy}
					onChange={evt =>
						dispatchFilters(sortByChanged(Number(evt.target.value)))
					}
				>
					<option value={SORT_OPTIONS.DEFAULT}>Por defecto</option>
					<option value={SORT_OPTIONS.NAME}>Por nombre</option>
					<option value={SORT_OPTIONS.ROLE}>Por rol</option>
					{!onlyActive && (
						<option value={SORT_OPTIONS.ACTIVE}>Por activos</option>
					)}
				</Select>
			</div>
			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						className={style.checkbox}
						checked={onlyActive}
						onChange={evt =>
							dispatchFilters(onlyActiveChanged(evt.target.checked))
						}
					/>
					<p>Mostrar sólo activos</p>
				</div>
				<Button onClick={() => setShowModal(true)}>Añadir usuarios</Button>
			</div>
		</div>
	);
}

export default UsersListFilters;
