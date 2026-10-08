---
trigger: always_on
---

# Git Commit Message Style

## Conventional Commits

Use the Conventional Commits specification for all commit messages.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples

```
feat: add new authentication module
```

```
fix: resolve null pointer exception in user service
```

```
docs: update API documentation for user endpoints
```

```
style: format code according to project standards
```

```
refactor: extract payment processing logic to separate service
```

```
perf: optimize database queries for user list endpoint
```

```
test: add unit tests for authentication service
```

```
build: update webpack configuration for production build
```

```
ci: configure automated testing pipeline
```

```
chore: update dependencies to latest versions
```

```
revert: revert previous commit that introduced bug
```

## Commit Message Guidelines

1. Use the present tense ("Add feature" not "Added feature")
2. Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
3. Limit the first line to 72 characters or less
4. Reference issues and pull requests liberally after the first line
5. When only changing documentation, include `[ci skip]` in the commit title
6. Keep commits focused and atomic
7. Write clear, descriptive commit messages that explain the "why" not just the "what"
