import pandas as pd
#pd.set_option('display.max_columns', 12)

df = pd.read_csv('jr_raw_data.csv')

#print(df.head(10))

series = df.module_slug
#print(type(df))
#print(type(series))

new_df = df[['module_slug', 'content_item_id', 'content_item_length']]
#print(new_df.head(10))
#print(type(new_df))

second_row = df.iloc[1]
#print(second_row)
#print(type(second_row))

# Select all rows where type is lesson and length > 10
long_lessons = df[(df.content_item_length > 10) &
                (df.content_item_type == 'lesson')]
#print(long_lessons.head(10))

# Reset indices and drop old indices
reset_long_lessons = long_lessons.reset_index(drop=True)
#print(reset_long_lessons.head(10))

# Create new dataframes, filtering in/out a list of things
just_jquery = df[df.module_slug.isin(["learn-jquery-iterators",
                                        "learn-jquery-manipulating-the-dom"])]
#print(just_jquery.head(10))
without_jquery = df[~df.module_slug.isin(["learn-jquery-iterators",
                                        "learn-jquery-manipulating-the-dom"])]
#print(without_jquery.head(10))

# Remove deprecated content
current = df[df.is_deprecated == False]

# Remove content not accessible on UI
inaccessible_tracks = ["jquery-ext",
                       "javascript-ext",
                       "ready-javascript-201-main",
                       "ready-javascript-201-optional",
                       "proteam-articles-test"]

inaccessible_modules = ["learn-pandas",
                        "learn-jquery-iterators",
                        "learn-jquery-manipulating-the-dom",
                        "cspath-projects"]

current_and_accessible = current[~(
    current.track_slug.isin(inaccessible_tracks) |
    current.module_slug.isin(inaccessible_modules)
)]

# Remove content of length 1 or below
# This will exclude projects intended for off-platform,
# like jumpstart, dasmoto, colmar-academy, tea-cozy
current_accessible_real = current_and_accessible[current_and_accessible.content_item_length > 1]


"""
# Optional: View duplicates
ids = current_accessible_real.content_item_id
sorted = current_accessible_real[ids.isin(ids[ids.duplicated()])].sort_values(by=["content_item_id"])
print(sorted[["content_item_id", "module_slug", "content_item_slug"]])
"""

# Remove duplicates
current_accessible_real.drop_duplicates("content_item_id", keep="first", inplace=True)
#print(current_accessible_real.describe())

print("~~~LESSONS~~~")
lessons = current_accessible_real[current_accessible_real.content_item_type == "lesson"]
print(lessons.describe())

print("~~~PROJECTS~~~")
projects = current_accessible_real[current_accessible_real.content_item_type == "project"]
print(projects.describe())

print("~~~QUIZZES~~~")
quizzes = current_accessible_real[current_accessible_real.content_item_type == "quiz"]
print(quizzes.describe())
