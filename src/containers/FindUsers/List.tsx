import { FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

import { User } from "@/types";
import { USERS_ROUTE } from "@/constants";

import styles from "./FindUsers.module.scss";

interface Props {
  visibleUsers: User[];
}

const LIST_COLUMN_NAMES = ["Name", "Email Address", "Joined On", "Link"];

const List: FC<Props> = ({ visibleUsers }) => {
  const getCreatedAtString = (createdAt: Date) =>
    new Date(createdAt).toLocaleDateString("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const listItems = visibleUsers.map((user) => (
    <li key={nanoid()} className={styles.content__list_item}>
      <ul className={styles.content__list_item_grid}>
        <li>
          <p className={styles.content__list_user_name}>{user.name}</p>
        </li>
        <li>
          <p className={styles.content__list_label}>Email Address: </p>
          <p>{user.email}</p>
        </li>
        <li>
          <p className={styles.content__list_label}>Joined On: </p>
          <p>{getCreatedAtString(user.createdAt)}</p>
        </li>
        <li>
          <Link href={`${USERS_ROUTE}/${user.email}`}>
            <a className="color-primary">See User →</a>
          </Link>
        </li>
      </ul>
    </li>
  ));

  return (
    <ul className={styles.content__list}>
      <li className={styles.content__list_item}>
        <ul className={styles.content__list_item_grid_first}>
          {LIST_COLUMN_NAMES.map((name) => (
            <li key={nanoid()}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </li>
      {visibleUsers.length > 0 ? (
        listItems
      ) : (
        <p className={styles.content__nothing_was_found_p}>Nothing was found</p>
      )}
    </ul>
  );
};

export default List;
