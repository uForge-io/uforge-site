---
icon: lucide/boxes
description: "Turning SiFli-SDK example code into reusable components and `sf-pkg` packages: quality bar, what to document, and common packaging traps to avoid."
tags:
    - Develop
    - SiFli-SDK
---

# Components and `sf-pkg` { #components-and-sf_pkg }

SiFli projects often depend on reusable middleware, drivers, and components. As a project grows beyond a copied example, use SiFli's package/component ecosystem to publish and maintain reusable firmware building blocks.

## How to Think About Components { #how-to-think-about-components }

Use components for code that should be shared across products or examples:

- Peripheral drivers.
- Display panel support.
- Bluetooth services.
- GUI widgets.
- Sensor adapters.
- Storage helpers.
- Product middleware.

Keep one-off application logic in the application project until it has a stable interface and multiple users.

## Practical Workflow { #practical-workflow }

1. Start from a working SDK example.
2. Identify the part that should be reusable.
3. Expose it through a small, clearly scoped API.
4. Add configuration through the SDK's normal build/config mechanism.
5. Document dependencies, memory use, and required peripherals.
6. Only then package it as a reusable component.

## Use `sf-pkg` to Distribute Components { #use-sf-pkg-to-distribute-components }

A component is a reusable engineering unit. SiFli's component registry is based on Conan; the current SDK command-line subcommand is `sf-pkg`.

To consume a package, run `sdk.py sf-pkg init` from the SDK project's `project` directory to create `conanfile.py`. Add package references to its `requires` field in the form `package/version@<username>`, using the package-registry username. Then run `sdk.py sf-pkg install` from that directory. Installed packages are placed in `project/sf-pkgs`; their Kconfig files are included in `menuconfig` under `SiFli External Components`.

To publish a component, run `sdk.py sf-pkg new --name <package_name>` from its directory and review the generated `conanfile.py`. You may pass `--support-sdk-version <sdk_version_range>` to set the range during creation. Whether or not you use that option, verify that the recipe declares the intended compatible SDK range in `support_sdk_version`, and adjust it if needed. Choose a semantic package version and complete the package metadata and dependencies. After authenticating with the registry, build and upload the package:

```bash
sdk.py sf-pkg build --version <version>
sdk.py sf-pkg upload --name <package_name>/<version>@<username>
```

The exact workflow can vary by SDK release. See SiFli's [package integration guide (Chinese)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/sf_pkg/use.html), [package creation and publishing guide (English)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/sf_pkg/create.html), and [Chinese edition](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/sf_pkg/create.html) for setup, authentication, and version-specific details.

## Component Quality Bar { #component-quality-bar }

A component is ready to share when:

- It builds from a clean checkout with its setup and dependencies documented.
- It has one minimal example.
- It documents required configuration.
- It avoids hidden board assumptions.
- It reports errors clearly.
- It documents any use of global resources, including ownership and release rules.
- It states thread, callback, and memory ownership rules.

## What to Record { #what-to-record }

Every reusable component should document:

- Supported chips and boards.
- Required SDK version.
- Required peripherals and pins.
- Required RTOS/middleware configuration.
- Threading and callback behavior.
- RAM, flash, and stack expectations.
- Example project path.

## Avoid These Traps { #avoid-these-traps }

<div align="center"><em>Table: Avoid These Traps</em></div>

<div align="center" markdown>

| Trap | Better approach |
|:-----|:----------------|
| Copying a whole example into every product. | Extract only the stable reusable layer. |
| Hiding pin names in component code. | Pass board resources through configuration. |
| Assuming one display/audio path. | Document supported hardware paths. |
| Ignoring memory use. | Record stack, heap, DMA, and buffer expectations. |
| Shipping without an example. | Include one minimal integration example. |

</div>
