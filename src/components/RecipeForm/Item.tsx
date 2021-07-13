import { useState, FC } from "react";

import EditIcon from "public/edit-icon.svg";

import ItemsInput from "./ItemsInput";
import styles from "./RecipeForm.module.scss";

interface Props {
  item: string;
  index: number;
  typeIsIngredients: boolean;
}

const Item: FC<Props> = ({ typeIsIngredients, item, index }) => {
  const [editing, setEditing] = useState(false);

  return (
    <li className={`${styles.form__add_item_item} flex`}>
      {editing ? (
        <ItemsInput
          editing
          item={item}
          index={index}
          setEditing={setEditing}
          typeIsIngredients={typeIsIngredients}
        />
      ) : (
        <>
          <p>{index + 1 + ". " + item[0].toUpperCase() + item.slice(1)}</p>
          <EditIcon
            aria-label="edit item"
            onClick={() => setEditing(true)}
            className={styles.form__edit_item_icon}
          />
        </>
      )}
    </li>
  );
};

export default Item;
