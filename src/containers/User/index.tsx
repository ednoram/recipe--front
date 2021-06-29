import { FC } from "react";
import Link from "next/link";

import { User, Recipe } from "@/types";
import { RecipeList } from "@/components";

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
          <Link href="/">
            <a className="color-primary">← Home</a>
          </Link>
          <h1 className={styles.content__title}>{user.name}</h1>
          <p className={styles.content__email}>{user.email}</p>
        </div>
      </section>
      <section className={styles.content__recipes_section}>
        <div className="container">
          <h2 className="color-primary">Recipes</h2>
          <p>
            <RecipeList recipes={recipes} />
          </p>
        </div>
      </section>
    </main>
  );
};

export default UserPage;
