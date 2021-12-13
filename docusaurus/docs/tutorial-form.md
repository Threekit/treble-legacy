---
id: tutorial-form
title: Building your configurator form
sidebar_label: '2. Build your form'
---

# Building your configurator form

## Using the native Form

The Treble Framework includes a component for a pre-build form called the `<FlatForm>`. The **FlatForm** will render out the entire configurator for the initialized product, as it appears on the Threekit Platform, along with the item's name and any description is available.

The form, by default, will display each attribute using the native Form Component that is set as a default for relevant attribute's type, however, you can also explicitly specify another native component you would like to use to present an attribute as well as any additional props that need to be passed to that component/attribute.

You can find more information about the FlatForm by [clicking here](forms-flat-form).

## Build your own Form

While the FlatForm is a good place to start, working with the form as a single component will most likely prove to be too limiting. For most projects we will want more control over the presentation of our form, including the ability to visually organize the attributes differently, or use custom components instead of the provided native ones. In such cases we would want to construct the form ourselves.

## Using custom components
