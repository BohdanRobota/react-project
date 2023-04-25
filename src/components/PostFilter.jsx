import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

function PostFilter({ filter, setFilter }) {
  return (
    <div>
      <MyInput
        placeholder="Search"
        value={filter.query}
        onChange={(event) => setFilter({ ...filter, query: event.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
        defaultValue="Sort By"
        options={[
          { value: 'title', name: 'by name' },
          { value: 'body', name: 'by description' },
        ]}
      />
    </div>
  );
}

export default PostFilter;
