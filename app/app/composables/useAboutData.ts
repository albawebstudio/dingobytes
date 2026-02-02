import { ref } from 'vue'
import type { About } from '~/models/about'

export function useAboutData() {

    const about = ref<About>({
        title: "About DingoBytes",
        content: [
            "Welcome to DingoBytes, the creative playground brought to you by Alba Web Studio LLC! Here, we’re all about incubating innovative web projects and diving into the latest technology trends. Our mission is to explore, learn, and share our journey through the ever-evolving digital landscape.",
            "Founded by Andrew Alba, who has called the Minneapolis-St. Paul area home since 2010, DingoBytes is where our passion for web development comes to life. With a rich history in advertising and marketing dating back to 1997, we bring a unique blend of creativity and technical expertise to every project. While Andrew has enjoyed collaborating with various companies in the marketing and e-commerce sectors, his heart is dedicated to fostering innovation right here at DingoBytes.",
            "At DingoBytes, we embrace the latest technologies—whether it’s JavaScript (Node.js, TypeScript), PHP, ColdFusion, Java, AWS, or anything else that sparks our curiosity. Our blog serves as a documentation of our adventures, challenges, and victories as we navigate new projects and technologies. We’re excited to share what we learn along the way, and we hope you’ll join us on this fun and dynamic journey!",
            "Let’s innovate together!"
        ]
    });

    return {
        about,
    }
}
