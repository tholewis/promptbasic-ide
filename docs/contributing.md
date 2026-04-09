# Contributing to PromptBasic IDE

Thank you for your interest in contributing to PromptBasic IDE! This document provides guidelines and information for contributors.

## Ways to Contribute

### Code Contributions
- Bug fixes
- New features
- Performance improvements
- Code refactoring

### Non-Code Contributions
- Documentation improvements
- Bug reports
- Feature requests
- Testing
- Design feedback
- Community support

### Documentation
- Tutorial creation
- FAQ updates
- API documentation
- Troubleshooting guides

## Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/promptbasic-ide.git
   cd promptbasic-ide
   ```
3. **Set up upstream remote:**
   ```bash
   git remote add upstream https://github.com/tholewis/promptbasic-ide.git
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Choose an Issue
- Check existing [issues](https://github.com/tholewis/promptbasic-ide/issues) on GitHub
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Branch
```bash
git checkout -b feature/issue-number-description
# or
git checkout -b bugfix/issue-number-description
```

### 3. Make Changes
- Write clear, concise commit messages
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Test Your Changes
```bash
# Run the development server
npm run dev

# Run tests (when available)
npm test

# Build for production
npm run build
```

### 5. Commit and Push
```bash
git add .
git commit -m "feat: add new control type - slider"
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill out the pull request template
- Reference any related issues

## Coding Standards

### JavaScript/React
- Use modern ES6+ syntax
- Follow React best practices
- Use functional components with hooks
- Consistent naming conventions (camelCase for variables, PascalCase for components)
- Add JSDoc comments for complex functions

### Example Component Structure
```javascript
import React, { useState } from 'react';

/**
 * A customizable button control for the IDE
 * @param {Object} props - Component properties
 * @param {string} props.text - Button text
 * @param {Function} props.onClick - Click handler
 */
const ButtonControl = ({ text, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <button
      className={`button-control ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ButtonControl;
```

### Commit Message Format
Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

Examples:
```
feat: add slider control component
fix: resolve button click event handling
docs: update API reference for new endpoints
```

## Testing

### Unit Tests
- Write tests for utility functions
- Test component rendering and interactions
- Mock external dependencies (API calls)

### Integration Tests
- Test complete user workflows
- Verify API integration
- Check error handling

### Manual Testing
- Test in multiple browsers
- Verify responsive design
- Check accessibility

## Documentation

### Code Documentation
- Add JSDoc comments to functions and components
- Document complex algorithms
- Explain non-obvious code decisions

### User Documentation
- Update docs for new features
- Add examples and tutorials
- Keep screenshots current

## Pull Request Process

### Before Submitting
- [ ] Code follows the style guide
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

### PR Template
Please fill out the pull request template with:
- Description of changes
- Related issues
- Testing instructions
- Screenshots (if UI changes)
- Breaking changes (if any)

### Review Process
1. Automated checks run (linting, tests)
2. Code review by maintainers
3. Requested changes addressed
4. Approval and merge

## Issue Reporting

### Bug Reports
When reporting bugs, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information
- Screenshots or videos
- Console errors

### Feature Requests
For new features, provide:
- Use case description
- Why it's needed
- How it should work
- Mockups or examples (if applicable)

## Community Guidelines

### Be Respectful
- Treat all contributors with respect
- Constructive criticism only
- Help newcomers learn

### Communication
- Use clear, concise language
- Provide context for questions
- Be patient with responses

### Recognition
- Give credit where due
- Acknowledge contributions
- Celebrate successes

## Getting Help

### Resources
- [README.md](../README.md) - Project overview
- [Architecture](architecture.md) - Technical details
- [API Reference](api.md) - Backend documentation
- [Troubleshooting](troubleshooting.md) - Common issues

### Contact
- GitHub Issues: For bugs and features
- GitHub Discussions: For questions and ideas
- Email: For private matters

## Recognition

Contributors are recognized in:
- GitHub repository contributors list
- CHANGELOG.md for significant contributions
- Project documentation acknowledgments

Thank you for contributing to PromptBasic IDE! Your efforts help make programming more accessible to everyone.