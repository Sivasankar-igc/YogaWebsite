const generateContentId = () => {
    return `content${new Date().getTime()}${Math.random().toString().substring(6)}`
}

export default generateContentId;