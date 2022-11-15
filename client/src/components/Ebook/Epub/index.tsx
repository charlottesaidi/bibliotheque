import React, {FC, useRef, useState} from 'react';
import { ReactReader } from "react-reader"

interface Props {
    filePath: string
}

function Chapter(path: string, label: string) {
    return (
        <li key={'page-'+label}>
            <a href={path}>{label}</a>
        </li>
    )
}

const Ebook: FC<Props> = ({filePath}) => {
    const [location, setLocation] = React.useState<string | number | undefined>()
    const [firstRenderDone, setFirstRenderDone] = React.useState(false)
    const [chapters, setChapters] = React.useState<Array<any>>()

    const locationChanged = (epubcifi: any) => {
        if (!firstRenderDone){
            setLocation(localStorage.getItem("book-progress") || '')// getItem returns null if the item is not found.
            setFirstRenderDone(true)
            return;
        }

        localStorage.setItem("book-progress", epubcifi)

        setLocation(epubcifi);
    }

    return (
    <>
        <div id={"viewer"} style={{ height: "calc(100vh - 115px)", position: "relative" }}>
            {/*<ul>*/}
            {/*    {chapters?.map((page: any) => {*/}
            {/*        return Chapter(page.path, page.label)*/}
            {/*    })}*/}
            {/*</ul>*/}
            <ReactReader
                swipeable={true}
                showToc={false}
                location={location}
                locationChanged={locationChanged}
                url={filePath}
                getRendition={(rendition) => {
                    rendition.display()
                }}
                tocChanged={toc => {
                    const pages: Array<any> = [];
                    Object.entries(toc).map((value) => {
                        pages.push({path: value[1].href, label: value[1].label})
                    })
                    setChapters(pages)
                }}
            />
        </div>
    </>
)};

export default Ebook;