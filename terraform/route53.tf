# Route 53 Hosted Zone for the domain
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = {
    Name = "${var.project_name}-zone"
  }
}

# Output the nameservers - you'll need to update these at Porkbun
output "nameservers" {
  description = "Nameservers to configure at your domain registrar (Porkbun)"
  value       = aws_route53_zone.main.name_servers
}

output "hosted_zone_id" {
  description = "Route 53 Hosted Zone ID"
  value       = aws_route53_zone.main.zone_id
}
