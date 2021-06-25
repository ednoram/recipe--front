interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  favoriteRecipes?: Array<string>;
}

export default UserData;
