const clickToSelect = (config) => {
  const { allowMultiSelect } = Object.assign(
    { allowMultiSelect: false },
    config
  );
  api.tools.addTool({
    key: "click-to-select",
    label: "click-to-select",
    active: true,
    enabled: true,
    handlers: {
      click: async (event) => {
        const hitNodes = event.hitNodes[0]?.hierarchy.reverse();
        if (!hitNodes) {
          api.selectionSet.clear();
          return;
        }

        console.log(hitNodes);

        const firstItem = hitNodes.find(
          (el) => el.type.toLowerCase() === "item"
        );

        if (allowMultiSelect) {
          if (api.selectionSet.includes(firstItem.nodeId))
            api.selectionSet.remove(firstItem.nodeId);
          else api.selectionSet.add(firstItem.nodeId);
          return;
        }

        if (api.selectionSet.includes(firstItem.nodeId))
          api.selectionSet.remove(firstItem.nodeId);
        else {
          api.selectionSet.clear();
          api.selectionSet.add(firstItem.nodeId);
        }
      },
    },
  });
};

export default clickToSelect;
