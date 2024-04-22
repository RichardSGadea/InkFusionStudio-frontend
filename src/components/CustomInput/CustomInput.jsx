import "./CustomInput.css"

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  onBlurHandler,
  errorText
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
      />
      <p>{errorText}</p>
    </>
  );
};

// <CustomInput type="email" name="emailInput" placeholder="introduce tu email..." />