import React, { useState, useEffect } from 'react';
import authorStore from '../stores/authorStore';
import courseStore from '../stores/courseStore';
import * as appActions from '../actions/appActions';
import AuthorsList from './AuthorsList';
import { toast } from 'react-toastify';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [author, setAuthor] = useState({
    id: '',
    name: ''
  });

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
    setAuthor({ ...author, [e.target.id]: e.target.value });
  }

  function handleDeleteAuthor(id) {
    appActions.deleteAuthor(id);
    toast.success('Author deleted.');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (author.name !== '') {
      appActions.saveAuthor(author).then(() => {
        toast.success('Author saved.');
        setAuthor({ id: '', name: '' });
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button className="btn btn-primary float-right mt-1">Add Author</button>
        <input
          id="name"
          type="text"
          placeholder="Author"
          onChange={handleChange}
          className="form-control float-right mt-1 mr-2 w-25"
          value={author.name}
        />
        <input
          id="id"
          type="text"
          placeholder="Id"
          onChange={handleChange}
          className="form-control float-right mt-1 mr-2"
          style={{ width: '10%' }}
          value={author.id}
        />
      </form>
      <h2 className="mb-3">Authors</h2>
      <AuthorsList
        authors={authors}
        courses={courses}
        onClick={handleDeleteAuthor}
      />
    </>
  );
};

export default AuthorsPage;
