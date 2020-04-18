import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import NotFoundPage from './NotFoundPage';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import * as appActions from '../actions/appActions';
import { toast } from 'react-toastify';
import { Route } from 'react-router-dom';

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: ''
  });

  const slug = props.match.params.slug;
  const slugIsEmpty = slug === undefined ? true : false;
  const slugDoesExist = courses.some((cr) => cr.slug === slug);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courses.length === 0) {
      appActions.loadCourses();
    } else if (slug && slugDoesExist) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses, courses.length, props.match.params.slug, slug, slugDoesExist]);

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authors.length === 0) appActions.loadAuthors();
    return () => authorStore.removeChangeListener(onChange);
  }, [authors.length]);

  const onChange = () => {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  };

  const handleChange = ({ target }) => {
    setCourse({ ...course, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    appActions.saveCourse(course).then(() => {
      if (props.location.state) {
        props.history.push(props.location.state.previous);
      } else {
        props.history.push('/courses');
      }
      toast.success('Course saved.');
    });
  };

  const formIsValid = () => {
    const _errors = {};
    if (!course.title) _errors.title = 'Title is required';
    if (!course.authorId) _errors.authorId = 'Title is required';
    if (!course.category) _errors.category = 'Title is required';

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  };

  return slugDoesExist || slugIsEmpty ? (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  ) : (
    <Route component={NotFoundPage} />
  );
};

export default ManageCoursePage;
