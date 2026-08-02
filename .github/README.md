# GitHub configuration

This folder holds GitHub Actions workflows and repository automation for **EduManager Pro**.

## Planned workflows

| Workflow | Purpose |
|----------|---------|
| `ci.yml` | Lint, type-check, and test on pull requests |
| `cd.yml` | Build and deploy on merge to `main` |
| `security.yml` | Dependency audit and secret scanning |

Workflow files will live under [`.github/workflows/`](./workflows/).

For product setup and documentation, see the root [README.md](../README.md) and the [`docs/`](../docs/) directory.
