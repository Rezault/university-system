function Checkbox({ label, value, checked, onChange }) {
    return (
        <label>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    )
}

export default Checkbox;