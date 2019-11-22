# Dialog

Kenshoo Dialog

Code usage:

```jsx
import React, { PureComponent } from "react";
import Dialog, { DialogFooter, DialogTitle, DialogContent } from "@kenshooui/dialog";
import Buttons from "./buttons.js";

class Demo extends PureComponent {
  state = { isOpen: false };

  onClose = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    return isOpen ? (
      <Dialog onClose={this.onClose}>
        <DialogTitle>This is the Dialog title </DialogTitle>
        <DialogContent>
            Some dialog content
        </DialogContent
        <DialogFooter>
           <Buttons />
        </DialogFooter>
      </Dialog>
    ) : null;
  }
}
```

Full screen Code usage:

```jsx
import React, { PureComponent } from "react";
import Dialog, { DialogFooter, DialogTitle } from "@kenshooui/dialog";
import Buttons from "./buttons.js";

class Demo extends PureComponent {
  state = { isOpen: false };

  onClose = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    return isOpen ? (
      <Dialog fullScreen onClose={this.onClose}>
        <DialogTitle fullScreen newFullScreenDesign>
          This is the Dialog title{" "}
        </DialogTitle>
        Some dialog content
        <DialogFooter>
          <Buttons />
        </DialogFooter>
      </Dialog>
    ) : null;
  }
}
```

Dialog with list to list Code usage:
Using **extraOffsetContext**

```jsx
import { extraOffsetContext } from "../../../../../../dialog/src";

const ExtraOffsetContextConsumer = extraOffsetContext.Consumer;

...
...
        <ExtraOffsetContentConsumer>
          {extraOffset => (
            <WideListToList
              onReorder={this.onReorder}
              availableItems={this.state.availableItems}
              selectedItems={this.state.selectedItems}
              onChange={this.toggleSelectItem}
              onSelectAll={showSelectAll && this.selectAll}
              onClearAll={showClearAll && this.clearAll}
              availableItemRenderer={AvailableListItem}
              selectedItemRenderer={props => <SelectedListItem {...props} />}
              extraOffset={extraOffset}
              {...props}
            />
          )}
        </ExtraOffsetContextConsumer>
...
...
```

```jsx
import React, { useState, useEffect } from "react";
import Dialog, { DialogFooter, DialogTitle } from "@kenshooui/dialog/src";
import ActionBar from "../../action_bar/action_bar";
import DemoDialogContent from "./demo_dialog_content";

const DemoWithComponents = props => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    isOpen && (
      <Dialog {...props} onClose={toggleDialog} withAnimation={false}>
        <DialogTitle>This is the title</DialogTitle>
        <DemoDialogContent />
        <DialogFooter onClose={toggleDialog}>
          <ActionBar />
        </DialogFooter>
      </Dialog>
    )
  );
};

export default DemoWithComponents;

}
```

## Props

| Name                  | Type      | Default    | Description                                                                                                                                                       |
| :-------------------- | :-------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onClose`             | `Func`    |            | callback passed to the dialog's children and the DialogTitle                                                                                                      |
| `className`           | `string`  |            | used to customize dialog content                                                                                                                                  |
| `fullScreen`          | `Boolean` | false      | used to get full screen style                                                                                                                                     |
| `newFullScreenDesign` | `Boolean` | true       | This is a temporary boolean used for backward compatibility until all dialogs use the new design (for example product_manager, automated_actions, audit_report... |
| `withExitPrompt`    | `Boolean` | false      | when true - it shows a popup before unloading page                                                                                                                |
| `withAnimation`       | `Boolean` | {Optional} | Should the dialog have height/width/opacity animation while opening                                                                                               |
