import fs from 'fs'

export const deleteFile = (filePath: string) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('File deleted from local storage')
    })
}