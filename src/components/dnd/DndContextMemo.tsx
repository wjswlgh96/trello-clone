import React from "react";

import { Props } from "@dnd-kit/core/dist/components/DndContext/DndContext";
import { DndContext } from "@dnd-kit/core";

function DndContextMemo(props: Props) {
  return <DndContext {...props}>{props.children}</DndContext>;
}

export default React.memo(DndContextMemo);
