# Treble Frontend

**Boilerplate for a project requiring Treble Frontend + Deployment**

## Getting Started

- Clone this repository to your local machine and navigate to the project root by running:
  ```bash
  git clone git@github.com:Threekit/%REPO_NAME%.git
  cd %REPO_NAME%
  ```
- Add the project credentials in the `.env.template` file. Rename the file to `.env`.
- Install the all the dependencies by running `yarn install`
- Start up the local development server by running `yarn start`.

## Deployments

- Production: [https://%PROJECT_NAME%.3kit.com](https://%PROJECT_NAME%.3kit.com)
- Development: [https://%PROJECT_NAME%.dev.3kit.com/dev](https://%PROJECT_NAME%.dev.3kit.com/dev)

Deployments are managed by Github actions tied to the repository and are triggered by a push event on the various branches.

Pushing to the `prod` branch will trigger the production deployment pipeline with the updated code. By default it will use the **admin-fts** environment on Threekit.

Pushing to the `dev` or `staging` branches will trigger the development deployment pipeline with the updated code. By default it will use the **preview** environment on Threekit. Since the dev deployment has many front-end instances deployed to the same hosted endpoint, we have to append the branch we wish to view to the end of the url. For example:

- `staging` branch: https://%PROJECT_NAME%.dev.3kit.com/staging
- `dev` branch: https://%PROJECT_NAME%.dev.3kit.com/dev

## Scripts

### Installation

To install the project dependencies we run:

```bash
yarn init
```

### Starting Local Development Server

To start the local development server we run

```bash
yarn start
```

By default this uses the **preview** environment on Threekit. We can also explicitly specify the environment we wish to use by adding it as a flag:

```bash
yarn start --admin-fts
```

### Building our React App

The build commands works similar to the start command. If defaults to **preview** but we can specify an override if we want.

**Note: The deployment build will be handled automatically by the Github Action.**

```bash
yarn build --preview
```

## Embedding your Threekit App

To embed the hosted App in any existing web-page or eCommerce setup we will need to add two things into the HTML content of that page. The set of HTML elements we want to embed out UI into and the script tag to request our React UI bundle.

**Set of HTML Elements**

Most often we embedding our App into a single HTML div, which only requires us to add that one div into the HTML page we plan to embed into. By default we expect this single div to have the id **`tk-treble-root`**, as specified in the `public/index.html` file and `src/index.js` file. However, this can be changed as per project needs.

```html
<div id="tk-treble-root"></div>
```

If our App is being embedded across multiple HTML containers, e.g. one for the player and another for the form, we add a div for each of them and ensure that the id given matches what our UI expects.

**Embed Script**

We add a script tag to request our built React app bundle from our production server. The bundle is located at `/threekit-embed.js`.

```html
<script src="https://%PROJECT_NAME%.3kit.com/threekit-embed.js"></script>
```

To embed one of our development environments we have to update the URL accordingly:

```html
<script src="https://%PROJECT_NAME%.dev.3kit.com/staging/threekit-embed.js"></script>
```

**Example - Embed Snippet**

```html
<body>
  <div id="threekit-player-container"></div>
  <div id="threekit-form-container"></div>
  <script src="https://%PROJECT_NAME%.3kit.com/threekit-embed.js"></script>
</body>
```

### Using the Treble Design System

For information on using Treble to build a web experience visit the [Treble React Github repository](https://github.com/Threekit/treble-react).
