---
sidebar_position: 1
custom_edit_url:
sidebar_label: "Quick Start: New Project"
---

# Starting a new Treble project

:::info For projects with deployment

For projects that will require embedding into an existing webpages or hosting with Threekit, it is **strongly recommended** that you follow this guide for project setup.

:::

## Create Treble App

Run the following command, replacing the `app-name` with your project's name:

```bash
npx create-treble-app app-name
```

And follow along any setups with any prompts you are required to answer.

This will create a project boilerplate in the current directory with the project name you provided.

Once the boilerplate has been setup we will **navigating into the project folder** and **install all the project's dependencies** with the follow commands:

```bash
cd ./app-name
yarn install
```

## Setup Threekit credentials

Rename the `.env.template` file to `.env` and populate all the credentials.

**For more information about the Threekit credentials and their setup, [click here](threekit-config.md).**

## Start the development server

With the environment variables and Threekit credentials setup its time to start our Treble app. Run the local development server with the command:

```bash
yarn start
```

Your app will be available on: `http://localhost:3000`

By default the App will try to use the preview environment of the Threekit Platform. To use another environment pass in the environment name as a flag into the run script. e.g. `yarn start --admin-fts`

**For more information about the available scripts, [click here](available-scripts.md).**
