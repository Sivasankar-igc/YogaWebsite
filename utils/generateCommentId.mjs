export const generateCommentId = () => {

    return `${new Date().getTime()}${Math.random().toString().substring(2)}`
}

export default generateCommentId