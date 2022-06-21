# Contributing to Treble

Loving the Treble Framework and want to get involved? Great! There are plenty of ways you can help.

Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

## Folder Structure of Create React App

`create-treble-app` is a monorepo, meaning it is divided into independent sub-packages.<br>
These packages can be found in the [`packages/`](https://github.com/Threekit/treble/tree/main/packages) directory.

### Overview of directory structure

```
packages/
  create-treble-app/
  treble-components/
  treble-react/
  treble-scripts/
  treble-template/
  treble-template-typescript/
```

### Package Descriptions

#### [create-treble-app](https://github.com/Treble/treble/tree/main/packages/create-treble-app)

The global CLI command code can be found in this directory. Users are unlikely to update this package so it should change as little as possible.

## Setting Up a Local Copy

You will need `npm@7` and `yarn@1` in order to bootstrap and test a local copy of this repo.

1. Clone the repo with `git clone https://github.com/Threekit/treble`

2. Run `npm install` in the root folder.

Once it is done, you can modify any file locally and run `npm start`, `npm test` or `npm run build` like you can in a generated project. It will serve the application from the files located in `packages/cra-template/template`.

If you want to try out the end-to-end flow with the global CLI, you can do this too:

```sh
npx create-treble-app my-app
cd my-app
```

and then run `npm start` or `npm run build`.

## Cutting a Release

1. Tag all merged pull requests that go into the release with the relevant milestone. Each merged PR should also be labeled with one of the [labels](https://github.com/facebook/create-react-app/labels) named `tag: ...` to indicate what kind of change it is. **Make sure all breaking changes are correctly labelled with `tag: breaking change`.**
2. Close the milestone and create a new one for the next release.
3. In most releases, only `react-scripts` needs to be released. If you don’t have any changes to the `packages/create-react-app` folder, you don’t need to bump its version or publish it (the publish script will publish only changed packages).
4. Note that files in `packages/create-react-app` should be modified with extreme caution. Since it’s a global CLI, any version of `create-react-app` (global CLI) including very old ones should work with the latest version of `react-scripts`.
5. Pull the latest changes from GitHub, run `npm ci`.
6. Create a change log entry for the release:

- You'll need an [access token for the GitHub API](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). Save it to this environment variable: `export GITHUB_AUTH="..."`
- Run `npm run changelog`. The command will find all the labeled pull requests merged since the last release and group them by the label and affected packages, and create a change log entry with all the changes and links to PRs and their authors. Copy and paste it to `CHANGELOG.md`.
- Add a four-space indented paragraph after each non-trivial list item, explaining what changed and why. For each breaking change also write who it affects and instructions for migrating existing code.
- Maybe add some newlines here and there. Preview the result on GitHub to get a feel for it. Changelog generator output is a bit too terse for my taste, so try to make it visually pleasing and well grouped.

7. Make sure to include “Migrating from ...” instructions for the previous release. Often you can copy and paste them.
8. Run `npm run publish`. (It has to be `npm run publish` exactly, not `npm publish` or `yarn publish`.)
9. Wait for a long time, and it will get published. Don’t worry that it’s stuck. In the end the publish script will prompt for versions before publishing the packages.
10. After publishing, create a GitHub Release with the same text as the changelog entry. See previous Releases for inspiration.

Make sure to test the released version! If you want to be extra careful, you can publish a prerelease by running `npm run publish -- --canary --exact --preid next --dist-tag=next --force-publish=* minor` instead of `npm run publish`.

## Releasing the Docs

Coming soon!
