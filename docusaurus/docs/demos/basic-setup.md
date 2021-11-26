---
sidebar_position: 1
custom_edit_url:
hide_table_of_contents: true
---

# Basic Setup

```jsx live
function ThreekitApp() {
  return (
    <ThreekitProvider config={threekitConfig} threekitEnv={"preview"}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 300px",
          gridGap: "12px",
        }}
      >
        <Player />
        <FlatForm />
      </div>
    </ThreekitProvider>
  );
}
```
