interface RecipeComment {
  _id: string;
  email: string;
  message: string;
  recipeId: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export default RecipeComment;
