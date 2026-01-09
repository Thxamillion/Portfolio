# DynamoDB table for rate limiting
resource "aws_dynamodb_table" "rate_limit" {
  name         = "${var.project_name}-rate-limit-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled        = true
  }

  tags = {
    Name = "Rate Limit Table"
  }
}
