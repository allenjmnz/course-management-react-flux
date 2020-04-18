import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseList = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course) => (
          <tr key={course.id}>
            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  props
                    .onClick(course.id)
                    .then(() => toast.success('Course successfully deleted.'));
                }}
              >
                Delete
              </button>
            </td>
            <td>
              <Link to={'/course/' + course.slug}>{course.title}</Link>
            </td>
            <td>
              {props.authors.map((author) =>
                author.id === course.authorId ? author.name : null
              )}
            </td>
            <td>{course.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  onClick: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CourseList;
