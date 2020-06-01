import React,{ useState, CSSProperties, useCallback } from 'react';
import SimpleInfiniteScroller from './SimpleInfiniteScroller';

export default {
    title: "SimpleInfiniteScroller"
};

const style : CSSProperties = {
    height : '70vh',
    overflowY: 'auto',
    border : '1px solid rgba(0,0,0,0.1)',
    borderRadius: '10px'
}

const AllData: string[] = Array.from(new Array(300)).map((v, i) => `${i} test`);

const useLoader = () => {
    const [data, setData] = useState<string[]>([]);
    const hasMore = data.length < AllData.length;
    const loadMore = useCallback(() => {
        hasMore && setTimeout(() => {
            setData(prev => {
                return AllData.slice(0, prev.length + 50);
            })
        }, 500);
    },[hasMore]);
    return {
        hasMore,
        loadMore,
        data
    }
}


export const ScrolldownList = () => {
    const { hasMore, loadMore, data } = useLoader();
    return (
        <SimpleInfiniteScroller
            canScrollDown={hasMore}
            loadMore={loadMore}
        >
            <ul style={style}>
                {data.map(v => (
                    <li key={v}>{v}</li>
                ))}
            </ul>
        </SimpleInfiniteScroller>

    )
}

export const ScrollUpList = () => {
    const { hasMore, loadMore, data } = useLoader();
    return (
        <SimpleInfiniteScroller
            loadMore={loadMore}
            canScrollUp={hasMore}
            reverse
        >
            <ul style={style}>
                {data.map(v => (
                    <li key={v}>{v}</li>
                ))}
            </ul>
        </SimpleInfiniteScroller>

    )
}