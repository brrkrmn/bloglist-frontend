import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import blogService from "../../services/blogs";

jest.mock("../../services/blogs");

test("blog form handler is called with the right blog details", async () => {
  blogService.create.mockResolvedValue({
    title: "test title",
    author: "test author",
    url: "test url",
  });

  const onCreate = jest.fn();
  const user = userEvent.setup();
  render(<BlogForm onCreate={onCreate} />);

  const formButton = screen.getByText("Add Blog");
  await user.click(formButton);

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");
  const submitButton = screen.getByText("Add");

  await user.type(titleInput, "test title");
  await user.type(authorInput, "test author");
  await user.type(urlInput, "test url");
  await user.click(submitButton);

  expect(blogService.create).toHaveBeenCalledWith({
    title: "test title",
    author: "test author",
    url: "test url",
  });

  expect(onCreate.mock.calls).toHaveLength(1);
  expect(onCreate).toHaveBeenCalledWith({
    title: "test title",
    author: "test author",
    url: "test url",
  });
});
