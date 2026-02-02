import { ref } from 'vue'

import type { Journal } from '~/models/journal'

export function useJournalData() {

    const journal = ref<Journal>({
        title: "Rebel With A Terminal",
        description: "A place for me to remember those difficult or odd moments, and to share my thoughts and experiences with the world."
    })

    return {
        journal,
    }
}
