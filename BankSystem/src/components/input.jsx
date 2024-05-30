import PropTypes from 'prop-types'

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea
}) => {
    const handleValueChange = (e) => {
        onChangeHandler(e.target.value, field)
    }

    const handleOnBlur = (e) => {
        onBlurHandler(e.target.value, field)
    }

    return (
        <div className="form__group field">
            {textarea ? (
                <textarea
                    className="form__field"
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    rows={5}
                    placeholder={label}
                />
            ) : (
                <input
                    className="form__field"
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    placeholder={label}
                />
            )}
            <label className="form__label">{label}</label>
            {showErrorMessage && (
                <span className="error-message">{validationMessage}</span>
            )}
        </div>
    )
}

Input.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
    onBlurHandler: PropTypes.func.isRequired,
    textarea: PropTypes.bool
}
