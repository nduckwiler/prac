SELECT *
FROM clean_lessons
WHERE track_slug IN (
  'react-201-optional',
  'jquery-ext')
  OR module_slug IN (
    'jquery-iterators',
    'jquery-manipulating-the-dom');
