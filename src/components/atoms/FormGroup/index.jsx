import React from "react";
import FeatherIcon from "feather-icons-react";

const FormGroup = ({ variant, type, label, required, idFor, children, className, ...rest }) => {
  return (
    <div className="grid">
      {variant !== "checkbox" && (
        <>
          <label htmlFor="" className="w-full">
            {label} {required && <sup className="text-red-700">*</sup>}
          </label>
        </>
      )}
      <div className="flex mt-3">
        {variant === "select" && (
          <>
            <select
              className="w-full p-4 rounded-full directory after:right-6 bg-gray-100 placeholder:text-gray-400 appearance-none font-medium text-sm"
              {...rest}
            >
              {children}
            </select>
            <FeatherIcon icon="chevron-down" className="my-auto -ml-10" />
          </>
        )}
        {variant === "input" && (
          <>
            <input
              type={type ? type : "text"}
              className={"w-full p-4 rounded-full directory after:right-6 bg-gray-100 placeholder:text-gray-400 appearance-none font-medium text-sm " + className}
              {...rest}
            />
            {type === "date" && (
              <>
                <FeatherIcon icon="calendar" size={16} className="my-auto -ml-10 text-blue-600" />
              </>
            )}
            {type === "time" && (
              <>
                <FeatherIcon icon="clock" size={16} className="my-auto -ml-10 text-blue-600" />
              </>
            )}
          </>
        )}
        {variant === "checkbox" && (
          <div className="form-check">
            <input className="mt-1 h-4 w-4 float-left mr-2 cursor-pointer" type="checkbox" value="" id={idFor} />
            <label className="form-check-label inline-block font-medium" htmlFor={idFor}>
              {label}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
