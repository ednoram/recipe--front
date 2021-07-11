import { FC } from "react";
import Link from "next/link";

import { Recipe } from "@/types";
import { useIsLoggedIn } from "@/hooks";
import { ContactUs, RecipeList } from "@/components";
import { RECIPES_ROUTE, REGISTER_ROUTE } from "@/constants";

import styles from "./Home.module.scss";

interface Props {
  recipes: Recipe[];
}

const Home: FC<Props> = ({ recipes }) => {
  const isLoggedIn = useIsLoggedIn();

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
          <h3 className={styles.content__subtitle}>
            Discover recipes. Post your own recipes.
          </h3>
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
        <RecipeList recipes={recipes.slice(0, 4)} />
        {recipes.length > 4 && (
          <div className="flex_right">
            <Link href={RECIPES_ROUTE}>
              <a className={styles.content__see_more_link}>See More →</a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );

  const contactUsSection = (
    <section className={styles.content__contact_us_section}>
      <ContactUs />
    </section>
  );

  const mainClassName = `${styles.content} ${
    !isLoggedIn ? styles.logged_in_content : ""
  } `;

  return (
    <main className={mainClassName}>
      {topSection}
      {discoverSection}
      {contactUsSection}
    </main>
  );
};

export default Home;
