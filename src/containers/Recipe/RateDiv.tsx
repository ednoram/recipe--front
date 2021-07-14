import { FC, Dispatch, SetStateAction } from "react";

import StarIcon from "public/star-icon.svg";

import { Rate } from "@/types";

import styles from "./Recipe.module.scss";

interface Props {
  rate: Rate;
  setRate?: Dispatch<SetStateAction<Rate>>;
}

const RateDiv: FC<Props> = ({ rate, setRate }) => {
  const changeRate = (rate: number) => {
    if (setRate && rate === 0) {
      setRate(rate);
    }
  };

  return (
    <div className={styles.content__comments_rate_div}>
      {[...Array(5).keys()].map((key) => (
        <StarIcon
          aria-label={setRate && "Change Rate"}
          key={key}
          style={!setRate ? { cursor: "unset" } : {}}
          onClick={() => setRate && changeRate(key + 1)}
          className={`${
            rate >= key + 1
              ? styles.content__comments_rate_icon_filled
              : styles.content__comments_rate_icon
          } ${!setRate ? styles.content__comments_rate_icon_passive : ""}`}
        />
      ))}
    </div>
  );
};

export default RateDiv;
