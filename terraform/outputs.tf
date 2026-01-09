output "portfolio_data_bucket_name" {
  description = "S3 bucket name for portfolio data"
  value       = aws_s3_bucket.portfolio_data.bucket
}

output "portfolio_data_bucket_arn" {
  description = "S3 bucket ARN for portfolio data"
  value       = aws_s3_bucket.portfolio_data.arn
}

output "rate_limit_table_name" {
  description = "DynamoDB table name for rate limiting"
  value       = aws_dynamodb_table.rate_limit.name
}

output "rate_limit_table_arn" {
  description = "DynamoDB table ARN for rate limiting"
  value       = aws_dynamodb_table.rate_limit.arn
}

output "openai_secret_arn" {
  description = "Secrets Manager ARN for OpenAI API key"
  value       = aws_secretsmanager_secret.openai_api_key.arn
}

output "lambda_policy_arn" {
  description = "IAM policy ARN for Lambda"
  value       = aws_iam_policy.lambda_policy.arn
}
