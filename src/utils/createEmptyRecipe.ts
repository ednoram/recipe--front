type EmptyRecipe = {
  _id: string;
  date: null;
  title: null;
  email: null;
  mealType: null;
  imagePath: null;
};

const createEmptyRecipe = (id: string): EmptyRecipe => ({
  _id: id,
  date: null,
  title: null,
  email: null,
  mealType: null,
  imagePath: null,
});

export default createEmptyRecipe;
