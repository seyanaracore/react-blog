import axios from "axios";

const APIUrl = "https://jsonplaceholder.typicode.com/posts";

export class PostService {
   static async fetchAll() {
      const response = await axios.get(APIUrl);
      return response.data;
   }
}
