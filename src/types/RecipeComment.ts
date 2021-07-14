interface RecipeComment {
  _id: string;
  email: string;
  message: string;
  recipeId: string;
  updatedAt?: Date;
  createdAt?: Date;
  rate: 1 | 2 | 3 | 4 | 5;
}

export default RecipeComment;
