import React from "react";
import {UseFormReturn} from "react-hook-form/dist/types/form";
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import {FieldErrors} from "react-hook-form";
import ErrorAlert from "@components/ErrorAlert";
import {ErrorMessage} from "@hookform/error-message";

interface Props {
    containerClasses?: string,
    inputLabel?: string,
    inputName: string,
    register: UseFormReturn["register"],
    errors: FieldErrors,
    setValue: any,
}

const InputFile = ({containerClasses, inputLabel, inputName, register, errors, setValue}: Props) => {
    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
            onDrop: files => {
                setValue(inputName, files[0]);
            }
        });

    React.useEffect(() => {
        register(inputName, {required: 'Fichier obligatoire'});
    }, []);

    return (
        <div className={containerClasses}>
            {
                inputLabel ?
                    <label className="inline-block font-medium text-sm mb-2">
                        {inputLabel}
                    </label>
                    : null
            }
            <div className="container">
                <Container className={'bg-slate-800'} {...getRootProps({isFocused, isDragAccept, isDragReject})}>
                    <input type={'file'} name={inputName} {...getInputProps()} />
                    <p className={'font-bold'}>
                        <i className={'icon-cloud-upload text-lg pr-3'}></i>
                        Sélectionner ou faire glisser
                    </p>
                    {
                        acceptedFiles.map(file => (
                            <p className={'mt-3'} key={file.name}>
                                {file.name}
                            </p>
                        ))
                    }
                </Container>

                {
                    errors ?
                        <ErrorMessage
                            errors={errors}
                            name={inputName}
                            render={({message}) => <ErrorAlert message={message}/>}
                        />
                        : null
                }
            </div>
        </div>
    )
}
const getColor = (props: any) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isFocused) {
        return '#2196f3';
    }
    return '#bdbdbd';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  cursor: pointer
`;

export default InputFile;