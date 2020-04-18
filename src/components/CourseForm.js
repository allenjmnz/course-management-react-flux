import React from 'react';
import TextInput from './common/TextInput';
import SelectInput from './common/SelectInput';
import PropTypes from 'prop-types';

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        authors={props.authors}
        onChange={props.onChange}
        value={String(props.course.authorId) || ''}
        error={props.errors.authorId}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default CourseForm;
