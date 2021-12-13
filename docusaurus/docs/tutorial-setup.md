---
id: tutorial-setup
title: Starting a new Treble Project
sidebar_label: '1. Project setup'
---

# Starting a new Treble project

:::info For projects with deployment

For projects that will require embedding into an existing webpages or hosting with Threekit, it is **strongly recommended** that you follow this guide for project setup.

:::

## Create Treble App

In your local Terminal CLI, get started with the `create-treble-app` command:

```bash
npx create-treble-app@latest
```

And follow along any setups with any prompts you are required to answer.

This will create a project boilerplate in the current directory with the project name you provided and install all the required dependencies.

Once the boilerplate has been setup we will **navigating into the project folder** with the follow commands:

```bash
cd ./app-name
```

## Credentials setup

In the `/.env` file, add in your Threekit Platform public token and Org ID for the relevant environments.

In the `/threekit.config.js` file, add in an assetId for the relevant environment

**For more information about the Threekit credentials and their setup, [click here](threekit-credentials).**

## Start the development server

With the project credentials setup its time to start your Treble app. Run the local development server with the command:

```bash
yarn start
```

Your app will be available on: `http://localhost:3000`

By default the App will try to use the preview environment of the Threekit Platform. To use another environment pass in the environment name as a flag into the run script. e.g. `yarn start --admin-fts`

**For more information about the available scripts, [click here](available-scripts).**
