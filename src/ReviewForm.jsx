import React from 'react';

import TextField from './TextField';

export default function ReviewForm({ onChange }) {
  return (
    <>
      <TextField
        label="평점"
        name="score"
        type="number"
        onChange={onChange}
      />
      <TextField
        label="리뷰 내용"
        name="description"
        type="text"
        onChange={onChange}
      />
    </>
  );
}
