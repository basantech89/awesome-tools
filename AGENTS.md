<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->

# Project-specific Guidelines

- This repository is a monorepo managed with `Nx` and `Bun` as the package manager, containing multiple tools and packages.

- Each workspace specified with `workspaces` key in `package.json` is a git submodule pointing to its own repository.

- This repository uses Biome as the linter. When providing linting commands or configurations, ensure they are compatible with Biome.

- Commit messages should follow the Conventional Commits specification. Use the Commitizen tool configured in the repository to assist with creating properly formatted commit messages.
