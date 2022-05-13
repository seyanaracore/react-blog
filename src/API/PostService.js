import axios from "axios";

const APIUrl = "http://localhost:3004/posts";

export class PostService {
   static async fetchPosts(limit = 10, page = 1) {
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

      const response = await axios.post(APIUrl, post);
      return response;
   }
   static async deletePost(post) {
      if (!post) return;

      const response = await axios.delete(APIUrl + "/" + post.id);
      return response;
   }
   static async updatePost(post) {
      if (!post) return;

      const response = await axios.put(APIUrl, post);
      return response;
   }
}
