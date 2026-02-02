import type { Cta } from '~/models/common'

export interface Hero {
    title: string;
    description: string;
    ctas: Cta[];
}
