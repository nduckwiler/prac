WITH raw AS (
  SELECT content_item_uuid 
  FROM raw_lessons
)
SELECT * 
FROM clean_lessons 
WHERE content_item_uuid NOT IN raw;

