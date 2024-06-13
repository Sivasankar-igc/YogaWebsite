import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    author: String,
    postedAt: {
        time: String,
        date: String
    },
    authorImage: String,
    indexImage: String,
    title: String,
    description: String
})

const blogCol = new mongoose.model("blogCollection", blogSchema)

const add = async () => {
    try {
        const post = [
            {
                title: "The Journey into Yoga: A Beginner's Guide",
                description: "Discover the transformative power of yoga with our beginner's guide. Learn the basics, from poses to breathing techniques, and start your journey towards balance and wellness.",
                indexImage: "../cart (1).jpeg", // Replace with your image path
                authorImage: "../avat (1).jpeg", // Replace with your image path
                author: "Mrunal Thakur",
            },
            {
                title: "Yoga for Mindfulness: Finding Inner Peace",
                description: "Explore the practice of mindfulness through yoga. Our article delves into techniques that help you connect with the present moment and achieve a state of inner peace.",
                indexImage: "../cart (2).jpeg", // Replace with your image path
                authorImage: "../avat (2).jpeg", // Replace with your image path
                author: "Ritik Ranjan",
            },
            {
                title: "Yoga at Home: Creating Your Sacred Space",
                description: "Learn how to create a sacred space for your yoga practice at home. We provide tips on setting the right atmosphere to enhance your yoga experience.",
                indexImage: "../cart (3).jpeg", // Replace with your image path
                authorImage: "../avat (3).jpeg", // Replace with your image path
                author: "Siva Sankar",
            },
            {
                title: "The Healing Power of Yoga: A Wellness Approach",
                description: "Yoga is not just a physical exercise; it's a healing journey. This article discusses the wellness benefits of yoga and how it promotes physical and mental healing.",
                indexImage: "../cart (4).jpeg", // Replace with your image path
                authorImage: "../avat (4).jpeg", // Replace with your image path
                author: "Lipsa Devi",
            },
        ]
        
    } catch (error) {
        console.error(error)
    }
}

export default blogCol