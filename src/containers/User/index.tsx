import { FC } from "react";
import Link from "next/link";

import { User, Recipe } from "@/types";
import { RecipeList } from "@/components";
import { USERS_ROUTE } from "@/constants";

import styles from "./User.module.scss";

interface Props {
  user: User;
  recipes: Recipe[];
}

const UserPage: FC<Props> = ({ user, recipes }) => {
  return (
    <main className={styles.content}>
      <section>
        <div className="container">
          <Link href={USERS_ROUTE}>
            <a className="color-primary">← Users</a>
          </Link>
          <h1 className={styles.content__title}>{user.name}</h1>
          <p className={styles.content__email}>{user.email}</p>
        </div>
      </section>
      <section className={styles.content__recipes_section}>
        <div className="container">
          <h2 className="color-primary">Recipes ({recipes.length})</h2>
          <RecipeList recipes={recipes} />
        </div>
      </section>
    </main>
  );
};

export default UserPage;
