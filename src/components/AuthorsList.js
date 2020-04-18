import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthorsList = (props) => {
  return props.authors.map((author) => (
    <div key={author.id}>
      <h4 className="mb-3">{author.name}</h4>
      <table className="table">
        <thead>
          <tr>
            <th className="w-75">Courses</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((course) =>
            course.authorId === author.id ? (
              <tr key={course.id}>
                <td>
                  <Link
                    to={{
                      pathname: '/course/' + course.slug,
                      state: {
                        previous: '/authors'
                      }
                    }}
                  >
                    {course.title}
                  </Link>
                </td>
                <td>{course.category}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  ));
};

AuthorsList.propType = {
  authors: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired
};

export default AuthorsList;
