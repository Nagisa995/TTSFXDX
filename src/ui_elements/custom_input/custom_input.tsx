import { FC, useEffect, useState } from "react";
import "./style/custom_input_style.css";

interface ICustomInput {
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isValid: boolean;
  disabled: boolean;
}

export const CustomInput: FC<ICustomInput> = ({
  placeholder,
  value,
  onChange,
  isValid,
  disabled,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const valueIsEmpty = value === "";
    if (valueIsEmpty) {
      setIsActive(false);
    }
  }, [value]);

  return (
    <div
      className={
        ((isActive && "custom_input_active") || "custom_input") +
        (isValid && !disabled ? " value_valid" : "")
      }
      tabIndex={0}
      onFocus={(e) => {
        setIsActive(true);
      }}
      onBlur={(e) => {
        const valueIsEmpty = value === "";
        if (!e.currentTarget.contains(e.relatedTarget) && valueIsEmpty)
          setIsActive(false);
      }}
    >
      <span className="placeholder">{placeholder}</span>
      <input
        type="text"
        className={
          (isActive && "custom_input_active_visible") ||
          "custom_input_invisible"
        }
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value.trim())
        }
      />
      {disabled && (
        <div
          className="disabled"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      )}
    </div>
  );
};
