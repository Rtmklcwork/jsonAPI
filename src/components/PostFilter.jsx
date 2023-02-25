import React from 'react';
import MySelect from '../UI/button/select/MySelect';
import MyInput from '../UI/button/input/MyInput';

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
       <div>
        <MyInput
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
        />
      </div>
      <div>
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue='сортировка'
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
    </div>
  )
}

export default PostFilter
