# IAM policy document for Lambda
data "aws_iam_policy_document" "lambda_policy" {
  # DynamoDB access for rate limiting
  statement {
    sid    = "DynamoDBAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ]
    resources = [
      aws_dynamodb_table.rate_limit.arn,
    ]
  }

  # Secrets Manager access for API keys
  statement {
    sid    = "SecretsManagerAccess"
    effect = "Allow"
    actions = [
      "secretsmanager:GetSecretValue",
    ]
    resources = [
      aws_secretsmanager_secret.openai_api_key.arn,
    ]
  }

  # S3 access for portfolio data
  statement {
    sid    = "S3PortfolioDataAccess"
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]
    resources = [
      aws_s3_bucket.portfolio_data.arn,
      "${aws_s3_bucket.portfolio_data.arn}/*",
    ]
  }

  # CloudWatch Logs
  statement {
    sid    = "CloudWatchLogs"
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = ["arn:aws:logs:*:*:*"]
  }
}

# Create the IAM policy
resource "aws_iam_policy" "lambda_policy" {
  name        = "${var.project_name}-lambda-policy-${var.environment}"
  description = "IAM policy for portfolio Lambda function"
  policy      = data.aws_iam_policy_document.lambda_policy.json

  tags = {
    Name = "Lambda Policy"
  }
}
