from nltk.stem import PorterStemmer

all_keywords = {
    "secularism": {"islam": {"islam, Allah, quran, muslim, islamic", "mosque", "imam", "fajr", "zuhr", "asr",
                             "maghrib", "isha", "ramadan", "azan", "azaan"},
                   "christianity": {"christian", "christianity", "bible", "jesus", "catholic",
                                    "church", "priest", "psalm", "christ"},
                   "hinduism": {"hindu", "hinduism", "gita", "bhagwan", "Vishnu", "Krishna"},
                   "buddhism": {"buddha", "buddhism", "monk", "buddhist"},
                   "judaism": {"jews", "judaism", "rabbi", "torah", "Shacharit", "Mincha", "Ma'ariv", "Mussaf",
                               "kippah", "hanukkah"},
                   "religion": {"God", "religion", "prayer"}
                   },
    "violence": {"family violence": {"family violence", "abuse", "bruise", "domestic abuse", "forced marriage",
                                     "partner violence", "partner homicide", "sexual abuse", "siblicide",
                                     "stalking", "domestic violence"},
                 "crime": {"crime", "felony", "stabbing", "theft", "murder", "misconduct", "misdemeanour",
                           "blackmail", "burglary", "genocide", "hit and run", "kidnapping", "manslaughter",
                           "mugging", "robbery", "rape", "vandalism", "trafficking"}},
    "mental health": {"mental health": {"anxiety", "panic attacks", "depression", "mental health",
                                        "overwhelmed", "therapy", "schizophrenia", "mental illness", "mania",
                                        "paranoia", "emotional instability"}},
    "substance abuse": {"substance abuse": {"substance abuse", "overdose", "drugs", "heroin", "meth",
                                            "alcohol", "addiction", "addicted", "alcoholism", "narcotics",
                                            "drug use", "drug abuse"}},
    "education": {"education": {"education", "school", "graduated", "graduation", "study", "PhD"}}}


def get_keywords():
    ps = PorterStemmer()
    for topic, subtopics in all_keywords.items():
        for subtopic, words in subtopics.items():
            new_words = set()
            for word in words:
                new_words.add(ps.stem(word))
            all_keywords[topic][subtopic] = all_keywords[topic][subtopic].union(new_words)
    return all_keywords
