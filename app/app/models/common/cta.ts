type CtaVariant = 'primary' | 'secondary'

export interface Cta {
    title: string;
    to: string;
    external: boolean;
    icon: string | null;
    displayText: string | null;
    variant: CtaVariant;
    isPrimary: boolean;
}
