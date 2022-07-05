import style from './InputText.module.css';

function InputText({ label, error, className, ...props }) {
	return (
		<label className={className}>
			<span className={style.label}>{label}</span>
			<input
				type='text'
				className={`${style.input} ${error ? style.borderError : ''}`}
				{...props}
			></input>
			{error && <span className={style.error}>{error}</span>}
		</label>
	);
}

export default InputText;
