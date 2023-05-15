import React, { RefObject, useEffect, useRef, useState } from "react";

export enum TextInputButtonTypes {
  "ClearButton",
  "ShowHidePassword",
  "SearchButton",
}

interface ITextInput {
  id?: string;
  name?: string;
  value?: any;
  disable?: boolean,
  required?: boolean,
  showButtonOnHover?: boolean,
  containerClassName?: string,
  buttons?: TextInputButtonTypes[];
  inputAttributes?: React.HtmlHTMLAttributes<HTMLInputElement>,
  buttonAttributes?: React.HtmlHTMLAttributes<HTMLButtonElement>,
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  onSearchButtonClick?: (searchText?: string) => void | undefined;
}

const TextInput: React.FC<ITextInput> = (props) => {
  const [isInit, setIsInit] = useState(false);
  const [isHover, setisHover] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { id, type, name, value, required, disable, buttons,
    showButtonOnHover, onSearchButtonClick, containerClassName,
    inputAttributes, buttonAttributes } = props;

  useEffect(() => {
    setIsInit(true);
  }, [isInit])


  return (
    <div className={`relative w-auto border border-[#999] ${containerClassName} ${disable ? 'pointer-events-none opacity-[0.4]' : ''}`}
      onMouseLeave={() => setisHover(false)}
      onMouseEnter={() => setisHover(true)}
    >
      <div className={"flex justify-between items-center"}>
        <input
          id={id}
          name={name}
          ref={inputRef}
          value={value}
          required={required}
          type={type ?? "text"}
          className={
            "appearance-none my-[5px] mx-[10px] mr-2 flex-1 text-inherit w-full"
          }
          {...inputAttributes}
        />
        {
          // show only when the input is set to showButtonOnFocus and has a focus,otherwise show the button
          (isInit && isHover && showButtonOnHover === true) ? (
            <TextButtons
              input={inputRef}
              buttonTypes={buttons}
              buttonAttributes={buttonAttributes}
              onSearchButtonClick={onSearchButtonClick}
            />
          ) : (isInit && showButtonOnHover === false) && (
            <TextButtons
              input={inputRef}
              buttonTypes={buttons}
              buttonAttributes={buttonAttributes}
              onSearchButtonClick={onSearchButtonClick}
            />
          )
        }
      </div>
    </div>
  );
};

