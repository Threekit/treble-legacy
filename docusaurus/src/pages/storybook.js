import React from "react";
import Layout from "@theme/Layout";

function StoybookPage() {
  return (
    <Layout title="Hello">
      <iframe
        style={{
          height: "calc(100vh - 60px)",
          width: "100vw",
        }}
        src="https://treble-react--storybook-2575b95d01c42270.onporter.run/?path=/story/display-attribute-title--default-story"
      />
    </Layout>
  );
}

export default StoybookPage;
