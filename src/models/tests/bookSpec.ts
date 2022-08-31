import { Book, BookStore } from "../book";

const store = new BookStore();
describe("Bookstore testing suite", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    
  })
});
