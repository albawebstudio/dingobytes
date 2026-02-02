import { ref } from 'vue'
import type { Cta } from '~/models/common'
import type { Hero } from '~/models/hero'

export function useHeroData() {
    const ctas = ref<Cta[]>([
        {
            to: "/journal",
            external: false,
            title: "Our journal",
            displayText: "Our Journal",
            icon: null,
            variant: "primary",
            isPrimary: true
        },
        {
            to: "/#contact",
            external: false,
            title: "Contact us",
            displayText: "Contact Us",
            icon: null,
            variant: "secondary",
            isPrimary: false
        }

    ]);
    const hero = ref<Hero>({
        title: "Explore, Create, and Innovate",
        description: "At DingoBytes, we’re reviving our passion for technology and creativity. Dive into our journal for insights, challenges, and triumphs in the world of software development. Let’s innovate together!",
        ctas: ctas.value
    })


    return {
        hero,
    }
}
