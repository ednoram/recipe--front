import { useState, useEffect, FC } from "react";

import { User } from "@/types";
import CloseIcon from "@/assets/close-icon.svg";

import List from "./List";
import styles from "./FindUsers.module.scss";

interface Props {
  users: User[];
}

const LIST_STEP = 10;

const FindUsers: FC<Props> = ({ users }) => {
  const [listLimit, setListLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => setListLimit(10), [searchValue]);

  const searchFilter = searchValue.trim().toLowerCase();

  const filteredUsers = searchFilter
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchFilter) ||
          user.email.toLowerCase().includes(searchFilter)
      )
    : users;

  const sortedUsers = filteredUsers.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const visibleUsers = sortedUsers.slice(0, listLimit);

  const searchbox = (
    <div className={styles.content__searchbox}>
      <input
        maxLength={40}
        value={searchValue}
        placeholder="Search by name or email"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <CloseIcon
          aria-label="Clear input"
          onClick={() => setSearchValue("")}
          className={styles.content__clear_input_icon}
        />
      )}
    </div>
  );

  const showMoreButton = (
    <button
      name="Show more"
      onClick={() => setListLimit(listLimit + LIST_STEP)}
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
          {searchbox}
          <List visibleUsers={visibleUsers} />
          {listLimit < users.length && (
            <div className="flex_center">{showMoreButton}</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default FindUsers;
