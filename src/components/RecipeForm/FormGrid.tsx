import { FC, useRef, useMemo, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Recipe } from "@/types";
import { setFormImage } from "@/store/actions";
import { selectFormImage } from "@/store/selectors";

import InputsList from "./InputsList";
import styles from "./RecipeForm.module.scss";

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];
const MAXIMUM_FILE_SIZE = 1024 * 1024 * 5;

interface Props {
  recipe: Recipe | undefined;
}

const FormGrid: FC<Props> = ({ recipe }) => {
  const image = useSelector(selectFormImage);
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

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
        dispatch(setFormImage(file));
      }
    }
  };

  const clickFileInput = () =>
    fileInputRef.current && fileInputRef.current.click();

  const backgroundImageUrl = useMemo(() => {
    const noImageStyle = recipe?.imageUrl || "";
    return !image ? noImageStyle : URL.createObjectURL(image);
  }, [image]);

  const imageDiv = (
    <div
      className={styles.form__image_div}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    />
  );

  return (
    <div className={styles.form__grid}>
      <div>
        {imageDiv}
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
      <InputsList />
    </div>
  );
};

export default FormGrid;
