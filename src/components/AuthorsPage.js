import React, { useState, useEffect } from 'react';
import authorStore from '../stores/authorStore';
import courseStore from '../stores/courseStore';
import * as appActions from '../actions/appActions';
import AuthorsList from './AuthorsList';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [author, setAuthor] = useState({ name: '' });

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authors.length === 0) appActions.loadAuthors();
    return () => authorStore.removeChangeListener(onChange);
  }, [author, authors.length]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courses.length === 0) appActions.loadCourses();
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
    setCourses(courseStore.getCourses());
  }

  function handleChange(e) {
    setAuthor({ name: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (author.name !== '') {
      appActions.saveAuthor(author).then(() => {
        setAuthor({ name: '' });
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button className="btn btn-primary float-right mt-1">Add Author</button>
        <input
          type="text"
          onChange={handleChange}
          className="form-control float-right mt-1 mr-2 w-25"
          value={author.name}
        />
      </form>
      <h2 className="mb-3">Authors</h2>
      <AuthorsList authors={authors} courses={courses} />
    </>
  );
};

export default AuthorsPage;
