---
name: Bug report
about: Create a report to help us improve
title: ''
labels: 'issue: bug report, needs triage'
assignees: ''

---

<!--
    Please note that your issue will be fixed much faster if you spend some
    time preparing it, including the exact reproduction steps and a demo.

    If you're in a hurry, it's fine to report bugs with less details,
    but this makes it less likely they'll get fixed soon.

    In either case, please use this template and fill in as many fields below as you can.
-->

### Describe the bug

(Write your answer here.)

### Did you try recovering your dependencies?

<!--
  Your module tree might be corrupted, and that might be causing the issues.
  Let's try to recover it. First, delete these files and folders in your project:

    * node_modules
    * package-lock.json
    * yarn.lock

  Assuming you use yarn, update it first (https://yarnpkg.com/en/docs/install).
  Then run in your project directory:

    yarn

  This should fix your project.

  Importantly, **if you decided to use yarn, you should never run `npm install` in the project**.
  For example, yarn users should run `yarn add <library>` instead of `npm install <library>`.
  Otherwise your project will break again.

  Have you done all these steps and still see the issue?
  Please paste the output of `npm --version` and/or `yarn --version` to confirm.
-->

(Write your answer here.)

### Which terms did you search for in User Guide?

<!--
  If you searched our user guide and didn't find the solution, please share
  which words you searched for. This helps us improve documentation for
  future readers who might encounter the same problem.
-->

(Write your answer here if relevant.)

### Environment

<!--
  To help identify if a problem is specific to a Threekit environment, browser,
  or module version, information about your environment is required.
  This enables the maintainers quickly reproduce the issue and give feedback.
-->

(paste the output of the command here.)

### Steps to reproduce

<!--
  How would you describe your issue to someone who doesn’t know you or your project?
  Try to write a sequence of steps that anybody can repeat to see the issue.
-->

(Write your steps here:)

1.
2.
3.

### Expected behavior

<!--
  How did you expect the tool to behave?
  It’s fine if you’re not sure your understanding is correct.
  Just write down what you thought would happen.
-->

(Write what you thought would happen.)

### Actual behavior

<!--
  Did something go wrong?
  Is something broken, or not behaving as you expected?
  Please attach screenshots if possible! They are extremely helpful for diagnosing issues.
-->

(Write what happened. Please add screenshots!)

### Reproducible demo

<!--
  Where possible, please share a project where the issue can be reproduced.
  This is the single most effective way to get an issue fixed soon.

  There are two ways to do it:

    * Create a new treble app and try to reproduce the issue in it.
      This is useful if you roughly know where the problem is, or can’t share the real code.

    * Or, copy your app and remove things until you’re left with the minimal reproducible demo.
      This is useful for finding the root cause. You may then optionally create a new project.
-->

(Paste the link to an example project and exact instructions to reproduce the issue.)

<!--
  What happens if you skip this step?

  We will try to help you, but in many cases it is impossible because crucial
  information is missing. In that case we'll tag an issue as having a low priority,
  and eventually close it if there is no clear direction.

  We still appreciate the report though, as eventually somebody else might
  create a reproducible example for it.

  Thanks for helping us help you!
-->
