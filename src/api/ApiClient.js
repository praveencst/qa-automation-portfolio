class ApiClient {
  constructor(request) {
    this.request = request;
  }

  async getPosts() {
    return await this.request.get('/posts');
  }

  async getUsers() {
    return await this.request.get('/users');
  }

  async getUserById(id) {
    return await this.request.get(`/users/${id}`);
  }

  async createPost(data) {
    return await this.request.post('/posts', { data });
  }
}

module.exports = { ApiClient };