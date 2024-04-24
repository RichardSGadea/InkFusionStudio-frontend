import "./CustomInput.css"

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  onBlurHandler,
  errorText,
  isDisabled,
  value
}) => {
  // props, properties (obj)

  return (
    <>
      <input
        className={errorText === "" ? "customInputDesign" : "customInputDesign input-error"}
        type={typeProp}
        name={nameProp}
        placeholder={placeholderProp}
        onChange={(e) => handlerProp(e)}
        onBlur={(e) => onBlurHandler(e)}
        disabled={isDisabled}
        value={value}
      />
      <p>{errorText}</p>
    </>
  );
};

// <CustomInput type="email" name="emailInput" placeholder="introduce tu email..." />