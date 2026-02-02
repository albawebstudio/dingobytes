import type {
    Address
} from '~/models/common'


export interface Contact {
    title:        string;
    description:  string[];
    address:      Address;
}
