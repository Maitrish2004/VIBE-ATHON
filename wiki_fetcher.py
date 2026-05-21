import wikipediaapi
import json


wiki_wiki = wikipediaapi.Wikipedia('ClassicaLens_VibeAthon (contact@example.com)', 'en')

def get_tradition_context(query):
    """
    Fetches real, authentic cultural context from Wikipedia.
    """
    try:
        page = wiki_wiki.page(query)
        if not page.exists():
            return None
        
        
        summary = page.summary[0:500] + "..." if len(page.summary) > 500 else page.summary
        
        return {
            "title": page.title,
            "url": page.fullurl,
            "authentic_summary": summary,
            "source": "Wikipedia"
        }
    except Exception as e:
        print(f"Wikipedia API error: {e}")
        return None


WIKI_MAP = {
    "carnatic": "Carnatic music",
    "hindustani": "Hindustani classical music",
    "baroque": "Baroque music",
    "romantic": "Romantic music",
    "flamenco": "Flamenco",
    "guqin": "Guqin",
    "gagaku": "Gagaku",
    "maqam": "Arabic maqam",
    "tango": "Argentine tango",
    "celtic": "Celtic music",
    "bollywood": "Bollywood music",
    "hollywood": "Film score"
}

def fetch_authentic_data(tradition_id):
    query = WIKI_MAP.get(tradition_id, tradition_id)
    return get_tradition_context(query)
