import pandas as pd

def func(x):
    return x + 1

def test_answer():
    assert func(3) == 4

def test_csv_not_empty():
    df = pd.read_csv("data/clean_lessons.csv")
    assert df.empty == False

def test_csv_avail_content():
    df = pd.read_csv("data/clean_lessons.csv")
    assert (df.module_slug == "jquery-iterators").any() == False
    assert (df.module_slug == "jquery-manipulating-the-dom").any() == False

def test_csv_avail_content_v2():
    df = pd.read_csv("data/clean_lessons.csv")
    has_unavail_modules = df.module_slug.isin([
        "jquery-iterators",
        "jquery-manipulating-the-dom"]).any()
    has_unavail_tracks = df.track_slug.isin([
        "jquery-ext",
        "ready-javascript-201-optional",
        "ready-javascript-201-main"]).any()
    assert has_unavail_modules == False
    assert has_unavail_tracks == False

