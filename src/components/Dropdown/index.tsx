import { useState, useRef, FC, useEffect } from "react";
import { nanoid } from "nanoid";

import { useOutsideClick } from "@/hooks";
import ExpandIcon from "@/assets/expand-arrow-icon.svg";

import styles from "./Dropdown.module.scss";

interface Props {
  options: string[];
  selectFunc: (selectedOption: string) => void;
}

const Dropdown: FC<Props> = ({ options, selectFunc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const contentRef = useRef(null);

  useOutsideClick(contentRef, () => setIsOpen(false));

  useEffect(() => {
    selectFunc(selectedOption);
  }, [selectedOption]);

  const dropdownOptionsList = isOpen && (
    <ul className={styles.content__options_list}>
      {options.map((option) => (
        <li
          key={nanoid()}
          className={styles.content__option}
          aria-label="select option"
          onClick={() => {
            setSelectedOption(option);
            setIsOpen(false);
          }}
        >
          <p>{option}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={contentRef} className={styles.content}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={styles.content__selected_option}
      >
        {selectedOption}
        <ExpandIcon
          className={styles.content__expand_icon}
          style={isOpen ? { transform: "rotate(180deg)" } : {}}
        />
      </div>
      {dropdownOptionsList}
    </div>
  );
};

export default Dropdown;
