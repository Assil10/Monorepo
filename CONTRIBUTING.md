# Contributing Guidelines

Thank you for your interest in contributing to our monorepo! This document provides guidelines and instructions for contributing.

## Git Workflow

We follow a feature branch workflow with the following branches:

- `main`: The production branch containing stable code
- `develop`: The development branch for integrating features
- Feature branches: Created from `develop` for new features

### Branch Naming Convention

Branches must be named using the following format:

```
XX-type/short-description
```

Where:

- `XX` are the developer's initials (e.g., AJ for Ahmed Jaziri)
- `type` is the type of change (feature, fix, hotfix, docs)
- `short-description` is a brief description of the changes (use hyphens for spaces)

Examples:

- `AJ-feature/user-authentication` (Ahmed Jaziri working on user authentication feature)
- `TS-fix/login-button` (Taylor Smith fixing the login button)
- `LM-docs/installation-guide` (Lisa Miller updating the installation guide)
- `RK-hotfix/security-vulnerability` (Robert Kim creating a security hotfix)

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>
```

Examples:

- `feat(api): add user authentication`
- `fix(mobile): resolve login crash on Android`
- `docs(readme): update installation instructions`

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or improving tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Pull Request Process

1. Create a feature branch from `develop`
2. Implement your changes
3. Ensure code lints without errors
4. Run tests manually before submitting your PR
5. Update documentation if necessary
6. Submit a pull request to the `develop` branch
7. Request code review from at least one team member
8. After approval, maintainers will merge your PR

## Development Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development environment with `npm run dev`

## Code Standards

- Follow the ESLint configuration
- Write tests for new features
- Keep components small and focused
- Use meaningful variable and function names

## Git Tips

- Keep commits small and focused on a single change
- Regularly pull changes from the upstream branch
- Squash commits before merging to keep history clean
- Use `git rebase` instead of `git merge` when appropriate
- Always create a pull request for changes, even if you're the only contributor
