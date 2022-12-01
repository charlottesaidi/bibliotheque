import React, { FC } from 'react';
import styled from 'styled-components';
import { Icon, MinimalButton, Position, SpecialZoomLevel, Tooltip, Viewer, Worker } from '@react-pdf-viewer/core';
// import { pageNavigationPlugin, RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
// import { disableScrollPlugin } from '@plugins/PdfViewer/disableScrollPlugin';

interface Props {
    filePath: string
}

const Pdf: FC<Props> = ({filePath}) => {
    // const disableScrollPluginInstance = disableScrollPlugin();
    // const pageNavigationPluginInstance = pageNavigationPlugin();

    // const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;

    return (
    <>
        <Container id={'viewer'} className="document relative">
            {/*<Button className="button absolute left-0 top-1/2">*/}
            {/*    <GoToPreviousPage>*/}
            {/*        {(props: RenderGoToPageProps) => (*/}
            {/*            <Tooltip*/}
            {/*                position={Position.BottomCenter}*/}
            {/*                target={*/}
            {/*                    <MinimalButton onClick={props.onClick}>*/}
            {/*                        <Icon size={16}>*/}
            {/*                            <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />*/}
            {/*                        </Icon>*/}
            {/*                    </MinimalButton>*/}
            {/*                }*/}
            {/*                content={() => 'Previous page'}*/}
            {/*                offset={{ left: 0, top: 8 }}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </GoToPreviousPage>*/}
            {/*</Button>*/}
            {/*<Button className="button absolute right-0 top-1/2">*/}
            {/*    <GoToNextPage>*/}
            {/*        {(props: RenderGoToPageProps) => (*/}
            {/*            <Tooltip*/}
            {/*                position={Position.BottomCenter}*/}
            {/*                target={*/}
            {/*                    <MinimalButton onClick={props.onClick}>*/}
            {/*                        <Icon size={16}>*/}
            {/*                            <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />*/}
            {/*                        </Icon>*/}
            {/*                    </MinimalButton>*/}
            {/*                }*/}
            {/*                content={() => 'Next page'}*/}
            {/*                offset={{ left: 0, top: 8 }}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </GoToNextPage>*/}
            {/*</Button>*/}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={filePath}
                    defaultScale={SpecialZoomLevel.PageFit}
                    // plugins={[disableScrollPluginInstance, pageNavigationPluginInstance]}
                />
            </Worker>
        </Container>
    </>
)};

const Container = styled.div`
    &.document {
        height: calc(100vh - 122px);
    }
`
// const Button = styled.div`
//     &.button {
//         z-index: 1
//     }
// `

export default Pdf;