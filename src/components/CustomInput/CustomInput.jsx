import { useEffect } from "react";
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
    <div className="custom-input-container">
      <input
        className={errorText === "" ? "customInputDesign" : errorText === "Change password" ? "customInputDesign input-password" : "customInputDesign input-error"}
        type={typeProp}
        name={nameProp}
        placeholder={placeholderProp}
        onChange={(e) => handlerProp(e)}
        onBlur={(e) => onBlurHandler(e)}
        disabled={isDisabled}
        value={value} 
      />
      <p>{errorText}</p>
    </div>
  );
};

// <CustomInput type="email" name="emailInput" placeholder="introduce tu email..." />