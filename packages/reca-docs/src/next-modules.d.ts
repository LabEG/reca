/* eslint-disable */
declare module "next/link" {
    import type React from "react";
    import type {UrlObject} from "url";

    type Url = string | UrlObject;

    interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
        href: Url;
        as?: Url;
        replace?: boolean;
        scroll?: boolean;
        shallow?: boolean;
        passHref?: boolean;
        prefetch?: boolean | null;
        locale?: string | false;
        legacyBehavior?: boolean;
        children?: React.ReactNode;
    }

    declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
    export default Link;
}

declare module "next/navigation" {
    export function usePathname(): string;
    export function useRouter(): {
        push: (href: string) => void;
        replace: (href: string) => void;
        refresh: () => void;
        back: () => void;
        forward: () => void;
        prefetch: (href: string) => void;
    };
    export function useSearchParams(): URLSearchParams;
    export function useParams<T extends Record<string, string | string[]> = Record<string, string | string[]>>(): T;
    export function redirect(url: string, type?: "replace" | "push"): never;
}
