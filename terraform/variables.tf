variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "quin-portfolio"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "openai_api_key" {
  description = "OpenAI API key"
  type        = string
  sensitive   = true
}

variable "posthog_api_key" {
  description = "PostHog API key (optional)"
  type        = string
  sensitive   = true
  default     = ""
}

variable "domain_name" {
  description = "Domain name for the portfolio (e.g., quinortiz.com)"
  type        = string
  default     = "quinortiz.com"
}

variable "github_repo" {
  description = "GitHub repository in format owner/repo"
  type        = string
  default     = "Thxamillion/Portfolio"
}
