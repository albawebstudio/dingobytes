import { ref } from 'vue'
import type {
    Address
} from '~/models/common'
import type { Contact } from '~/models/contact'

export function useContactData() {
    const address = ref<Address> ({
        street1: "",
        street2: null,
        city: "Apple Valley",
        state: "MN",
        postal_code: "55124"
    });

    const contact = ref<Contact>({
        title: "Get in Touch!",
        description: [
            "At DingoBytes, we believe in the power of connection! Whether you have questions, comments, or just want to share your thoughts, we’d love to hear from you. Our journey is filled with ups and downs, and we’re all about keeping it light-hearted and real. So don’t be shy—drop us a line and let’s chat!",
        ],
        address: address.value,
    });

    return {
        contact,
        address,
    }
}
