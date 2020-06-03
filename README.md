# react-simple-infinite-scroller

![CI](https://github.com/mktu/react-simple-infinite-scroller/workflows/CI/badge.svg)

## Installation

```
npm install react-simple-infinite-scroller
```

## Usage
### Infinite Scrolldown

```tsx
import SimpleInfiniteScroller from 'react-simple-scroller';

export const ScrolldownList = () => {
    const [data, setData] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const loadMore = () => {
        // call some API to fetch next data.
    }
    return (
        <SimpleInfiniteScroller
            canScrollDown={hasMore}
            loadMore={loadMore}
        >
            <ul style={{ overflowY : 'auto', height : '70vh'}}>
                {data.map(v => (
                    <li key={v}>{v}</li>
                ))}
            </ul>
        </SimpleInfiniteScroller>
    )
}
```
### Infinite Scrollup
```tsx
import SimpleInfiniteScroller from 'react-simple-scroller';

export const ScrollupList = () => {
    const [data, setData] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const loadMore = () => {
        // call some API to fetch next data.
    }
    return (
        <SimpleInfiniteScroller
            canScrollUp={hasMore}
            loadMore={loadMore}
            reverse
        >
            <ul style={{ overflowY : 'auto', height : '70vh'}}>
                {data.map(v => (
                    <li key={v}>{v}</li>
                ))}
            </ul>
        </SimpleInfiniteScroller>
    )
}
```
## Props

| Property | Type | Default | Description |
|-|:-:|:-:|-|
|canScrollDown|boolean|`false`|Whether there is still data to be read for **scrolling down**. This is required when using the scroll down list|
|canScrollUp|boolean|`false`|Whether there is still data to be read for **scrolling up**. This is required when using the scroll up list|
|children|ReactElement|`undefined`|The root element of the scroll like `ul` or `div` with an attribute `overflowY : 'auto'`, |
|reverse|boolean|`false`|If true, it works assuming a **Scroll-up** list|
|nextScrollThreshold|number|`250`|Threshold for the distance to the top or bottom of the window to call the next scroll|
|loadMore|function|`undefined`|See descriptions below|

---

### loadMore
```tsx
function loadMore(scrolldown : boolean) {
  ...
}
```
#### Parameters
* scrolldown : Will be true if called when scrolling down

#### Returns
void

## Demo
[Storybook Demo](https://mktu.github.io/react-simple-infinite-scroller)
