---
slug: treble-main-concepts-credentials
title: Threekit Credentials
category: 6261727455090d002780b880
parentDoc: 62b4ff1de2c89700a801c530
---

## Overview

All Threekit front-end implementations, Treble included, require the correct Threekit credentials to connect the API to your org on the Threekit Platform and authenticate/authorize your request.

These credentials include:

- `orgId` - The unique ID for your org on the Threekit Platform
- `publicToken` - A public token created in your Threekit org matching the domain where the Threekit API is to be used.

## Getting your credentials

> 📘 Public Token for Treble Launchpad
>
> By default, Treble will run run its development server locally on `localhost:3000`. If you project will be using Treble Launchpad, it will also require a token for `*.3kit.com`.

To get your credentials, both the orgId and publicToken, head over to the relevant org on the Threekit Platform and follow these instructions:

1. Click on **Settings** in the sidebar menu on the left.
2. In the **Profile** view of your settings, the second field should be for `Organization ID`. This is the **orgId**
3. Then select **Tokens**, in the sidebar menu, located under settings.
4. Click the **Add Token** button
5. Create a new token which includes the domain `localhost` for local development.
6. The newly created token will be your **public token**.
