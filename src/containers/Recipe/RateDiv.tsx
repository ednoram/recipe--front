import { FC, Dispatch, SetStateAction } from "react";

import { Rate } from "@/types";
import StarIcon from "@/assets/star-icon.svg";

import styles from "./Recipe.module.scss";

interface Props {
  rate: Rate;
  setRate?: Dispatch<SetStateAction<Rate>>;
}

const RateDiv: FC<Props> = ({ rate, setRate }) => {
  const changeRate = (rate: number) => {
    if (
      setRate &&
      (rate === 1 || rate === 2 || rate === 3 || rate === 4 || rate === 5)
    ) {
      setRate(rate);
    }
  };

  const getStarClassName = (index: number) =>
    `${
      rate >= index + 1
        ? styles.content__comments_rate_icon_filled
        : styles.content__comments_rate_icon
    } ${!setRate ? styles.content__comments_rate_icon_passive : ""}`;

  return (
    <div className={styles.content__comments_rate_div}>
      {[...Array(5).keys()].map((key) => (
        <StarIcon
          key={key}
          className={getStarClassName(key)}
          aria-label={setRate && "Change Rate"}
          style={!setRate ? { cursor: "unset" } : {}}
          onClick={() => setRate && changeRate(key + 1)}
        />
      ))}
    </div>
  );
};

export default RateDiv;
