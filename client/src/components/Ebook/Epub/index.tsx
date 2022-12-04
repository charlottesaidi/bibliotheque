import React, {FC} from 'react';
import {ReactReader} from "react-reader"
import {useWindowSize} from "@hooks/windowSize.ts";
import styled from "styled-components";

interface Props {
    filePath: string
}

const Ebook: FC<Props> = ({filePath}) => {
    const [page, setPage] = React.useState(localStorage.getItem('current-epub-page') || '')
    const [location, setLocation] = React.useState<string | number | undefined>()
    const [firstRenderDone, setFirstRenderDone] = React.useState(false)
    const renditionRef = React.useRef<any>(null)
    const tocRef = React.useRef<any>(null)
    const [width] = useWindowSize();

    const viewerHeight = width >= 640 ? "calc(100vh - 115px)" : "calc(100vh - 150px)";

    const locationChanged = (epubcifi: any) => {
        if (!firstRenderDone){
            setLocation(localStorage.getItem("book-progress") || '')// getItem returns null if the item is not found.
            setFirstRenderDone(true)
            return;
        }

        localStorage.setItem("book-progress", epubcifi)

        setLocation(epubcifi);

        if (renditionRef.current && tocRef.current) {
            const { displayed, href } = renditionRef.current.location.start
            const chapter = tocRef.current.find((item: any) => item.href.split('#')[0] === href.split('/')[1])
            const pageIndication = `Page ${displayed.page} of ${displayed.total} in ${
                chapter ? chapter.label : 'chapter'
            }`
            setPage(pageIndication)
            localStorage.setItem('current-epub-page', pageIndication)
        }
    }

    return (
    <>
        <Viewer id={"viewer"} style={{ height: viewerHeight, position: "relative" }}>

            <ReactReader
                swipeable={true}
                showToc={false}
                location={location}
                locationChanged={locationChanged}
                url={filePath}
                getRendition={(rendition) => {
                    renditionRef.current = rendition
                    rendition.themes.register('custom', {
                        '*': {
                            color: '#cecece',
                            'background-color': "transparent",
                        },
                        body: {
                            'padding-top': '0 !important',
                            'padding-bottom': '0 !important',
                            'padding-left': '0 !important',
                            'padding-right': '0 !important'
                        },
                        img: {
                            border: '1px solid red'
                        },
                        h1: {
                            'font-size': '1em !important'
                        },
                        p: {
                            'font-family': 'Helvetica, sans-serif',
                            'font-weight': '400',
                            'font-size': '0.8em'
                        }
                    })
                    rendition.themes.select('custom')
                    console.log(rendition)
                }}
                tocChanged={toc => (tocRef.current = toc)}
            />
            <PageChapter className={'text-sm sm:text-base'}>{page}</PageChapter>
        </Viewer>
    </>
)};

const PageChapter = styled.p`
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    text-align: center;
`

const Viewer = styled.div`   
    div {
        background-color: transparent !important;
    } 
`

export default Ebook;