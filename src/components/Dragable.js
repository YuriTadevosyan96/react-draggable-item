import React, { useRef, useEffect } from "react";
import styles from "../assets/styles/Dragable.module.css";

export const Dragable = () => {
    const dragableItem = useRef();
    let left, top;

    const mouseDownHandler = (e) => {
        const { clientX, clientY } = e;
        const { x, y } = e.target.getBoundingClientRect();
        left = clientX - x;
        top = clientY - y;

        if (e.target === dragableItem.current) {
            document.addEventListener("mousemove", mouseMoveHandler);
        }
    };

    const mouseMoveHandler = (e) => {
        dragableItem.current.setAttribute(
            "style",
            `top: ${e.y - top}px; left: ${e.x - left}px;`
        );
    };

    const mouseUpHandler = (e) => {
        document.removeEventListener("mousemove", mouseMoveHandler);
    };

    useEffect(() => {
        document.addEventListener("mousedown", mouseDownHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        return () => {
            document.removeEventListener("mousedown", mouseDownHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        };
    }, []);

    return <div className={styles.dragable} ref={dragableItem}></div>;
};
