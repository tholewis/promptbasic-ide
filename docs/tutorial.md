---
title: Tutorial - Building Your First Application
description: Step-by-step guide to building a personal information form application with validation and dynamic displays
category: Learning
version: 1.0.0
last_updated: 2026-04-10
audience: beginner, learner
time_estimate: 30-45 minutes
prerequisites: [PromptBasic IDE running, basic UI concepts]
tags: [tutorial, hands-on, practical, forms, validation, events]
---

# Tutorial: Building Your First PromptBasic Application

This comprehensive tutorial will guide you through creating a simple but complete application using PromptBasic IDE. We'll build a "Personal Information Form" that collects user data and displays it dynamically.

## Tutorial Overview

By the end of this tutorial, you'll have created an application that:
- Collects user information through form inputs
- Displays the information dynamically
- Includes interactive buttons and feedback
- Demonstrates various UI controls and natural language programming

**Estimated Time**: 30-45 minutes

## Prerequisites

- Completed the [Getting Started](getting-started.md) guide
- PromptBasic IDE running at http://localhost:3000
- Basic understanding of UI concepts (optional)

## Step 1: Planning Your Application

Before we start coding, let's plan what we're building:

**Application Name**: Personal Info Collector

**Features**:
1. Text input for name
2. Dropdown for age group
3. Radio buttons for gender
4. Checkbox for newsletter subscription
5. Button to submit and display information
6. Display area for submitted information
7. Clear button to reset the form

**UI Layout**:
```
[Name: _______________]

[Age Group: ▼]

○ Male   ○ Female   ○ Other

☐ Subscribe to newsletter

[Submit] [Clear]

--- Submitted Information ---
Name: [display]
Age Group: [display]
Gender: [display]
Newsletter: [display]
```

## Step 2: Setting Up the UI

### Adding Form Controls

1. **Start with a clean slate**: If you have any existing controls, clear them by refreshing the page or starting a new project.

2. **Add a Label for the title**:
   - Drag a "Label" from the toolbox onto the form
   - Position it at the top center
   - Double-click it and set the text to "Personal Information Form"

3. **Add Name input**:
   - Drag a "TextBox" onto the form
   - Position it below the title
   - Add a "Label" next to it with text "Name:"

4. **Add Age Group dropdown**:
   - Drag a "ComboBox" (dropdown) onto the form
   - Add a "Label" with text "Age Group:"
   - We'll configure the options later

5. **Add Gender radio buttons**:
   - Drag three "RadioButton" controls
   - Arrange them horizontally
   - Label them "Male", "Female", "Other"
   - Group them by setting the same GroupName property

6. **Add Newsletter checkbox**:
   - Drag a "CheckBox" control
   - Label it "Subscribe to newsletter"

7. **Add action buttons**:
   - Drag two "Button" controls
   - Label them "Submit" and "Clear"

8. **Add display area**:
   - Drag several "Label" controls for displaying results
   - Group them in a "Results" section
   - Initially set their text to empty or placeholder text

### Arranging the Layout

Use the visual designer to arrange your controls in a logical flow:
- Title at the top
- Form inputs in the middle
- Buttons at the bottom
- Results display at the bottom

## Step 3: Configuring Control Properties

### Setting Up the ComboBox

Double-click the Age Group ComboBox and set its properties:

```
Items: Under 18,18-24,25-34,35-44,45-54,55-64,65+
SelectedIndex: -1 (none selected)
```

### Setting Up Radio Buttons

For each radio button, set:
```
GroupName: Gender
Text: Male/Female/Other (respectively)
```

### Naming Controls for Reference

Give meaningful names to controls you'll reference in prompts:

- Name TextBox: `txtName`
- Age ComboBox: `cmbAge`
- Male Radio: `radMale`
- Female Radio: `radFemale`
- Other Radio: `radOther`
- Newsletter Checkbox: `chkNewsletter`
- Submit Button: `btnSubmit`
- Clear Button: `btnClear`
- Result Labels: `lblResultName`, `lblResultAge`, etc.

## Step 4: Writing Natural Language Prompts

This is where the magic happens! Let's write prompts for each interactive element.

### Submit Button Logic

Double-click the Submit button and write:

