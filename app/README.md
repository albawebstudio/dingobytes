# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Assets

### Color Scheme

[Neon Silver Sky](https://coolors.co/palette/ff6600-ebebeb-c0c0c0-3a88d1-004e98)

| Color Name    | Preview                                                                   |
|---------------|---------------------------------------------------------------------------|
| Blaze Orange  | ![#ff6600](https://img.shields.io/badge/-ff6600-ff6600?style=flat-square) |
| Platinum      | ![#ebebeb](https://img.shields.io/badge/-ebebeb-ebebeb?style=flat-square) |
| Silver        | ![#c0c0c0](https://img.shields.io/badge/-c0c0c0-c0c0c0?style=flat-square) |
| Bright Ocean  | ![#3a88d1](https://img.shields.io/badge/-3a88d1-3a88d1?style=flat-square) |
| Steel Azure   | ![#004e98](https://img.shields.io/badge/-004e98-004e98?style=flat-square) |

### Photos

- Photo by [Douglas Lopes](https://unsplash.com/@douglasamarelo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-computer-desk-with-two-monitors-and-a-mouse-OQT9s7fHeO0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Photo by [Safar Safarov](https://unsplash.com/@safarslife?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/black-flat-screen-computer-monitor-turned-on-displaying-website-koOdUvfGr4c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Photo by [Cash Macanaya](https://unsplash.com/@cashmacanaya?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/three-televisions-sitting-on-top-of-a-pile-of-grass-KSP1RSNuSGQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Photo by [Melike B](https://www.pexels.com/photo/white-envelope-on-the-table-11761394/)

## Fetch ENV vars

```shell
aws ssm get-parameter --region us-east-1 \
	--name /dingobytes/app/.env.<envrironment> \
	--profile default \
	--query Parameter.Value \
	--with-decryption \
	--output text > ./.env.<envrironment>
```

If you need to make changes to the file, be sure to push the changes back to AWS. You can modify this command to push a
new revision to AWS SSM.

```shell
aws ssm put-parameter \
    --region us-east-1 \
    --name /dingobytes/app/.env.<enviornment> \
    --profile default \
    --value file://.env.<enviornment> \
--type "SecureString" \
--overwrite
```
