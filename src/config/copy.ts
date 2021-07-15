export const homeCopy = {
  title: "Hi, I'm Altay",
  description: 'Thanks for visiting my website.',
  links: [
    {
      label: 'More about me',
      href: '/about',
    },
    {
      label: 'What am I doing now',
      href: '/now',
    },
  ],
  posts: {
    href: '/blog',
    title: 'Recent blog posts',
    viewAll: 'View all blog posts',
  },
  books: {
    href: '/books',
    title: 'Recent book notes',
    viewAll: 'View all book notes',
  },
} as const

export const aboutCopy = {
  icon: '🏴',
  title: "Hi, I'm Altay",
}

export const blogCopy = {
  icon: '🤔',
  title: 'Blog',
  description: 'Learnings worth sharing.',
} as const

export const bookmarksCopy = {
  icon: '📑',
  title: 'Bookmarks',
  description: 'Cool things all over the internet.',
}

export const booksCopy = {
  icon: '📚',
  title: 'Books',
  description: `Notes from the books I read.`,
}

export const contactCopy = {
  title: 'Contact',
  description: 'Me on the internets.',
}

export const notesCopy = {
  icon: '📝',
  title: `Notes`,
  description: `Random thoughts and references.`,
}

export const nowCopy = {
  icon: '⏱',
  title: "What I'm doing now",
  description:
    "This is a [monthly updated](/now/history) now page, and it's inspired by [Derek Sivers.](https://nownownow.com)",
}

export const nowHistoryCopy = {
  icon: '🗓',
  title: 'History',
  description: `What I've been doing`,
}

export const tagsCopy = {
  icon: '#️⃣',
  title: 'Tags',
}

export const vocabCopy = {
  icon: '📖',
  title: 'Vocabulary',
  description: 'Some interesting elements I came across while reading.',
}

export const playlistsCopy = {
  icon: '🎧',
  title: 'Playlists',
  description: 'My Spotify playlists.',
}