```
When this button is clicked:
- Get the name from txtName
- Get the selected age group from cmbAge
- Check which gender radio button is selected (radMale, radFemale, or radOther)
- Check if chkNewsletter is checked
- Display all the information in the result labels:
  - lblResultName should show "Name: " + the name
  - lblResultAge should show "Age Group: " + the age group
  - lblResultGender should show "Gender: " + the selected gender
  - lblResultNewsletter should show "Newsletter: " + "Yes" if checked, "No" if not
- If no name is entered, show an error message "Please enter your name"
- If no age group is selected, show an error message "Please select an age group"
- If no gender is selected, show an error message "Please select a gender"
```

### Clear Button Logic

Double-click the Clear button and write:

```
When this button is clicked:
- Clear the text in txtName
- Reset cmbAge to no selection
- Uncheck all gender radio buttons
- Uncheck chkNewsletter
- Clear all result labels (set them to empty text)
```

### Advanced Interactions (Optional)

For a more interactive experience, add prompts to other controls:

**Name TextBox** (OnChange event):
```
When the text in this textbox changes:
- If the text is not empty, change the border color to green
- If the text is empty, change the border color to red
```

**Newsletter Checkbox** (OnChange event):
```
When this checkbox is checked or unchecked:
- If checked, show a label saying "You'll receive our monthly newsletter!"
- If unchecked, hide that label
```

## Step 5: Testing Your Application

1. **Click the ▶ Run button** in the toolbar
2. **Test the form**:
   - Try submitting with empty fields (should show errors)
   - Fill in all fields and submit (should display results)
   - Test the Clear button
   - Test any advanced interactions you added

3. **Debug if needed**:
   - Check the browser console for errors
   - Verify your prompts are clear and specific
   - Try rephrasing prompts if the AI doesn't interpret them correctly

## Step 6: Refining and Enhancing

### Common Issues and Solutions

**AI doesn't understand my prompt**:
- Be more specific: instead of "show error", say "display a message box with text 'Error: Please fill all fields'"
- Use control names consistently
- Break complex logic into smaller steps

**Layout looks wrong**:
- Adjust control positions in design mode
- Use alignment tools
- Consider responsive design for different screen sizes

**Performance issues**:
- Simplify prompts if they're too complex
- Reduce the number of controls if the application feels slow

### Enhancements to Try

1. **Add validation**:
   - Email field with format validation
   - Phone number formatting
   - Date picker for birthdate

2. **Improve UX**:
   - Loading indicators during submission
   - Success messages
   - Form progress indicator

3. **Add more features**:
   - Save data to local storage
   - Export results to PDF
   - Multi-step wizard interface

## Step 7: Understanding AI Interpretation

As you work with PromptBasic IDE, you'll learn how the AI interprets natural language:

### What Works Well
- Clear, specific instructions
- Consistent naming conventions
- Step-by-step logic
- Common programming patterns

### What Might Need Adjustment
- Ambiguous descriptions
- Complex conditional logic
- Very abstract concepts
- Platform-specific features

### Tips for Better Prompts
1. **Be specific**: "Change the background color to blue" vs "Make it look different"
2. **Use control names**: Reference controls by their exact names
3. **Break it down**: Complex operations work better as multiple simple steps
4. **Test iteratively**: Write a prompt, test it, refine as needed
5. **Learn from examples**: Study working prompts and adapt them

## Step 8: Saving and Sharing

### Saving Your Work
- Your work is automatically saved in the browser
- For permanent storage, consider:
  - Exporting the project files
  - Taking screenshots of your design
  - Documenting your prompts

### Sharing with Others
- Share the GitHub repository link
- Provide screenshots of your application
- Document the prompts you used
- Consider creating a video walkthrough

## Next Steps

Congratulations! You've built your first PromptBasic application. Here are some next steps:

1. **Explore more controls**: Try ListBox, PictureBox, Timer, etc.
2. **Build more complex apps**: Calculator, Todo list, Weather app
3. **Learn advanced techniques**: State management, data binding, API integration
4. **Contribute to the project**: Report bugs or suggest features
5. **Join the community**: Share your creations and learn from others

## Troubleshooting

### Application Won't Run
- Check browser console for JavaScript errors
- Ensure all control names in prompts match exactly
- Try simplifying complex prompts

### AI Generates Wrong Code
- Rephrase prompts to be more specific
- Break complex logic into smaller steps
- Check if the AI understands your intent

### UI Layout Issues
- Refresh the page and redesign
- Check control positioning and sizing
- Ensure controls aren't overlapping

For more help, check the [Troubleshooting](troubleshooting.md) guide or create an issue on GitHub.