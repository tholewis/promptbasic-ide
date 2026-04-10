---
title: Troubleshooting
description: Comprehensive guide to diagnosing and resolving common issues with setup, API, runtime, performance, development, and build
category: Support
version: 1.0.0
last_updated: 2026-04-10
autor: Troubleshooting
audience: all
related_pages: [faq.md, getting-started.md]
tags: [troubleshooting, support, error-resolution, debugging, performance-issues]
---

# Troubleshooting

This guide helps you resolve common issues with PromptBasic IDE. If you can't find a solution here, check the [FAQ](faq.md) or create an issue on GitHub.

## Setup and Installation Issues

### "npm install" fails

**Symptoms:**
- Installation hangs or fails
- Permission errors
- Network timeouts

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

2. **Use different registry:**
   ```bash
   npm config set registry https://registry.npmjs.org/
   npm install
   ```

3. **Check Node.js version:**
   ```bash
   node --version  # Should be 16+
   npm --version   # Should be 8+
   ```

4. **Permission issues on macOS/Linux:**
   ```bash
   sudo chown -R $(whoami) ~/.npm
   npm install
   ```

5. **Use Yarn as alternative:**
   ```bash
   npm install -g yarn
   yarn install
   ```

### Application won't start

**Symptoms:**
- `npm run dev` fails
- Port already in use
- Missing dependencies

**Solutions:**

1. **Check port availability:**
   ```bash
   lsof -i :3000  # Check if port 3000 is in use
   lsof -i :3001  # Check if port 3001 is in use
   ```

2. **Kill process using port:**
   ```bash
   kill -9 <PID>  # Replace <PID> with actual process ID
   ```

3. **Use different port:**
   ```bash
   npm run dev -- --port 3002
   ```

4. **Check environment variables:**
   ```bash
   echo $ANTHROPIC_API_KEY  # Should not be empty
   ```

## API and Authentication Issues

### "ANTHROPIC_API_KEY is required"

**Symptoms:**
- Application starts but prompts don't work
- Console shows API key error
- Backend server logs show authentication failure

**Solutions:**

1. **Create `.env` file:**
   ```bash
   touch .env
   echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
   ```

2. **Get API key from Anthropic:**
   - Visit https://console.anthropic.com/
   - Create account if needed
   - Generate new API key
   - Copy the full key (starts with `sk-ant-`)

3. **Restart the server:**
   ```bash
   # Stop with Ctrl+C, then restart
   npm run dev
   ```

4. **Check key format:**
   - Should start with `sk-ant-`
   - No extra spaces or characters
   - Full key, not truncated

### "Invalid API key" or "Authentication failed"

**Symptoms:**
- API calls return 401 errors
- Console shows auth errors

**Solutions:**

1. **Verify key is correct:**
   - Check Anthropic console for active keys
   - Regenerate if compromised
   - Ensure no typos

2. **Check key permissions:**
   - API key must have access to Claude API
   - Check account has credits

