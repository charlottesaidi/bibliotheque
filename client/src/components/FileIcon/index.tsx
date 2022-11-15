import React, {FC, useEffect} from "react";

import pdf from '@assets/images/svgs/pdf-icon.svg';
import epub from '@assets/images/svgs/epub-icon.svg';
import mp4 from '@assets/images/svgs/mp4-icon.svg';
import avi from '@assets/images/svgs/avi-icon.svg';
import mkv from '@assets/images/svgs/mkv-icon.svg';
import defaultFile from '@assets/images/svgs/file-icon.svg';

interface IconProps {
    fileType: string
}

const FileIcon: FC<IconProps> = ({fileType}) => {

    const getIconSource = () => {
        let iconSource = '';
        switch (fileType) {
            case 'pdf':
                iconSource = pdf;
                break;
            case 'epub':
                iconSource = epub;
                break;
            case 'mp4':
                iconSource = mp4;
                break;
            case 'avi':
                iconSource = avi;
                break;
            case 'mkv':
                iconSource = mkv;
                break;
            default:
                iconSource = defaultFile;
        }
        return iconSource;
    }

    return (
        <>
            <img src={getIconSource()} />
        </>
    )
}
export default FileIcon;