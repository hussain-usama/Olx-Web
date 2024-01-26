
export const generateViewUrl=(e)=>{
    const getFiles = [...e.target.files]
    const newImageUrl = []
    getFiles.map(item=>{
        newImageUrl.push(URL.createObjectURL(item))
    })
    return newImageUrl
}