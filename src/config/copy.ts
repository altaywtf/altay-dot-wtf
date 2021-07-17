export const homeCopy = {
  title: "Hi, I'm Altay",
  description:
    "I like computers, coffee, typefaces, and building things to solve problems I empathize with.\n\n I'm currently living in Berlin, working at [Klarna](https://klarna.com) as a software engineer, and spending time on some [projects](/projects) on the side.",
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
  notes: {
    href: '/notes',
    title: 'Recent notes',
    viewAll: 'See all notes',
  },
  books: {
    href: '/books',
    title: 'Recent book notes',
    viewAll: 'See all book notes',
  },
} as const

export const aboutCopy = {
  icon: '🏴',
  title: "Hi, I'm Altay",
  description:
    homeCopy.description +
    '\n\n Before [Klarna](https://klarna.com), I worked on the [mobile app](https://github.com/LiskHQ/lisk-mobile) of [Lisk](https://lisk.io).' +
    "\n\n Before moving to Berlin, I lived in Istanbul and built web, iOS, tvOS, Roku, Chromecast, and Smart TV apps of [Put.io](https://put.io), which I'm still a part of." +
    '\n\n You can [find me on Twitter](https://twitter.com/altaywtf), where I mostly complain and post photos of my workspace, or [drop me an email](mailto:altay@aydemir.io).' +
    '\n\n Thanks for visiting my website!',
}

export const notesCopy = {
  icon: '📝',
  title: `Notes`,
  description: `Random thoughts and references.`,
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

export const projectsCopy = {
  icon: '👨‍💻',
  title: 'Projects',
  description: 'I keep myself busy with those things while not working.',
}
