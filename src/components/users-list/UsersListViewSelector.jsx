import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import style from './UsersListViewSelector.module.css';

function UsersListViewSelector({ showRowsFormat, setShowRowsFormat }) {
	return (
		<div className={style.wrapper}>
			<button
				onClick={() => setShowRowsFormat(false)}
				disabled={!showRowsFormat}
			>
				<GridIcon className={style.icon} />
			</button>
			<div className={style.divider}></div>
			<button onClick={() => setShowRowsFormat(true)} disabled={showRowsFormat}>
				<ListIcon className={style.icon} />
			</button>
		</div>
	);
}

export default UsersListViewSelector;
