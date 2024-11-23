import { getBooksWithMarkdown } from "@/lib/books";
import { getPostsWithMarkdown } from "@/lib/posts";
import { getBacklinks } from "./backlinks";

jest.mock("@/lib/posts", () => ({
  getPostsWithMarkdown: jest.fn(),
}));

jest.mock("@/lib/books", () => ({
  getBooksWithMarkdown: jest.fn(() => []),
}));

describe("getBacklinks", () => {
  beforeAll(() => {
    const mockGetPostsWithMarkdown =
      getPostsWithMarkdown as jest.MockedFunction<typeof getPostsWithMarkdown>;

    mockGetPostsWithMarkdown.mockImplementation(() => [
      {
        markdown: "hello and [hi](/posts/hi)",
        post: {
          date: "2020-12-21T20:41:04Z",
          oneliner: "yes",
          readingTime: "1 min read",
          slug: "yes",
          title: "yes",
          url: "/posts/yes",
        },
      },
      {
        markdown: "hello and hi",
        post: {
          date: "2020-12-21T20:41:04Z",
          oneliner: "no",
          readingTime: "1 min read",
          slug: "no",
          title: "no",
          url: "/posts/no",
        },
      },
    ]);

    const mockGetBooksWithMarkdown =
      getBooksWithMarkdown as jest.MockedFunction<typeof getBooksWithMarkdown>;

    mockGetBooksWithMarkdown.mockImplementation(() => [
      {
        book: {
          authors: ["Jess Henderson"],
          coverImage: {
            aspectRatio: 0.8067226890756303,
            blurhash:
              "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABAwQDAAAAAAAAAAAAAAADAAECBAUGEQdTY//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8As3jjpg1rDjlmVO0Qi1urH1x80RFB/9k=",
            url: "/images/books/offline-matters/cover.png",
          },
          dateRead: "2021-07-16",
          identifiers: [
            {
              identifier: "9063695780",
              type: "ISBN_10",
            },
            {
              identifier: "9789063695781",
              type: "ISBN_13",
            },
          ],
          notes: {
            url: "/books/offline-matters",
          },
          quote:
            "We are all bored and everything is boring. Occupied 24/7, doing nothing at all.",
          rating: 4,
          remoteCoverImage: {
            url: "https://cdn.webshopapp.com/shops/71491/files/331301478/jess-henderson-offline-matters.jpg",
          },
          slug: "offline-matters",
          title: "Offline Matters",
        },
        markdown: "hello and [hi](/posts/hi)",
      },
    ]);
  });

  it("works", () => {
    const input = "/posts/hi";
    expect(getBacklinks(input)).toMatchSnapshot();
  });
});
