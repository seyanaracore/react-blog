import axios from "axios";

const APIUrl = "https://jsonplaceholder.typicode.com/posts";

export class PostService {
   static async fetchAll(limit = 10, page = 1) {
      const response = await axios.get(APIUrl, {
         params: {
            _limit: limit,
            _page: page,
         },
      });
      return response;
   }
}
