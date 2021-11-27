terraform {
  required_providers {
    github = {
      source = "integrations/github"
      version = "4.18.0"
    }
  }
}

provider github {
  token = var.github_token
  owner = var.github_owner
}

resource github_actions_secret "secret_slack_webhook_url" {
  repository = var.github_repository
  secret_name = "SLACK_WEBHOOK_URL"
  plaintext_value = var.slack_webhook_url
}
