export const homeCopy = {
  title: "Hi, I'm Altay",
  description:
    "I like computers, books, coffee, and building things that are solving problems I empathize with.\n\n I'm currently living in Berlin, working at [Klarna](https://klarna.com) as a software engineer, and spending time on some [passion projects](/projects) on the side.",
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
} as const

export const aboutCopy = {
  icon: '🏴',
  title: "Hi, I'm Altay",
  description:
    homeCopy.description +
    '\n\n Before [Klarna](https://klarna.com), I worked on the [open source mobile application](https://github.com/LiskHQ/lisk-mobile) of [Lisk.](https://lisk.io)' +
    "\n\n Before moving to Berlin, I lived in Istanbul and built web, iOS, tvOS, Roku, Chromecast, and Smart TV apps of [put.io](https://put.io), which I'm still a part of." +
    '\n\n You can [find me on Twitter](https://twitter.com/altaywtf), where I complain and post photos of my workspace, or [drop me an email](mailto:altay@aydemir.io).' +
    '\n\n Thanks for visiting my website!',
}

export const notesCopy = {
  icon: '📝',
  title: `Notes`,
  description:
    'This is a [digital garden](https://github.com/MaggieAppleton/digital-gardeners) to practice learning, thinking, and building in public.',
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

export const nowCopy = {
  icon: '⏱',
  title: "What I'm doing now.",
  description: 'This is a now page inspired by [Derek Sivers.](https://nownownow.com)',
}

export const projectsCopy = {
  icon: '👨‍💻',
  title: 'Projects',
  description: 'I usually do these things when not working.',
}
