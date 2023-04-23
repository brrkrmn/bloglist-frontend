import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../../services/blogs'

jest.mock("../../services/blogs")

const blogUser = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…AxMX0.h04aCMhHrW94CJTa-n66j6l35RaKyrFtsbPvBee43jw', username: 'root' }
const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    likes: 3,
    url: 'testUrl',
    user: { username: 'root', id: '6437a223a87eb50a05af89a3' },
}

test('blog title is visible initially', () => {
    render(<Blog blog={blog} user={blogUser} />)

    const blogTitle = screen.getByText('testTitle')
    expect(blogTitle).toBeVisible()
})

test('blog details are not displayed initially', () => {
    render(<Blog blog={blog} user={blogUser} />)

    const blogAuthor = screen.queryByText('testAuthor')
    const blogLikes = screen.queryByText(3)
    const blogUrl = screen.queryByText('testUrl')

    expect(blogAuthor).toBeNull()
    expect(blogLikes).toBeNull()
    expect(blogUrl).toBeNull()
})

test('blog details are displayed after clicking the "view" button', async () => {
    const user = userEvent.setup()
    render(<Blog blog={blog} user={blogUser} />)

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const blogAuthor = screen.getByText('testAuthor', { exact: false })
    const blogLikes = screen.getByText(3, { exact: false })
    const blogUrl = screen.getByText('testUrl', { exact: false })

    expect(blogAuthor).toBeVisible()
    expect(blogLikes).toBeVisible()
    expect(blogUrl).toBeVisible()
})

test('clicking the like button twice calls the event handler twice', async () => {
    blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 })

    const onLike = jest.fn()
    const user = userEvent.setup()
    render(<Blog blog={blog} user={blogUser} onLike={onLike} />)

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(onLike).toHaveBeenCalledTimes(2)
})