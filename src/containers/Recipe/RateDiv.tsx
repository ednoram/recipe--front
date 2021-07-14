import { FC } from "react";

import StarIcon from "public/star-icon.svg";

import { Rate } from "@/types";

import styles from "./Recipe.module.scss";

interface Props {
  rate: Rate;
  setRate?: (arg: number) => void;
}

const RateDiv: FC<Props> = ({ rate, setRate }) => {
  return (
    <div className={styles.content__comments_rate_div}>
      {[...Array(5).keys()].map((key) => (
        <StarIcon
          aria-label={setRate && "Change Rate"}
          key={key}
          onClick={() => setRate && setRate(key + 1)}
          style={!setRate ? { cursor: "unset" } : {}}
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
