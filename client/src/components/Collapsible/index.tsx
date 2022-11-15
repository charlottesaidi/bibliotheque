import React, {FC, ReactElement} from "react";

interface CollapsibleProps {
    accordionId: string,
    accordionItems: any,
    classes?: string
}

const Collapsible = ({accordionId, accordionItems, classes}: CollapsibleProps) => {
    return (
        <div className={classes + " accordion w-full"} id={accordionId}>
            {accordionItems}
        </div>
    )
}

export default Collapsible;