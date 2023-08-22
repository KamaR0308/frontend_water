import { useState, useLayoutEffect } from "react";

const queries = [
    "(max-width: 576px)",
    "(min-width: 577px) and (max-width: 1024px)",
    "(min-width: 1025px)"
];

const screenTypes = ["isMobile", "isTablet", "isDesktop"];

export const useMatchMedia = () => {
    const mediaQueryLists = queries.map((query) =>
        window.matchMedia(query)
    );

    const getValues = () => mediaQueryLists.map((list) => list.matches);

    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handler = () => setValues(getValues());

        mediaQueryLists.forEach((list) =>
            list.addEventListener("change", handler)
        );

        return () => {
            mediaQueryLists.forEach((list) =>
                list.removeEventListener("change", handler)
            );
        };
    }, []);

    return screenTypes.reduce(
        (acc, screen, index) => ({
            ...acc,
            [screen]: values[index]
        }),
        {}
    );
};
