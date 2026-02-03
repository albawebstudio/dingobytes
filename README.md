# DingoBytes

DingoBytes is a Nuxtjs/Vuejs based web application designed to be used as a personal and professional blog.

DingoBytes represents the first domain name that was purchased by Alba Web Studio LLC back in 2001.

## Assets

### Color Scheme

[Neon Silver Sky](https://coolors.co/palette/ff6600-ebebeb-c0c0c0-3a88d1-004e98)

- Blaze Orange [#ff6600]
- Platinum [#ebebeb]
- Silver [#c0c0c0]
- Bright Ocean [#3a88d1]
- Steel Azure [#004e98]

### Photos

- Photo by [Douglas Lopes](https://unsplash.com/@douglasamarelo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-computer-desk-with-two-monitors-and-a-mouse-OQT9s7fHeO0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Photo by [Safar Safarov](https://unsplash.com/@safarslife?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/black-flat-screen-computer-monitor-turned-on-displaying-website-koOdUvfGr4c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Photo by [Cash Macanaya](https://unsplash.com/@cashmacanaya?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/three-televisions-sitting-on-top-of-a-pile-of-grass-KSP1RSNuSGQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## Setup

Each folder should have its own README.md file with instruction for installing.

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