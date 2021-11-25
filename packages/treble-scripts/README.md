# Treble Scripts

**Scripts to support development of your Threekit Treble Web-App**

## Getting Started

### Installation

Run the following command using npm:

`npm install @threekit-tools/treble-scripts`

Or yarn:

`yarn add @threekit-tools/treble-scripts`

## Scripts

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

```bash
yarn build --preview
```
