# FakeOff-Hackathon
FakeOff is a Chrome extension. Its aim is to help people find reliable news-sources during the covid-19 pandemic.
The extension's menu allows users to be in charge of what they choose to view on the internet. Its functionality lies in its large database that automatically checks if websites have been flagged as untrustworthy or trustworthy. 
Our database is mostly based on content that falls in line with the WHO. 
The extension makes use of two servers that we set up:
The first server runs our information database.
The second server extracts keywords using text analysis.

Functionality:
MENU
- Block Domain :
  allows users to flag the entire website as untrustworthy
  
- Block Article :
  allows users to flag the specific url (e.g. article or page) as untrustworthy 
  
- Add Whitelist :
  allows users to mark the article/website as trustworthy
  
- Check Headline :
  performs sentiment analysis on the headline to check for clickbait

BACKGROUND
highlighting text in the article and searching for related articles: 
If you select text and right click, you will be given the option to look for related articles contained in our trustworthy database. 
