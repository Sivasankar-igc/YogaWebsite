import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    image: String,
    heading: String,
    descripttion: String,
    videoLink: String,
    completed: Boolean
})

const vidoeCol = new mongoose.model("videoCollection", videoSchema)

const add = async (req, res) => {
    try {
        const initialVideos = [
            {
                image: "/cart (2).jpeg",
                heading: "Gentle Morning Yoga",
                description:
                    "Start your day with this calming and energizing yoga practice.",
                videoLink: "https://www.youtube.com/watch?v=9ZRvdbG54H4",
                completed: true,
            },
            {
                image: "/cart (3).jpeg",
                heading: "Yoga For Beginners - The Basics",
                description:
                    "Learn basic poses and principles of yoga in this beginner-friendly video.",
                videoLink: "https://www.youtube.com/watch?v=pWobp3phsEU",
                completed: false,
            },
            {
                image: "/cart (1).jpeg",
                heading: "Vigorous Vinyasa Flow Yoga",
                description:
                    "A dynamic 30-minute vinyasa flow class for intermediate to advanced practitioners.",
                videoLink: "https://www.youtube.com/watch?v=SZU7Sbgu57o",
                completed: false,
            },
            {
                image: "/cart (2).jpeg",
                heading: "Gentle Morning Yoga",
                description:
                    "Start your day with this calming and energizing yoga practice.",
                videoLink: "https://www.youtube.com/watch?v=9ZRvdbG54H4",
                completed: true,
            },
            {
                image: "/cart (3).jpeg",
                heading: "Yoga For Beginners - The Basics",
                description:
                    "Learn basic poses and principles of yoga in this beginner-friendly video.",
                videoLink: "https://www.youtube.com/watch?v=pWobp3phsEU",
                completed: false,
            },
            {
                image: "/cart (1).jpeg",
                heading: "Vigorous Vinyasa Flow Yoga",
                description:
                    "A dynamic 30-minute vinyasa flow class for intermediate to advanced practitioners.",
                videoLink: "https://www.youtube.com/watch?v=SZU7Sbgu57o",
                completed: false,
            },
            {
                image: "/cart (2).jpeg",
                heading: "Gentle Morning Yoga",
                description:
                    "Start your day with this calming and energizing yoga practice.",
                videoLink: "https://www.youtube.com/watch?v=9ZRvdbG54H4",
                completed: true,
            },
            {
                image: "/cart (3).jpeg",
                heading: "Yoga For Beginners - The Basics",
                description:
                    "Learn basic poses and principles of yoga in this beginner-friendly video.",
                videoLink: "https://www.youtube.com/watch?v=pWobp3phsEU",
                completed: false,
            },
            {
                image: "/cart (1).jpeg",
                heading: "Vigorous Vinyasa Flow Yoga",
                description:
                    "A dynamic 30-minute vinyasa flow class for intermediate to advanced practitioners.",
                videoLink: "https://www.youtube.com/watch?v=SZU7Sbgu57o",
                completed: false,
            },
        ];
        await vidoeCol.insertMany(initialVideos)
    } catch (error) {
        console.error(error)
    }
}
// add()
export default vidoeCol