/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "quin-portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: input?.stage === "production",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    // Reference the existing S3 bucket created by Terraform
    const portfolioBucket = aws.s3.BucketV2.get(
      "PortfolioBucket",
      "quin-portfolio-data-dev"
    );

    // Reference the existing DynamoDB table for rate limiting
    const rateLimitTable = aws.dynamodb.Table.get(
      "RateLimitTable",
      "quin-portfolio-rate-limit-dev"
    );

    // Deploy the Next.js app
    const site = new sst.aws.Nextjs("QuinPortfolio", {
      server: {
        memory: "1024 MB",
      },
      environment: {
        // S3 bucket for portfolio data
        PORTFOLIO_BUCKET: portfolioBucket.bucket,
        // Rate limiting table
        RATE_LIMIT_TABLE: rateLimitTable.name,
        // API keys from environment (set in CI/CD from GitHub secrets)
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
        NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
        NEXT_PUBLIC_POSTHOG_HOST: "https://app.posthog.com",
      },
      permissions: [
        {
          actions: ["s3:GetObject"],
          resources: [$interpolate`${portfolioBucket.arn}/*`],
        },
        {
          actions: ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:UpdateItem"],
          resources: [rateLimitTable.arn],
        },
      ],
    });

    return {
      url: site.url,
    };
  },
});
