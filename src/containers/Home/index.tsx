import { FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useIsLoggedIn } from "@/hooks";
import { RecipeList } from "@/components";
import { selectRecipes } from "@/store/selectors";
import { DISCOVER_RECIPES_ROUTE, REGISTER_ROUTE } from "@/constants";

import styles from "./Home.module.scss";

const Home: FC = () => {
  const recipes = useSelector(selectRecipes);
  const isLoggedIn = useIsLoggedIn();

  const topSection = isLoggedIn ? (
    <section>
      <div className="container">
        <h1 className={`${styles.home_h1} color-primary`}>Home</h1>
      </div>
    </section>
  ) : (
    <section className={styles.top_section}>
      <div className="container">
        <div className={styles.top_section__text_div}>
          <h1 className={styles.top_section__title}>
            {"It's all about good food & taste!"}
          </h1>
          <h3 className={styles.top_section__subtitle}>
            Discover recipes. Post your own recipes.
          </h3>
          <Link href={REGISTER_ROUTE}>
            <a>
              <button className={styles.top_section__join_button}>
                Join Now
              </button>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );

  const discoverSectionContent = (
    <div className="container">
      <h2 className="color-primary">Discover</h2>
      <RecipeList recipes={recipes.slice(0, 4)} />
      {recipes.length > 4 && (
        <div className="flex_right">
          <Link href={DISCOVER_RECIPES_ROUTE}>
            <a className={styles.discover_section__link}>See More →</a>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <main>
      {topSection}
      <section className={styles.discover_section}>
        {discoverSectionContent}
      </section>
    </main>
  );
};

export default Home;
