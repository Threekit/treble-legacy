## Commitizen:

We use [commitizen](https://github.com/commitizen/cz-cli) to enforce conventional commits. This is necessary for publishing to function correctly. Instead of using `git commit`, use `git cz` instead. You will go a few prompts to fill in different parts of your commit. You can commit normally, however this these will not get picked up by the publishing CI.

I recommend getting in the habit of always using `git cz` for commits in this repo.

## Testing

The Github action for testing will very simply run the `test` script in any workspaces in this lerna monorepo. An example for jest tests can be seen in the `treble-scripts` package. If you want to replicate these changes to other packages I recommend looking through [this PR](https://github.com/Threekit/treble/pull/2) to see what I added to set up Jest.

## Linting

This repo uses ESLint for linting purposes, and Prettier for formatting purposes. The CI will validate that both of these are correct, but it **will not** fix them for you; the onice is on the developers to ensure their branches are linted and formatted correctly.

## Publishing

This repo publishes through lerna, using conventional commits. Commitizen is used for commits, and lerna will parse these commits correctly when versioning packages.

Publishing happens in two steps: First there is versioning, then there is publishing of the new version if applicable.

The github action will only version main, but will always try to publish. As a developer this means you have the freedom to make a prerelease version for your branch which will get published, but prerelease versions won't make themselves.

To make your own version, run this command:

        lerna version --conventional-commits --no-changelog --no-private --conventional-prerelease --preid <PRERELEASE_NAME>

Explanation of flags:

    --conventional-commits      use conventional commit convention to determine the appropriate versions
    --no-changelog              don't generate a changelog from the new changes
    --no-private                prevents versioning packages with 'private: true' in their package.json. Necessary to avoid publishing the demo package and docs package.
    --conventional-prerelease   make a 'prerelease' version. These will look like 1.0.3-my-prerelease.0. Must be done with `preid` flag
    --preid <PRERELEASE>        used to specify the prerelease version
    --yes                       (optional) skip the interactive prompt that this command normally uses
    --no-push                   (optional) prevents automatically pushing of the new version tags in case you want to verify locally first

This command will tag the current HEAD with the versions for all packages that need to be updated. This is consumed by `lerna publish --from-git` to publish the new version. Note: this command will push git tags automatically unless `--no-push` is supplied.

## Development Workflow

Everyone should avoid making commits to `main` directly. All work items should be done on separate branches, and a github issue should exist outlining the work. This is useful to properly track work, as well as provide a location for discussion which is properly archived.
