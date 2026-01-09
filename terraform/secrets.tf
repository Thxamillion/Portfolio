# Secrets Manager for OpenAI API key
resource "aws_secretsmanager_secret" "openai_api_key" {
  name                    = "${var.project_name}/openai-api-key-${var.environment}"
  description             = "OpenAI API key for portfolio chat"
  recovery_window_in_days = 7

  tags = {
    Name = "OpenAI API Key"
  }
}

resource "aws_secretsmanager_secret_version" "openai_api_key" {
  secret_id     = aws_secretsmanager_secret.openai_api_key.id
  secret_string = var.openai_api_key
}

# Optional: PostHog API key
resource "aws_secretsmanager_secret" "posthog_api_key" {
  count                   = var.posthog_api_key != "" ? 1 : 0
  name                    = "${var.project_name}/posthog-api-key-${var.environment}"
  description             = "PostHog API key for analytics"
  recovery_window_in_days = 7

  tags = {
    Name = "PostHog API Key"
  }
}

resource "aws_secretsmanager_secret_version" "posthog_api_key" {
  count         = var.posthog_api_key != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.posthog_api_key[0].id
  secret_string = var.posthog_api_key
}
