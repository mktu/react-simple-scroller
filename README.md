# react-simple-scroller

## Usage
### Infinite Scrolldown

```tsx
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
|canScrollDown|boolean|`undefined`|Whether there is still data to be read when scrolling down. This is required when using the scroll down list|
|canScrollUp|boolean|`undefined`|Whether there is still data to be read when scrolling up. This is required when using the scroll up list|
|loadMore|function|`undefined`|See descriptions below|
