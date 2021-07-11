import { useState, useMemo, FC } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

import { User } from "@/types";
import { USERS_ROUTE } from "@/constants";

import styles from "./FindUsers.module.scss";

interface Props {
  users: User[];
}

const FindUsers: FC<Props> = ({ users }) => {
  const [listLimit, setListLimit] = useState(10);

  const sortedUsers = users.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const visibleUsers = sortedUsers.slice(0, listLimit);

  const getCreatedAtString = (createdAt: Date) =>
    new Date(createdAt).toLocaleDateString("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const columnNames = useMemo(
    () => ["Name", "Email Address", "Joined On", "Link"],
    []
  );

  const list = (
    <ul className={styles.content__list}>
      <li className={styles.content__list_item}>
        <ul className={styles.content__list_item_grid_first}>
          {columnNames.map((name) => (
            <li key={nanoid()}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </li>
      {visibleUsers.map((user) => (
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
      ))}
    </ul>
  );

  const showMoreButton = (
    <button
      name="Show more"
      onClick={() => setListLimit(listLimit + 10)}
      className={styles.content__show_more_button}
    >
      Show More
    </button>
  );

  return (
    <main>
      <section className={styles.content}>
        <div className="container">
          <h1 className={styles.content__title}>Find Users</h1>
          {list}
          {listLimit < users.length && (
            <div className="flex_center">{showMoreButton}</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default FindUsers;
