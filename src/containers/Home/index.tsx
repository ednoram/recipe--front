import { FC } from "react";
import Link from "next/link";

import { Recipe } from "@/types";
import { sortRecipes } from "@/utils";
import { useIsLoggedIn } from "@/hooks";
import { RecipeList } from "@/components";
import { RECIPES_ROUTE, REGISTER_ROUTE } from "@/constants";

import ContactUsSection from "./ContactUsSection";
import styles from "./Home.module.scss";

interface Props {
  recipes: Recipe[];
}

const Home: FC<Props> = ({ recipes }) => {
  const isLoggedIn = useIsLoggedIn();

  const sortedRecipes = sortRecipes(recipes);

  const topSection = isLoggedIn ? (
    <section>
      <div className="container">
        <h1 className="color-primary">Home</h1>
      </div>
    </section>
  ) : (
    <section className={styles.content__top_section}>
      <div className="container">
        <div className={styles.content__top_text_div}>
          <h1 className={styles.content__title}>
            {"It's all about good food & taste!"}
          </h1>
          <h2 className={styles.content__subtitle}>
            Discover recipes. Post your own recipes.
          </h2>
          <Link href={REGISTER_ROUTE}>
            <a>
              <div className={styles.content__join_button}>Join Now</div>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );

  const discoverSection = (
    <section className={styles.content__discover_section}>
      <div className="container">
        <h2 className="color-primary">Discover</h2>
        <RecipeList recipes={sortedRecipes.slice(0, 4)} />
        {sortedRecipes.length > 4 && (
          <div className="flex_right">
            <Link href={RECIPES_ROUTE}>
              <a className={styles.content__see_more_link}>See More →</a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );

  const mainClassName = `${styles.content} ${
    !isLoggedIn ? styles.logged_in_content : ""
  } `;

  return (
    <main className={mainClassName}>
      {topSection}
      {discoverSection}
      <ContactUsSection />
    </main>
  );
};

export default Home;
