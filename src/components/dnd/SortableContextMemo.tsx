import React from "react";

import { SortableContext } from "@dnd-kit/sortable";
import { Props } from "@dnd-kit/sortable/dist/components/SortableContext";

function SortableContextMemo(props: Props) {
  return <SortableContext {...props}>{props.children}</SortableContext>;
}

export default React.memo(SortableContextMemo);
