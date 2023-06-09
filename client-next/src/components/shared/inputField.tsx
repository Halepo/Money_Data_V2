import './inputField.module.sass';

const Input = ({
  className,
  onChange,
  tabIndex,
  required,
  id,
  type,
  placeholder,
}: JSX.IntrinsicElements['input']) => {
  return (
    <input
      id={id}
      tabIndex={tabIndex}
      className={className}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required ? true : false}
    ></input>
  );
};

export default function InputField({
  label,
  inputClassName,
  inputId,
  formGroupClassName,
  formGroupId,
  onChange,
  tabIndex,
  required,
  type,
  placeholder,
}: any) {
  return (
    <div
      id={formGroupId}
      className={`custom-input-form-group ${formGroupClassName}`}
    >
      <label>{label}</label>
      <Input
        className={inputClassName}
        onChange={onChange}
        id={inputId}
        tabIndex={tabIndex}
        required={required}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
