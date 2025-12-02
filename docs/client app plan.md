HomePage:
- Navigate to article search

TopicsPages
topics/
- TopicList: full screen, list category card
  > GetTopicList api
topics/{id}/
- show topic summary article
topics/{id}/articles/{id}
- TopicArticleLayout, ArticleHeader, ArticleContent, FloatButtons
  > GetArticleById api
  > GetTopicById api

ArticleSearchPage
- ArticleFilters: top half section, category tabs, display topic card
  > GetCategoryList api
- ArticleList: display article cards, recent articles
  > Search article api


article features/components
- ArticleCard (title, desc, tags, full width)
- TopicCard (name, desc, img, min card)
- CategoryCard (name, desc, img, list of topics, full width)
- CategoryTopicList: category tabs & topic card

