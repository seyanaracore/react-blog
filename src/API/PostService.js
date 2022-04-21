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
   static async fetchPost(id = 1) {
      const response = await axios.get(APIUrl + `/${id}/comments`);
      return response;
   }
   static async newPost(post) {
      if (!post) return;
      post.userId = 1;

      const response = await axios.post(APIUrl, post);
      return response;
   }
}
