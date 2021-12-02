---
id: threekit-credentials
title: Threekit Credentials
sidebar_label: Threekit Credentials
---

# Threekit Credentials

## Overview

All Threekit front-end implementations, Treble included, require the correct Threekit credentials to connect the API to your org on the Threekit Platform and authenticate/authorize your request.

These credentials include:

- `orgId` - The unique ID for your org on the Threekit Platform
- `publicToken` - A public token created in your Threekit org matching the domain where the Threekit API is to be used.

:::info public token

By default, a project bootstrapped using `create-treble-app` will run run its development server locally on `localhost:3000`. For this you will need a public token which includes the domain `localhost`. Specifying the port is not required.

:::
