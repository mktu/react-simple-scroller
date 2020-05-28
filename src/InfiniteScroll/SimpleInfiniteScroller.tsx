import React, { useState, useMemo, useEffect, useRef } from 'react';

const getScrollableParent = (element: (HTMLElement | null)):HTMLElement => {
    if (!element) {
        return document.body;
    }

    const overflow = window
        .getComputedStyle(element)
        .getPropertyValue('overflow');

    const overflowY = window
        .getComputedStyle(element)
        .getPropertyValue('overflow-y');

    if (overflow === 'scroll' || overflowY === 'scroll' ||
    overflow === 'auto' || overflowY === 'auto'
    ) {
        return element;
    }

    return getScrollableParent(element.parentElement);
}

type ScrollDirection = 'down' | 'none' | 'up';

type ScrollState = {
    direction: ScrollDirection,
    snapshot: {
        scrollTop: number,
        scrollHeight: number
    }
}

type Children<T extends HTMLElement> = React.ReactElement & {
    ref?: React.Ref<T>;
}

function ScrollableContainer<T extends HTMLElement>({
    loadMore,
    canScrollUp,
    canScrollDown,
    children,
    nextScrollThreshold = 250,
}: {
    children: Children<T>
    loadMore: (scrollDown: boolean) => void,
    canScrollUp?: boolean,
    canScrollDown?: boolean,
    nextScrollThreshold?: number
}) {
    const [childNode,setChildNode] = useState<T>();
    const [scrollState, setScrollState] = useState<ScrollState>();
    useEffect(() => {
        let nextLoad: ScrollDirection = 'none';
        let unmounted = false;
        const scrollableNode = childNode && getScrollableParent(childNode);
        const onScroll = (event: Event) => {
            if (unmounted) return;
            const node = event.target as T;
            const marginBottom = node.scrollHeight - (node.scrollTop + node.clientHeight);
            const marginTop = node.scrollTop;
            if (marginTop < nextScrollThreshold && nextLoad !== 'up' && canScrollUp && !scrollState) {
                nextLoad = 'up';
                scrollableNode && setScrollState({
                    direction: nextLoad,
                    snapshot: {
                        scrollHeight: scrollableNode.scrollHeight,
                        scrollTop: scrollableNode.scrollTop
                    }
                });
                loadMore(false);
            }
            else if (marginBottom < nextScrollThreshold && nextLoad !== 'down' && canScrollDown && !scrollState) {
                nextLoad = 'down';
                scrollableNode && setScrollState({
                    direction: nextLoad,
                    snapshot: {
                        scrollHeight: scrollableNode.scrollHeight,
                        scrollTop: scrollableNode.scrollTop
                    }
                });
                loadMore(true);
            }
        };
        scrollableNode && scrollableNode.addEventListener('scroll', onScroll);
        return () => {
            unmounted = true;
            scrollableNode && scrollableNode.removeEventListener('scroll', onScroll);
        }
    }, [canScrollUp, scrollState, loadMore, setScrollState, nextScrollThreshold, canScrollDown, childNode]);

    // Block loading of the next items until the scroll height is updated by the last loaded item.
    useEffect(() => {
        const scrollableNode = childNode && getScrollableParent(childNode);
        if (scrollableNode && scrollState) {
            const { snapshot, direction } = scrollState;
            if (scrollableNode.scrollHeight !== snapshot.scrollHeight) {
                if (direction === 'up') {
                    scrollableNode.scrollTop = scrollableNode.scrollHeight -
                        snapshot.scrollHeight + snapshot.scrollTop;
                }
                setScrollState(undefined);
            }
        }
    }, [children, scrollState, childNode])

    // If there is not enough data to scroll on the first mount,
    // the next new items needs to be loaded programmatically.
    useEffect(() => {
        const scrollableNode = childNode && getScrollableParent(childNode);
        const scrollHeight = scrollableNode?.scrollHeight || 0;
        const clientHeight = scrollableNode?.clientHeight || 0;
        const scrollTop = scrollableNode?.scrollTop || 0;
        if (scrollHeight === clientHeight &&
            canScrollDown && 
            scrollTop === 0) {
                loadMore(true);
        } else if(scrollHeight === clientHeight &&
            canScrollUp && 
            scrollTop === 0){
                loadMore(false);
            }
    }, [loadMore, canScrollDown, canScrollUp, children, childNode])

    return useMemo(() => {
        const childProps = {
            ...children.props,
            ref: (value: T) => {
                if (children.ref) {
                    if (typeof children.ref === 'function') {
                        children.ref(value);
                    }
                    else {
                        const refObject = children.ref as React.MutableRefObject<T>
                        refObject.current = value;
                    }
                }
                setChildNode(value);
            }
        }
        return React.cloneElement(children, childProps);
    }, [children]);
}


export default ScrollableContainer;