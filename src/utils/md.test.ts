import {
  transformRelativeMarkdownLinks,
  getAbsoluteMarkdownLinks,
  extractUrlFromMarkdownLink,
} from './md'

describe('utils/md', () => {
  describe('transformRelativeMarkdownLinks', () => {
    it('works', () => {
      const input = `[book](../books/hi)`
      const output = '[book](/books/hi)'
      expect(transformRelativeMarkdownLinks('notes', input)).toEqual(output)
    })
  })

  describe('getAbsoluteMarkdownLinks', () => {
    it('works', () => {
      const input = `hey [hello](/books/hello) ho [world](../books/world)`
      const output = [`[hello](/books/hello)`]
      expect(getAbsoluteMarkdownLinks(input)).toEqual(output)
    })
  })

  describe('extractUrlFromMarkdownLink', () => {
    it('works', () => {
      const input = `[hello](/books/hello)`
      const output = '/books/hello'
      expect(extractUrlFromMarkdownLink(input)).toBe(output)
    })
  })
})
