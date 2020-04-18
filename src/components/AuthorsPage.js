import React, { useState, useEffect } from 'react';
import authorStore from '../stores/authorStore';
import courseStore from '../stores/courseStore';
import * as appActions from '../actions/appActions';
import { Link } from 'react-router-dom';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authors.length === 0) appActions.loadAuthors();
    return () => authorStore.removeChangeListener(onChange);
  }, [authors.length]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courses.length === 0) appActions.loadCourses();
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2 className="mb-3">Authors</h2>
      <div>
        {authors.map((author) => (
          <>
            <h4 className="mb-3">{author.name}</h4>
            <table className="table">
              <thead>
                <tr>
                  <th className="w-75">Courses</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) =>
                  course.authorId === author.id ? (
                    <tr>
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
          </>
        ))}
      </div>
    </>
  );
};

export default AuthorsPage;
