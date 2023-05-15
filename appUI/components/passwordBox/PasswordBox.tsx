import React from "react";
import { useState } from "react";

interface IPasswordBoxInput {
  id?: string;
  name?: string;
  value?: any;
  disable?: boolean,
  required?: boolean,
  containerClassName?: string,
  inputAttributes?: React.HtmlHTMLAttributes<HTMLInputElement>,
}

const PasswordBox = (props: IPasswordBoxInput) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [value, setValue] = useState<string>(props.value);

  const { id, name, required, disable, containerClassName, inputAttributes } = props;

  return (
    <div
      className={
        `w-auto ${containerClassName} ${disable ? 'pointer-events-none opacity-[0.4]' : ''}`
      }
    >
      <div className={"flex justify-between items-center"}>
        <input
          type={isPasswordShow ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          required={required}
          placeholder="Password"
          autoFocus
          className={
            "appearance-none outline-none bg-transparent border-b border-b-[#999] py-3 text-xs w-[90%]"
          }
          {...inputAttributes}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setValue(value);
          }}
        />
        <input type={"hidden"} name={"pwd"} value={value} />
        <button
          type={"button"}
          className={"appearance-none border-none hover:text-[#444]"}
          onClick={() => setIsPasswordShow(!isPasswordShow)}
        >
          {isPasswordShow ? (
            <span className={"--icon --icon-unsubscribe"}
            ></span>
          ) : (
            <span
              className={"--icon --icon-subscribe"}
            ></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordBox;
