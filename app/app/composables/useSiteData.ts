import { ref } from 'vue'
import type {
    Address,
    Built,
    Email,
    Phone,
    Link,
    SocialLink
} from '~/models/common'
import type { Site } from '~/models/site'

export function useSiteData() {
    const runtimeConfig = useRuntimeConfig()
    const siteUrl = runtimeConfig.public.siteUrl
    const address = ref<Address> ({
        street1: "",
        street2: null,
        city: "Apple Valley",
        state: "MN",
        postal_code: "55124"
    });
    const emails = ref<Email[]> ([
        {
            display_name: "Support",
            account: "support",
            domain: "albawebstudio.com"
        },
        {
            display_name: "Privacy",
            account: "privacy",
            domain: "albawebstudio.com"
        }
    ])
    const phone = ref<Phone> ({
        raw: "+16124406349",
        formatted: "+1 (612) 440-6349"
    })
    const links = ref<Link[]> ([
        {
            title: "about",
            to: "/#about",
            external: true,
            icon: null,
            displayText: "About",
        },
        {
            title: "journal",
            to: "/journal",
            external: true,
            icon: null,
            displayText: "Developer's Diary",
        },
        {
            title: "Contact",
            to: "/#contact",
            external: true,
            icon: null,
            displayText: "Contact",
        }
    ])
    const social_links = ref<SocialLink[]> ([
        {
            component: "SvgoGithub",
            label: "Github",
            color: "filter-white",
            bg_color: "github",
            icon: "fa-brands fa-github",
            display_title: "Github",
            href: "https://github.com/albawebstudio"
        },
        /*{
            component: "SvgoInstagram",
            label: "instagram",
            color: "filter-white",
            bg_color: "instagram",
            icon: "fa-brands fa-instagram",
            display_title: "Instagram",
            href: "https://instagram.com/andrewalba/"
        },
        {
            component: "SvgoThreads",
            label: "threads",
            color: "filter-white",
            bg_color: "threads",
            icon: "fa-brands fa-threads",
            display_title: "Threads",
            href: "https://www.threads.net/@andrewalba"
        },
        {
            component: "SvgoDevto",
            label: "devto",
            color: "filter-white",
            bg_color: "devto",
            icon: "fa-brands fa-dev",
            display_title: "DevTo",
            href: "https://dev.to/andrewalba/"
        },
        {
            component: "SvgoWakatime",
            label: "wakatime",
            color: "filter-white",
            bg_color: "wakatime",
            icon: "fa-brands fa-wakatime",
            display_title: "WakaTime",
            href: "https://wakatime.com/@albawebstudio/"
        }*/
    ])
    const footer_links = ref<Link[]> ([
        {
            title: "about",
            to: "/#about",
            external: true,
            icon: null,
            displayText: "About",
        },
        {
            title: "terms & conditions",
            to: "/legal/terms",
            external: true,
            icon: null,
            displayText: "Terms & Conditions",
        },
        {
            title: "privacy policy",
            to: "/legal/privacy",
            external: true,
            icon: null,
            displayText: "Privacy Policy",
        },
        {
            title: "Contact",
            to: "/#contact",
            external: true,
            icon: null,
            displayText: "Contact",
        }
    ])

    const built = ref<Built> ({
        href: "https://albawebstudio.com",
        title: "Alba Web Studio"
    })

    const site = ref<Site>({
        title: "DingoBytes",
        legalName: "Alba Web Studio",
        shortName: "Alba Web Studio",
        tagLine: "",
        siteUrl: siteUrl as string,
        established: 2001,
        copyright: 2001,
        address: address.value,
        phone: phone.value,
        emails: emails.value,
        links: links.value,
        social_links: social_links.value,
        footer_links: footer_links.value,
        built: built.value,
        builtIn: "Proudly developed in Minnesota",
        footerMessage: "Let’s stay connected! While we may not be on every social media platform, we invite you to join us on this journey of exploration and innovation. Share your thoughts on code, creativity, and life’s little joys—because everything’s better when we share the good stuff. 🍻",
    });

    const getEmailByAccount = (account: string) => computed(() => {
        return emails.value.find((email: { account: string }) => email.account === account) || null;
    });

    return {
        address,
        emails,
        phone,
        links,
        social_links,
        site,
        getEmailByAccount
    }
}
