import React, {ReactElement} from "react";
import styled from "styled-components";

interface CollapsibleItemProps {
    title?: string | ReactElement,
    children: ReactElement,
    headingId: string,
    collapsibleId: string,
    dataBsParent: string,
    accordionClasses?: string,
    buttonClasses?: string,
    headingClasses?: string,
    isOpen?: boolean
}

const CollapsibleItem = ({...props}: CollapsibleItemProps) => {

    const collapseStyle = (open?: boolean) => {
        let style = 'accordion-collapse collapse';
        style += open ? 'show' : '';
        return style;
    }

    return (
        <>
            <div className={props.accordionClasses + " accordion-item relative"}>
                <div className={props.headingClasses + " accordion-header mb-0"} id={props.headingId}>
                    <Button
                        className={props.buttonClasses + " accordion-button relative flex items-center w-full p-2.5 border-0 rounded-none transition focus:outline-none"}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={'#'+props.collapsibleId}
                        aria-expanded="true"
                        aria-controls={props.collapsibleId}
                    >
                        {props.title}
                    </Button>
                </div>
                <Collapse
                    id={props.collapsibleId}
                    className={collapseStyle(props.isOpen)}
                    aria-labelledby={props.headingId}
                     data-bs-parent={'#'+props.dataBsParent}
                >
                    <div className="accordion-body">
                        {props.children}
                    </div>
                </Collapse>
            </div>
        </>
    )
}

const Button = styled.button`
    &.accordion-button,
    &.accordion-button:not(.collapsed) {
        color: inherit;
        background-color: inherit;
        box-shadow: none;
        &::after {
            filter: grayscale(1)
        }
    }
`
const Collapse = styled.div` `

export default CollapsibleItem;