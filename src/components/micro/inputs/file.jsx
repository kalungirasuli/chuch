import React from 'react'
import Files from 'react-files'

export const FileDropzone = ({onChange}) => {
  const handleError = (error, file) => {
    alert('error code ' + error.code + ': ' + error.message)
  }

  return (
    <div className="files bg-slate-300 border border-gray-300" >
      <Files
        className='files-dropzone'
        onChange={onChange}
        onError={handleError}
        accepts={['image/png']}
        maxFileSize={10000000}
        minFileSize={0}
        clickable>
        Drop files here or click to upload
      </Files>
    </div>
  )}