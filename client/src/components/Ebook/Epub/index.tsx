import React, {FC} from 'react';
import {EpubView, ReactReader} from "react-reader"

interface Props {
    filePath: string
}

const Ebook: FC<Props> = ({filePath}) => {
    const [location, setLocation] = React.useState<string | number | undefined>()
    const [firstRenderDone, setFirstRenderDone] = React.useState(false)

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

            <ReactReader
                swipeable={true}
                showToc={false}
                location={location}
                locationChanged={locationChanged}
                url={filePath}
                getRendition={(rendition) => {
                    rendition.display()
                }}
            />
        </div>
    </>
)};

export default Ebook;