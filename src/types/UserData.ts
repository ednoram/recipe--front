interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  favoriteRecipes?: string[];
}

export default UserData;
