import {
  FC,
  useRef,
  useMemo,
  Dispatch,
  ChangeEvent,
  SetStateAction,
} from "react";

import { getImageURL } from "@/utils";
import { MealTypeType, Recipe } from "@/types";

import InputsList from "./InputsList";
import styles from "./RecipeForm.module.scss";

const MAXIMUM_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

interface Props {
  recipe: Recipe | undefined;
  titleState: [string, Dispatch<SetStateAction<string>>];
  summaryState: [string, Dispatch<SetStateAction<string>>];
  stepsState: [string[], Dispatch<SetStateAction<string[]>>];
  mealTypeState: [string, Dispatch<SetStateAction<MealTypeType>>];
  imageState: [File | null, Dispatch<SetStateAction<File | null>>];
  ingredientsState: [string[], Dispatch<SetStateAction<string[]>>];
}

const FormGrid: FC<Props> = ({
  recipe,
  titleState,
  stepsState,
  imageState,
  summaryState,
  mealTypeState,
  ingredientsState,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = imageState;

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file && !ACCEPTED_FILE_TYPES.includes(file.type)) {
        alert(
          `File type must be one of these: ${ACCEPTED_FILE_TYPES.join(", ")}.`
        );
        return;
      }

      if (file.size > MAXIMUM_FILE_SIZE) {
        alert("File is too big!");
      } else {
        const file = e.target.files[0];
        setImage(file);
      }
    }
  };

  const clickFileInput = () =>
    fileInputRef.current && fileInputRef.current.click();

  const backgroundImageStyle = useMemo(() => {
    const noImageStyle = recipe?.imagePath ? getImageURL(recipe.imagePath) : "";
    return !image ? noImageStyle : `url(${URL.createObjectURL(image)})`;
  }, [image]);

  return (
    <div className={styles.form__grid}>
      <div>
        <div
          className={styles.form__image_div}
          style={{ backgroundImage: backgroundImageStyle }}
        />
        <div className="flex_center">
          <button
            type="button"
            name="select image"
            onClick={clickFileInput}
            className={styles.form__select_image_button}
          >
            Select Image
          </button>
        </div>
        <input
          type="file"
          name="image"
          className="hidden"
          ref={fileInputRef}
          onChange={uploadImage}
          accept={ACCEPTED_FILE_TYPES.join(", ")}
        />
      </div>
      <div>
        <InputsList
          stepsState={stepsState}
          titleState={titleState}
          summaryState={summaryState}
          mealTypeState={mealTypeState}
          ingredientsState={ingredientsState}
        />
      </div>
    </div>
  );
};

export default FormGrid;
