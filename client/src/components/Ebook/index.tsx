import React, { FC } from 'react';
import Epub from '@components/Ebook/Epub';
import Pdf from '@components/Ebook/Pdf';

interface Props {
    file: any
}

const Ebook: FC<Props> = ({file}) => (
    <>
        {file.extension == 'epub' ?
            <Epub filePath={require('@assets/upload/books/' + file.name + '.' + file.extension)}/> 
            : <Pdf filePath={require('@assets/upload/books/' + file.name + '.' + file.extension)}/>
        }
    </>
);

export default Ebook;