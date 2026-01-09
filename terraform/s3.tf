# S3 bucket for portfolio data (portfolio.json + READMEs)
resource "aws_s3_bucket" "portfolio_data" {
  bucket = "${var.project_name}-data-${var.environment}"

  tags = {
    Name = "Portfolio Data"
  }
}

# Enable versioning for portfolio data
resource "aws_s3_bucket_versioning" "portfolio_data" {
  bucket = aws_s3_bucket.portfolio_data.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Block all public access
resource "aws_s3_bucket_public_access_block" "portfolio_data" {
  bucket = aws_s3_bucket.portfolio_data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "portfolio_data" {
  bucket = aws_s3_bucket.portfolio_data.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
