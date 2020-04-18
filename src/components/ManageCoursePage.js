import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import NotFoundPage from './NotFoundPage';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import * as courseActions from '../actions/courseActions';
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
  const slugDoesExist = courses.some((cr) => cr.slug === slug);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug && slugDoesExist) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses, courses.length, props.match.params.slug, slug, slugDoesExist]);

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authors.length === 0) courseActions.loadAuthors();
    return () => authorStore.removeChangeListener(onChange);
  }, [authors.length]);

  const onChange = () => {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  };

  const handleChange = ({ target }) => {
    setCourse({ ...course, [target.name]: target.value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push('/courses');
      toast.success('Course saved.');
    });
  };

  return slugDoesExist ? (
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
