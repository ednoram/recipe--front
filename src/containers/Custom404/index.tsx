import { FC } from "react";
import Link from "next/link";

import RecipeIcon from "@/assets/blank-recipe-icon.svg";

import styles from "./Custom404.module.scss";

const Custom404: FC = () => {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.container__flex_div}>
            <RecipeIcon className={styles.container__recipe_icon} />
            <div>
              <h1 className={styles.container__title}>Page Not Found 404</h1>
              <p className={styles.container__message}>
                The page you were looking for does not exist.
              </p>
              <div className="flex_center">
                <Link href="/">
                  <a className={styles.container__return_link}>
                    ← Go to Home Page
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Custom404;
