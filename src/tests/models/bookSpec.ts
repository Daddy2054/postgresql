//import { Book, BookStore } from "../book";

import { BookStore } from "../../models/book";

const store = new BookStore();
describe("Bookstore testing suite", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
  });

  it("show method should return a single product", async () => {
    const result = await store.show("2");
    expect(result).toBeInstanceOf(Object);
  });

  it("create method should return a new single product", async () => {
    const newBook = {
      title: 'title11',
      author: 'string_author',
      total_pages: 150,
      summary: "djfhgakldshaskjhgaslkdhgasklj aslkdhfaslkjhf",
      id: 1
    };

    const result = await store.create(newBook);
    expect(result).toBeInstanceOf(Object);
  });

  it("delete method should return 'undefined'", async () => {
    const result = await store.delete("5");
    expect(result).toBeUndefined();
  });
/// refactor here, first check if exist, then delete and check if undefined

});

//add setup and teardown of book table