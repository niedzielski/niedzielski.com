---
dateModified: '2022-06-19'
datePublished: '2022-02-23'
keywords: ['dev', 'sitemaps', 'APIs']
headline: 'A survey of website structures and APIs.'
title: 'Website structures and APIs'
---

A survey of website structures and APIs.

## Twitter

### Routes

- **`https://twitter.com`**
  - **`/`**: login / account creation landing page.
  - **`/home`**: primary feed for the logged-in user.
  - **`/explore`**: alternative feed for the logged-in/out user.
    - **`/explore/tabs/:tabID`**: explore tab feed for the logged-in/out user.
  - **`/notifications`**: notifications inbox for the logged-in user.
  - **`/messages`**: messages inbox for the logged-in user.
    - **`/messages/:id`**: message thread.
  - **`/search?q=:query`**: tweet search results for the logged-in user. This is
    frequently used for searching on tags like `#foo`.
  - **`/settings`**: configuration for the logged-in/out user.
    - **`/settings/about`**: Settings → General → Additional resources.
    - **`/settings/account/personalization`**: Settings → Privacy →
      Personalization and data.
    - **`/settings/your_twitter_data`**: Settings → Privacy → Your Twitter data.
    - **`/settings/profile`**: configuration for the logged-in user's profile
      (name, bio, location, etc).
    - **…**: Many more subpaths for the logged-in user.
  - **`/i/flow`**: workflow modal dialogs.
    - **`/i/flow/login`**: login workflow.
    - **`/i/flow/password_reset`**: password reset workflow.
    - **`/i/flow/convert_to_professional`**: professional account sign-up
      workflow.
  - **`/:username`**: public profile and feed for a user (tweets may be
    private).
    - **`/:username/status/:id`**: a public/private tweet.
    - **`/:username/status/:id/photo/:index`**: a tweet's photo carousel index.
    - **`/:username/lists`**: public/private lists for a user.
    - **`/:username/topics`**: topics for a user.
  - **`/i/lists/:listID`**: public/private list.
  - **`/i/release_notes`**: changelog.

### Content delivery networks (CDNs)

- **`https://pbs.twimg.com`**
  - **`/media/:id?format=:format&name=:size`**: CDN for different formats like
    `jpg` and sizes like `large`.
  - **`/profile_banners/:userID/:contentID/:widthx:height`**: user profile
    banners.
  - **`/profile_images/:id/_:anotherID_:widthx:height.:format`**: user profile
    images.
- **`https://abs.twimg.com`**: non-user content resources.
  - **`/favicons/:filename`**: Favicons.
  - **`/:filename`**: JavaScripts, manifest, and other files.
  - **`/fonts/v2/:filename`**: Web fonts.
- **`https://ads-api.twitter.com`**

### APIs

- **`https://twitter.com`**
  - **`/i/api`**
    - **`/1.1/account/settings.json`**
    - **`/graphql/?/UserTweets`**
    - **`/2/notifications/all.json`**
- **`https://api.twitter.com`**
  - **`/1.1/jot/client_event.json`**

### Notes

- The settings UI hierarchy does not correspond to the URL. For example, 1)
  Settings → 2) Privacy → 3) Your Twitter data → 4) Account → 5) Gender is
  `/settings/your_twitter_data/gender` and the sibling 5) Age tab is
  `/settings/your_twitter_data/age`. External links that would open a new tab
  are clearly marked (eg, see Legal links under `/settings/about`).
- Tweets can appear in many UI contexts. Eg, both `/home` and
  `/explore/tabs/:tabID` have links to `/:username/status/:id` (ie, the URL
  hierarchy doesn't nest under `/home` and `/explore`, respectively). It makes
  sense both from a user interface / URL perspective to point to one location as
  every tweet is globally unique and associated with exactly one user.
- Tweets are accessed by ID. This is nicely terse and avoids collisions.
  However, given that tweets are so short, their entire text contents would fit
  within URL limits like `/niedzielski/status/hello-world`. It would be
  interesting to experiment with this. What do you on collision,
  `/niedzielski/status/hello-world-2`? What about when a tweet is empty and just
  photos? Are named tweets more usable in practice or just cumbersome to share?
  Eg, `https://twitter.com/niedzielski/status/1347422718929502210` vs
  `https://twitter.com/niedzielski/status/exploring-a-new-art-style-for-natureelsewhere.-higher-resolution.-no-more-backpacker.-wip-sketch-screenshotsaturday-indiegamedev-httpnatureelsewhere.com`.
  Compare to Stack Overflow.
- The `https://twitter.com/i/api` endpoints support many query parameters.

## YouTube

### Routes

- **`https://youtube.com`**
  - **`/feed`**:
    - **`/feed/explore`**:
    - **`/feed/library`**:
    - **`/feed/subscriptions`**:
  - **`/watch?v=:videoID`**:
