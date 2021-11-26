---
sidebar_label: Treble JS API
sidebar_position: 4
custom_edit_url:
---

# The Threekit Treble JS API

**`window.threekit.treble`**

## takeSnapshots()

```js
await window.threekit.treble.takeSnapshots(cameraList, snapshotsConfig);
```

The `takeSnapshots` function is used to capture snapshots of the user's current configuration. It returns a Promise that resolves to the defined output.

The function can be provided a list of cameras if you need snapshots from multiple angles. You are also able to specify how you want the snapshot outputted depending on your requirements, for example a `url` if you need to share the image or a `dataUrl` if you'd like to display it in an `<img>` tag.

### arg: cameraList

**`type cameraList: string | undefined | Array<string | undefined>`**

The first argument in the takeSnapshots - `camerasList` - is where you specify the camera you want the snapshots to be taken from. The argument accepts a single camera name (`string | undefined`) or an array of camera names (`Array<string | undefined>`), where the camera names are strings and the current camera (and current position) are identified by `undefined`.

As such calling the function without the `cameraList` argument (`window.threekit.treble.takeSnapshots()`) or setting it to undefined (`window.threekit.treble.takeSnapshots(undefined, snapshotConfig)`), will return a snapshot from the users current view.

### arg: snapshotConfig

```js
const snapshotConfig = {
    //  Default -> `_camera`
    attributeName?: string
    //  Default -> 'blob'
    output?: 'url' | 'download' | 'dataUrl' | 'blob' |  'file'
    //  Default -> 'png'
    format?: 'png' | 'jpeg'
    //  Default -> { width: 1920, height: 1080 }
    size?: { width: number; height: number }
    //  The filename should not include the format extension
    //  that will be automatically appended.
    //  Default -> 'snapshot'
    filename?: string
}
```

**Note: If you are providing are providing a `snapshotConfig` you will have to pass in the camera list as the first argument to the `takeSnapshots()` function.**

The `snapshotConfig` is optional.

### Output

The `takeSnapshots` function returns a Promise. If the you selected `download` as your output for the snapshots, the returned promise will not return a value when it resolves. In all other instances, the Promise will resolve to return an array with each item is a single snapshot in defined output datatype (`blob | file | dataUrl | url`).

The order of snapshots in the array will match the order they were defined in the `cameraList` array passed into the function. If only no value or a single value was provided for the `cameraList` then the output array will only have a single item - the snapshot from the users current view.

**Example**

```js
//  snapshostUrls variable will contain an array with two
//  URLs of an image from the user's current view and one
//  from the 'dimensions-camera', respectively
const snapshotUrls = await window.threekit.treble.takeSnapshots(
  [undefined, "dimensions-camera"],
  { output: "url" }
);
```
