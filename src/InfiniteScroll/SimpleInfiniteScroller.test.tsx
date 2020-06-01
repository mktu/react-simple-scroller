import React from 'react';
import { create, act } from 'react-test-renderer';
import SimpleInfiniteScroller from './SimpleInfiniteScroller';

describe("<SimpleInfiniteScroller />", () => {
    it("null-test", () => {
        act(() => {
            create(
                <SimpleInfiniteScroller
                    canScrollDown
                    loadMore={() => {
                        throw 'should not called'
                    }}>
                    <ul />
                </SimpleInfiniteScroller>,
                {
                    createNodeMock: () => null
                });
        })

    });

})