## Deploy to the staging server

1. Run the command `npm run build` or `yarn build` on the root directory.
2. Go to the S3 bucket which name is 'staging-web-site' on the AWS console.
3. Delete all files on there and upload all files on the build directory.
4. Go to CloudFront on AWS console.
5. Go to distribution which ID is 'EJ9YGFZZ2X6MX' on CloudFront
6. Select one invalidation and Copy to new from this. (Or you can create new invalidation if you want.)
