# Frequently Asked Questions

This FAQ covers common questions about PromptBasic IDE. For detailed guides, see the [Tutorial](tutorial.md) and [Getting Started](getting-started.md).

## General Questions

### What is PromptBasic IDE?

PromptBasic IDE is a modern web-based development environment that combines visual programming with AI-powered natural language interfaces. Inspired by Visual Basic 3, it allows you to create interactive user interfaces using drag-and-drop design while writing event handlers in plain English instead of code.

### How does it differ from traditional programming?

Instead of writing JavaScript or other programming languages, you describe what you want your application to do in natural language. For example:
- Traditional: `document.getElementById('button').addEventListener('click', () => alert('Hello!'));`
- PromptBasic: "When the button is clicked, show a message saying 'Hello!'"

### Is it suitable for beginners?

Yes! PromptBasic IDE is designed to make programming accessible to people without coding experience. The visual interface and natural language approach lower the barrier to entry significantly.

### Can experienced developers use it?

Absolutely. Many developers use PromptBasic for rapid prototyping, UI mockups, and exploring new interaction patterns. It's also useful for quickly testing ideas before implementing them in traditional code.

## Technical Questions

### What technologies does it use?

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **AI**: Anthropic Claude API
- **UI**: Custom Visual Basic-inspired components

### Do I need programming experience?

No programming experience is required. However, understanding basic UI concepts (buttons, forms, events) will help you get started faster.

### What browsers are supported?

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Is it free to use?

The PromptBasic IDE software is free and open source. However, it requires an Anthropic API key, which incurs costs based on usage. See Anthropic's pricing for details.

## Setup and Installation

### How do I get started?

1. Clone the repository: `git clone https://github.com/tholewis/promptbasic-ide.git`
2. Install dependencies: `npm install`
3. Get an Anthropic API key from https://console.anthropic.com/
4. Create a `.env` file with `ANTHROPIC_API_KEY=your-key-here`
5. Run: `npm run dev`

### I don't have an Anthropic API key. What can I do?

You'll need to sign up for Anthropic's API access. They offer a free tier for experimentation. Visit https://console.anthropic.com/ to get started.

### The installation fails. What should I do?

Common solutions:
- Clear npm cache: `npm cache clean --force`
- Update Node.js to version 16 or higher
- Try using Yarn instead: `yarn install`
- Check your internet connection

See the [Troubleshooting](troubleshooting.md) guide for detailed solutions.

### Can I run it offline?

Currently, no. The application requires internet access to communicate with Anthropic's AI service. Offline support is planned for future versions.

## Using PromptBasic IDE

### How do I create my first application?

Follow the step-by-step [Tutorial](tutorial.md). It guides you through building a personal information form with validation and dynamic displays.

### What controls are available?

- Button (for clicks and actions)
- TextBox (for text input)
- Label (for displaying text)
- CheckBox (for boolean choices)
- RadioButton (for grouped selections)
- ComboBox (for dropdown lists)
- ListBox (for multi-selection lists)
- PictureBox (for images)
- Timer (for time-based events)

### How do I write effective prompts?

Be specific and clear:
- ✅ "When btnSave is clicked, save the text from txtName to localStorage"
- ❌ "Do something when clicked"

Include control names and be descriptive about what should happen.

### Why doesn't my prompt work as expected?

The AI might misinterpret ambiguous prompts. Try:
- Being more specific about controls and actions
- Breaking complex logic into simpler steps
- Using examples from the tutorial
- Testing with simpler prompts first

### Can I use multiple prompts for one control?

Yes! Controls can have multiple event handlers. For example, a button can have both Click and MouseOver events with different prompts.

### How do I debug my application?

- Check the browser console for JavaScript errors
- Use browser developer tools to inspect elements
- Test prompts individually
- Look at the generated code in the network tab

## AI and Code Generation

### How accurate is the AI code generation?

The AI (Claude) is quite capable, but it's not perfect. Complex logic might need refinement. Always test your applications thoroughly.

### Can I see the generated code?

Yes! The AI-generated JavaScript is executed in your browser. You can inspect it using browser developer tools.

### What happens if the AI generates bad code?

The application includes error handling to prevent crashes. If code fails, check the console and refine your prompts.

### Can I modify the generated code?

Currently, you work with prompts rather than direct code editing. Future versions may allow code customization.

### Are there limits to what I can build?

While you can build complex applications, extremely sophisticated logic might be better handled with traditional programming. PromptBasic excels at UI interactions and business logic.

## Performance and Limitations

### Why is it slow sometimes?

AI API calls can take 1-3 seconds. Complex prompts take longer. Optimize by:
- Using shorter, clearer prompts
- Breaking complex logic into steps
- Reducing the number of controls

### What's the maximum application size?

There's no hard limit, but performance degrades with too many controls or complex prompts. Consider breaking large applications into smaller components.

### Can I save my work?

Currently, work is saved in browser local storage. Export your project files for backup. Cloud saving is planned for future versions.

### Is my data secure?

Prompts and generated code are processed locally in your browser. Only API calls to Anthropic include your prompts. No personal data is stored on external servers.

## Costs and Usage

### How much does it cost?

The software is free, but Anthropic API usage costs money. Pricing depends on model and usage volume. Check Anthropic's pricing page for current rates.

### What's included in the free tier?

Anthropic offers a limited free tier for testing. After that, you'll need a paid plan for continued use.

### How can I reduce API costs?

- Write concise prompts
- Test with simple examples first
- Cache results when possible
- Use the free tier judiciously

## Development and Contributing

### Can I contribute to the project?

Yes! See the [Contributing](contributing.md) guide. We welcome bug reports, feature requests, and code contributions.

### What's the technology stack?

- Frontend: React 18, Vite
- Backend: Node.js, Express
- AI: Anthropic Claude API
- Testing: Jest, Playwright
- Deployment: Various options supported

### How do I report bugs?

Create an issue on GitHub with:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Can I request new features?

Absolutely! Open a feature request issue on GitHub. Include:
- Use case description
- Why it's needed
- How it would work

## Future Plans

### What's coming next?

Planned features include:
- Offline AI model support
- Multi-user collaboration
- Plugin system for custom controls
- Export to traditional code formats
- Mobile application support
- Integration with popular frameworks

### How can I stay updated?

- Watch the GitHub repository
- Follow releases and changelog
- Join GitHub Discussions for announcements

## Legal and Ethical

### Is this legal?

Yes, PromptBasic IDE is open source and complies with Anthropic's terms of service. Always use the AI responsibly and ethically.

### Can I use it commercially?

Yes, for both personal and commercial projects. Check Anthropic's terms for API usage restrictions.

### Are there any restrictions?

- Comply with Anthropic's acceptable use policy
- Don't use for harmful or illegal purposes
- Respect API rate limits and costs

## Getting Help

### Where can I find more help?

- [Tutorial](tutorial.md) - Step-by-step guide
- [Troubleshooting](troubleshooting.md) - Common issues and solutions
- [API Reference](api.md) - Technical details
- GitHub Issues - Bug reports and questions
- GitHub Discussions - Community support

### I still need help. What now?

1. Check existing GitHub issues
2. Search the documentation
3. Create a new issue with detailed information
4. Join the community discussion

We're here to help you succeed with PromptBasic IDE!