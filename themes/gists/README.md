# Hugo Theme - Gists

A minimalist gists blog theme for Hugo, inspired by Github Gists.

## Init hugo site

```bash
hugo new site mysite
cd mysite
```

## Install the theme

```sh
git init
git submodule add https://github.com/dmachard/hugo-theme-gists.git themes/gists
```

## Run in local

```sh
hugo server -D
```

## Update the theme

If you just installed the theme, it is already in the latest version. If not, you can update using the below commands

```bash
cd themes/gists
git pull
```

## Add new post

Hugo will create a post with `draft: true`, change it to false in order for it to show in the website.

```sh
hugo new blog/title_of_the_post.md
```

## Pin post

```ini
pin: true
```
