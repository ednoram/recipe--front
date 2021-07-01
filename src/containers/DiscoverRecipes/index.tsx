import { FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { RecipeList } from "@/components";
import { selectRecipes } from "@/store/selectors";

import styles from "./DiscoverRecipes.module.scss";

const DiscoverRecipes: FC = () => {
  const recipes = useSelector(selectRecipes);

  return (
    <main>
      <section className={styles.content}>
        <div className="container">
          <Link href="/">
            <a className="color-primary">← Home</a>
          </Link>
          <h1 className={styles.content__title}>Discover Recipes</h1>
          <div className={styles.content__list}>
            <RecipeList recipes={recipes} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiscoverRecipes;