3. **Environment variable issues:**
   ```bash
   # On macOS/Linux
   export ANTHROPIC_API_KEY=sk-ant-your-key-here

   # On Windows
   set ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

### Rate limiting errors

**Symptoms:**
- HTTP 429 errors
- "Too many requests" messages
- Intermittent failures

**Solutions:**

1. **Reduce request frequency:**
   - Add delays between prompts
   - Implement exponential backoff

2. **Check usage limits:**
   - Visit Anthropic console for usage stats
   - Upgrade plan if needed

3. **Implement retry logic:**
   ```javascript
   // Example retry function
   async function retryWithBackoff(fn, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await fn();
       } catch (error) {
         if (error.response?.status === 429) {
           const delay = Math.pow(2, i) * 1000; // Exponential backoff
           await new Promise(resolve => setTimeout(resolve, delay));
           continue;
         }
         throw error;
       }
     }
   }
   ```

## Application Runtime Issues

### Prompts don't work or generate wrong code

**Symptoms:**
- Clicking Run does nothing
- Generated code doesn't match expectations
- JavaScript errors in console

**Solutions:**

1. **Check prompt clarity:**
   - Be specific about controls and actions
   - Use exact control names
   - Break complex logic into steps

2. **Example improvements:**
   ```javascript
   // Bad
   "Make the button do something"

   // Good
   "When btnSubmit is clicked, change lblStatus text to 'Processing...'"
   ```

3. **Check control references:**
   - Ensure control IDs match exactly
   - Verify controls exist on the form
   - Check for typos in names

4. **Debug generated code:**
   - Open browser Developer Tools (F12)
   - Check Console tab for errors
   - Examine generated JavaScript

### UI controls not responding

**Symptoms:**
- Controls don't react to clicks
- Visual feedback missing
- Event handlers not firing

**Solutions:**

1. **Verify control setup:**
   - Check control is properly positioned
   - Ensure control has valid properties
   - Confirm control is enabled

2. **Check event handler attachment:**
   - Verify prompts are saved
   - Ensure Run button was clicked
   - Check for JavaScript errors

3. **Browser compatibility:**
   - Test in different browsers
   - Ensure modern browser (Chrome 90+, Firefox 88+, Safari 14+)
   - Disable browser extensions that might interfere

### Layout and design issues

**Symptoms:**
- Controls overlap or misalign
- Canvas doesn't respond to drag/drop
- Visual glitches

**Solutions:**

1. **Refresh the application:**
   - Hard refresh with Ctrl+F5 (or Cmd+Shift+R on Mac)
   - Clear browser cache

2. **Check canvas size:**
   - Ensure browser window is large enough
   - Try resizing the window

3. **Control positioning:**
   - Use grid snap for alignment
   - Check z-index for overlapping controls
   - Verify control dimensions

## Performance Issues

### Application is slow

**Symptoms:**
- Long delays when running prompts
- UI becomes unresponsive
- High CPU/memory usage

**Solutions:**

1. **Reduce complexity:**
   - Simplify prompts
   - Remove unnecessary controls
   - Break large applications into smaller parts

2. **Optimize prompts:**
   ```javascript
   // Instead of complex prompts, use multiple simple ones
   "Validate email format"
   "If valid, show success message"
   "If invalid, show error message"
   ```

3. **Browser performance:**
   - Close other browser tabs
   - Update to latest browser version
   - Check for memory leaks in DevTools

### AI responses are slow

**Symptoms:**
- Long wait times for code generation
- Timeouts on API calls

**Solutions:**

1. **Check internet connection:**
   - Stable broadband recommended
   - Avoid public WiFi with restrictions

2. **API service status:**
   - Check Anthropic status page
   - Try again during off-peak hours

3. **Optimize prompt length:**
   - Shorter prompts = faster responses
   - Remove unnecessary context

## Development and Build Issues

### Build fails

**Symptoms:**
- `npm run build` errors
- Production bundle issues

**Solutions:**

1. **Clean build:**
   ```bash
   rm -rf dist node_modules/.vite
   npm install
   npm run build
   ```

2. **Check dependencies:**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Environment variables:**
   - Ensure production env vars are set
   - Check build configuration

### Git and version control issues

**Symptoms:**
- Git commands fail
- Merge conflicts
- File permission issues

**Solutions:**

1. **Check git status:**
   ```bash
   git status
   git diff
   ```

2. **Resolve conflicts:**
   ```bash
   git add <resolved-file>
   git commit
   ```

3. **Permission issues:**
   ```bash
   # On Windows
   git config core.filemode false

   # On macOS/Linux
   chmod 644 <file>
   ```

## Advanced Troubleshooting

### Enable debug logging

Add to your `.env` file:
```
DEBUG=promptbasic:*
NODE_ENV=development
```

### Browser developer tools

1. **Open DevTools:** Press F12 or right-click > Inspect
2. **Check Console:** Look for JavaScript errors
3. **Network tab:** Monitor API requests
4. **Application tab:** Check local storage and session data

### Server logs

Run with verbose logging:
```bash
DEBUG=* npm run dev
```

### Test API directly

```bash
curl -X POST http://localhost:3001/api/health
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

## Getting Help

If these solutions don't work:

1. **Gather information:**
   - Browser and OS version
   - Node.js and npm versions
   - Full error messages
   - Steps to reproduce

2. **Check existing issues:**
   - Search GitHub issues
   - Look for similar problems

3. **Create new issue:**
   - Use the bug report template
   - Include all relevant information
   - Attach screenshots if applicable

4. **Community support:**
   - Join GitHub Discussions
   - Ask in relevant forums

## Prevention Tips

- Keep dependencies updated: `npm update`
- Use version control for all changes
- Test in multiple browsers
- Monitor API usage and costs
- Backup your work regularly
- Document custom modifications