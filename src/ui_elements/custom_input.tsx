import { FC, useState } from "react";
import "./style/custom_input_style.css";

interface ICustomInput {
  placeholder: string;
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>> | void;
}

export const CustomInput: FC<ICustomInput> = ({
  placeholder,
  value = "",
  onChange = () => {},
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={(isActive && "custom_input_active") || "custom_input"}
      tabIndex={0}
      onFocus={(e) => {
        setIsActive(true);
      }}
      onBlur={(e) => {
        const valueIsEmpty = value.trim() === "";
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
          onChange(e.target.value)
        }
      />
    </div>
  );
};

//value={value}
