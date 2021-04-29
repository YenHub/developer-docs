### Long Lost Friend?

How to get a git user's email address 😉

This can be helpful if you've lost touch with someone, but still know their git handle!

#### Opt.1

1.  Navigate to a user's Hub
2.  Go to their repos
3.  Enter a repo, the older the better (newer might have been patched out of this bug)
4.  Go to Commits
5.  Click any commit
6.  The URL will read:

<https://github.com/[User-Name]/[Repository-Name]/commit/8d624b0136a89fec1176c2e57ad11b436c134b99>

7.  Append '.patch' to the end of the URL

8.  Access new URL:

<https://github.com/[User-Name]/[Repository-Name]/commit/8d624b0136a89fec1176c2e57ad11b436c134b99.patch>

9.  You'll get this response header that is written to the page:-


    From 7b875b0136g45fer6576c3e57ad11b436c134b99 Mon Sep 17 00:00:00 2001
    From: Devy-McDevDev <Devy-McDevDev@email.com>
    Date: Wed, 11 May 2016 21:16:25 +0530
    Subject: [PATCH] Readme updated

#### Opt.2

NOTE: This is not as successful if a user hasn't posted public commits

<https://api.github.com/users/xxxxxxx/events/public>

Replace xxxxxxx with the user's ID
