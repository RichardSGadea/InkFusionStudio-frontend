import "./CustomInput.css"

export const CustomInput = ({
    typeProp,
    nameProp,
    placeholderProp,
    handlerProp,
  }) => {
    // props, properties (obj)
  
    return (
      <input className="customInputDesign"
        type={typeProp}
        name={nameProp}
        placeholder={placeholderProp}
        onChange={(e) => handlerProp(e)}
      />
    );
  };
  
  // <CustomInput type="email" name="emailInput" placeholder="introduce tu email..." />