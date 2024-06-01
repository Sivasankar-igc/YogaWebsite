export const generateDate = () => {
    let date = String(new Date()).split(" ");
    return `${date[2]} ${date[1]} ${date[3]}`;
}