const TextButtons = (props: {
  buttonTypes?: TextInputButtonTypes[];
  input: RefObject<HTMLInputElement>;
  onSearchButtonClick?: (searchText?: string) => void;
  buttonAttributes?: React.HtmlHTMLAttributes<HTMLButtonElement>,
}) => {
  const { input, buttonTypes, buttonAttributes, onSearchButtonClick } = props;
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  return (
    <div className={"mx-[0.1rem] flex"}>
      <>
        {buttonTypes?.map((type) => {
          // button for SearchButton
          if (
            type === TextInputButtonTypes.SearchButton &&
            input.current?.type !== "password"
          ) {
            return (<button
              key={type}
              type={"button"}
              className={"appearance-none outline-none min-w-[32px] min-h-[32px] hover:scale-90"}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={() => onSearchButtonClick ? onSearchButtonClick(input.current?.value) : () => { }}
              {...buttonAttributes}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                enableBackground="new 0 0 50 50"
                xmlSpace="preserve"
              >
                <path
                  fill="#231F20"
                  d="M20.921,31.898c2.758,0,5.367-0.956,7.458-2.704l1.077,1.077l-0.358,0.358
                      c-0.188,0.188-0.293,0.442-0.293,0.707s0.105,0.52,0.293,0.707l8.257,8.256c0.195,0.195,0.451,0.293,0.707,0.293
                      s0.512-0.098,0.707-0.293l2.208-2.208c0.188-0.188,0.293-0.442,0.293-0.707s-0.105-0.52-0.293-0.707l-8.257-8.256
                      c-0.391-0.391-1.023-0.391-1.414,0l-0.436,0.436l-1.073-1.073c1.793-2.104,2.777-4.743,2.777-7.537c0-3.112-1.212-6.038-3.413-8.239
                      s-5.127-3.413-8.239-3.413s-6.038,1.212-8.238,3.413c-2.201,2.201-3.413,5.126-3.413,8.239c0,3.112,1.212,6.038,3.413,8.238
                      C14.883,30.687,17.809,31.898,20.921,31.898z M38.855,37.385l-0.794,0.793l-6.843-6.842l0.794-0.793L38.855,37.385z M14.097,13.423
                      c1.823-1.823,4.246-2.827,6.824-2.827s5.002,1.004,6.825,2.827c1.823,1.823,2.827,4.247,2.827,6.825
                      c0,2.578-1.004,5.001-2.827,6.824c-1.823,1.823-4.247,2.827-6.825,2.827s-5.001-1.004-6.824-2.827
                      c-1.823-1.823-2.827-4.247-2.827-6.824C11.27,17.669,12.273,15.246,14.097,13.423z"
                />
              </svg>
            </button>);
          }
          // button for ClearButton
          if (type === TextInputButtonTypes.ClearButton) {
            return (
              <button
                key={type}
                type={"button"}
                className={
                  "appearance-none outline-none rounded-full min-w-[32px] min-h-[32px] bg-[#E24020] hover:scale-90 hover:bg-opacity-70 p-2"
                }
                // cause the onChange event fired
                onClick={() => {
                  input.current.value = null;
                  input.current.dispatchEvent(new Event('input', { bubbles: true }))
                }}
                {...buttonAttributes}
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 50"
                  enableBackground="new 0 0 50 50"
                  xmlSpace="preserve"
                >
                  <path
                    fill="#231F20"
                    d="M9.016,40.837c0.195,0.195,0.451,0.292,0.707,0.292c0.256,0,0.512-0.098,0.708-0.293l14.292-14.309
                      l14.292,14.309c0.195,0.196,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.292c0.391-0.39,0.391-1.023,0.001-1.414
                      L26.153,25.129L40.43,10.836c0.39-0.391,0.39-1.024-0.001-1.414c-0.392-0.391-1.024-0.391-1.414,0.001L24.722,23.732L10.43,9.423
                      c-0.391-0.391-1.024-0.391-1.414-0.001c-0.391,0.39-0.391,1.023-0.001,1.414l14.276,14.293L9.015,39.423
                      C8.625,39.813,8.625,40.447,9.016,40.837z"
                  />
                </svg>
              </button>
            );
          }
          // button for Password
          if (
            type === TextInputButtonTypes.ShowHidePassword &&
            (input.current?.type === "password" || input.current?.type === 'text')
          ) {
            return (<button
              key={type}
              type={"button"}
              title={isPasswordShow ? 'hide' : 'show password'}
              onClick={() => {
                setIsPasswordShow(current => {
                  input.current?.setAttribute(
                    "type",
                    isPasswordShow ? "password" : "text",
                  );
                  return !current
                });
              }}
              className={"appearance-none outline-none text-center mx-1 min-w-[32px] min-h-[32px] hover:scale-90"}
              {...buttonAttributes}
            >
              {!isPasswordShow ? (
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                >
                  <g id="icomoon-ignore"></g>
                  <path
                    d="M16 6.404c-5.847 0-10.404 3.66-15.994 9.593 4.816 5.073 8.857 9.6 15.994 9.6s12.382-5.73 15.994-9.492c-3.697-4.407-8.943-9.7-15.994-9.7zM16 24.53c-6.336 0-10.16-3.929-14.524-8.532 5.192-5.414 9.32-8.527 14.524-8.527 6.161 0 10.975 4.443 14.558 8.591-3.523 3.674-8.293 8.469-14.558 8.469z"
                    fill="#000000"
                  ></path>
                  <path
                    d="M16 9.603c-3.528 0-6.398 2.87-6.398 6.397s2.87 6.397 6.398 6.397 6.398-2.87 6.398-6.397-2.87-6.397-6.398-6.397zM16 21.331c-2.939 0-5.331-2.391-5.331-5.331s2.392-5.331 5.331-5.331 5.331 2.391 5.331 5.331c0 2.939-2.392 5.331-5.331 5.331z"
                    fill="#000000"
                  ></path>
                  <path
                    d="M16 12.268c-2.058 0-3.732 1.674-3.732 3.732s1.674 3.732 3.732 3.732c2.058 0 3.732-1.674 3.732-3.732s-1.674-3.732-3.732-3.732zM16 18.666c-1.47 0-2.666-1.196-2.666-2.666s1.196-2.666 2.666-2.666 2.666 1.196 2.666 2.666c0 1.47-1.196 2.666-2.666 2.666z"
                    fill="#000000"
                  ></path>
                </svg>
              ) : (
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.21967 2.21967C1.9534 2.48594 1.9292 2.9026 2.14705 3.19621L2.21967 3.28033L6.25424 7.3149C4.33225 8.66437 2.89577 10.6799 2.29888 13.0644C2.1983 13.4662 2.4425 13.8735 2.84431 13.9741C3.24613 14.0746 3.6534 13.8305 3.75399 13.4286C4.28346 11.3135 5.59112 9.53947 7.33416 8.39452L9.14379 10.2043C8.43628 10.9258 8 11.9143 8 13.0046C8 15.2138 9.79086 17.0046 12 17.0046C13.0904 17.0046 14.0788 16.5683 14.8004 15.8608L20.7197 21.7803C21.0126 22.0732 21.4874 22.0732 21.7803 21.7803C22.0466 21.5141 22.0708 21.0974 21.8529 20.8038L21.7803 20.7197L15.6668 14.6055L15.668 14.604L14.4679 13.4061L11.598 10.5368L11.6 10.536L8.71877 7.65782L8.72 7.656L7.58672 6.52549L3.28033 2.21967C2.98744 1.92678 2.51256 1.92678 2.21967 2.21967ZM10.2041 11.2655L13.7392 14.8006C13.2892 15.2364 12.6759 15.5046 12 15.5046C10.6193 15.5046 9.5 14.3853 9.5 13.0046C9.5 12.3287 9.76824 11.7154 10.2041 11.2655ZM12 5.5C10.9997 5.5 10.0291 5.64807 9.11109 5.925L10.3481 7.16119C10.8839 7.05532 11.4364 7 12 7C15.9231 7 19.3099 9.68026 20.2471 13.4332C20.3475 13.835 20.7546 14.0794 21.1565 13.9791C21.5584 13.8787 21.8028 13.4716 21.7024 13.0697C20.5994 8.65272 16.6155 5.5 12 5.5ZM12.1947 9.00928L15.996 12.81C15.8942 10.7531 14.2472 9.10764 12.1947 9.00928Z" fill="#212121" />
                </svg>
              )}
            </button>);
          }
        })}
      </>
    </div>
  );
};

export default TextInput;
