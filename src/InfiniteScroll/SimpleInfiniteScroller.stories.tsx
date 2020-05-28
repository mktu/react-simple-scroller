import React, { useState } from 'react';
import SimpleInfiniteScroller from './SimpleInfiniteScroller';
import './style.scss'

export default {
    title: "SimpleInfiniteScroller"
};

const AllData: string[] = Array.from(new Array(300)).map((v, i) => `${i} test`);

const useLoader = () => {
    const [data, setData] = useState<string[]>(AllData.slice(0, 50));
    const hasMore = data.length < AllData.length;
    const loadMore = () => {
        hasMore && setTimeout(() => {
            setData(prev => {
                return AllData.slice(0, prev.length + 50);
            })
        }, 500);
    }
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
            <ul className='scroll-component'>
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
        >
            <ul className='scroll-up-component'>
                {data.map(v => (
                    <li key={v}>{v}</li>
                ))}
            </ul>
        </SimpleInfiniteScroller>

    )
}

