import React, { FC } from 'react';
import styled from 'styled-components';
import {DocumentLoadEvent, PageChangeEvent, SpecialZoomLevel, Viewer, Worker} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import {useWindowSize} from '@hooks/windowSize';

interface Props {
    filePath: string
}

const Pdf: FC<Props> = ({filePath}) => {
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [numPages, setNumPages] = React.useState<number>()
    const [width] = useWindowSize();

    const viewerHeight = width >= 640 ? "calc(100vh - 115px)" : "calc(100vh - 165px)";

    const handleDocumentLoad = (e: DocumentLoadEvent) => {
        const storedCurrentPage = localStorage.getItem('current-pdf-page');
        storedCurrentPage ? setCurrentPage(parseInt(storedCurrentPage)) : setCurrentPage(0)
        setNumPages(e.doc.numPages)
        console.log(e.doc)
    }

    const handlePageChange = (e: PageChangeEvent) => {
        setCurrentPage(e.currentPage)
        localStorage.setItem('current-pdf-page', currentPage.toString());
    }

    return (
    <>
        <Container id={'viewer'} className="document relative" style={{height: viewerHeight}}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={filePath}
                    initialPage={currentPage}
                    theme={'dark'}
                    onDocumentLoad={(event) => handleDocumentLoad(event)}
                    onPageChange={(event) => handlePageChange(event)}
                    defaultScale={SpecialZoomLevel.PageWidth}
                />
            </Worker>
            <div>
                <p className={'text-center text-sm sm:text-md py-2'}>Page <span className={'text-active'}>{currentPage}</span> sur {numPages}</p>
            </div>
        </Container>
    </>
)};

const Container = styled.div`
    
`

export default Pdf;