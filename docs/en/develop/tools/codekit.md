---
icon: lucide/app-window
description: "How SiFli CodeKit's VS Code extension fits around SiFli-SDK development, covering project setup, build/flash/monitor workflow, and troubleshooting."
tags:
    - Develop
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit is the VS Code extension for SiFli-SDK development. It guides SDK setup, project creation, configuration, build, flash, and monitor workflows.

Use [Getting Started with CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) for the first run. This page explains where CodeKit fits in the development workflow.

Primary reference:

- [SiFli CodeKit getting started](https://docs.sifli.com/projects/codekit/get-started/)

## Best Use Cases { #best-use-cases }

Use CodeKit when you want:

- A VS Code-centered SDK workflow.
- Guided project setup.
- Board and project configuration from the editor.
- Build/flash/monitor actions without memorizing every command.
- A smoother path for developers new to SiFli-SDK.

Use the command-line SDK flow when you are writing CI scripts, debugging toolchain path issues, or preparing factory/release procedures. CodeKit is a developer productivity layer, not a substitute for understanding the SDK build.

## Relationship to SiFli-SDK { #relationship-to-sifli-sdk }

CodeKit wraps the SDK workflow. It does not replace the SDK. The same underlying ideas still matter:

- SDK root.
- Board name.
- Project directory.
- Build output.
- Flash/download path.
- Serial monitor.

If a CodeKit action fails, reproduce the underlying SDK command when possible. That makes bug reports clearer and helps separate extension issues from SDK issues.

Use [SiFli-SDK](../platforms/sifli-sdk/overview.md) to choose the supported baseline and [Build, Flash, Monitor](../platforms/sifli-sdk/build-flash-monitor.md) to retain the equivalent command-line evidence. Start from a matching [SDK example](../examples/index.md) before adapting a CodeKit project.

## Operational Model { #operational-model }

CodeKit is most useful when its editor actions remain reproducible from the underlying SDK. Treat the extension as the control surface and SiFli-SDK as the source of truth for the toolchain, board definition, build output, and download artifacts.

The [Getting Started with CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) page covers installing the extension and running `hello_world`. Once that baseline works, use CodeKit to shorten the edit–build–flash–monitor loop; use the SDK command line when an action must be automated, inspected, or reproduced outside VS Code.

## What to Record { #what-to-record }

For every CodeKit project, record:

- CodeKit extension version.
- SiFli-SDK path and SDK branch.
- Board selected in CodeKit.
- Equivalent SDK board name.
- Build output directory.
- Flash/download behavior.
- Serial monitor baud rate.

This makes it possible to reproduce a GUI action from the command line when needed.

## Failure Boundaries { #failure-boundaries }

<div align="center"><em>Table: Troubleshooting Strategy</em></div>

<div align="center" markdown>

| Failure | Best next step |
|:--------|:---------------|
| SDK not found | Re-select the SDK root and confirm the SDK install completed. |
| Build fails | Reproduce the same project with `scons` if possible. |
| Flash fails after the first-run baseline works | Compare the project board/output with the working baseline, then check port ownership and download mode. |
| Monitor shows garbage | Confirm baud rate and selected port. |
| UI command missing | Use the command palette and search for `SiFli`. |

</div>
