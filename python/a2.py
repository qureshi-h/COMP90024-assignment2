import couchdb
import requests
import json
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import twitter_samples, stopwords
from nltk.tag import pos_tag
from nltk.tokenize import word_tokenize
from nltk import FreqDist, classify, NaiveBayesClassifier
import re, string, random

#Twitter request
query = {}
response = requests.get("https://api.twitter.com/1.1/search/tweets.json", params = query)

#Couch DB connect
couch = couchdb.Server('https://username:password@host:port/') #Modify to include actual server name

#Connect to twitter databases on couch
db_opportunities_twitter = couch['name'] #Modify to include actual name from couchDB
db_secularism_twitter = couch['name'] #Modify to include actual name from couchDB
db_violence_twitter = couch['name'] #Modify to include actual name from couchDB
db_mentalHealth_twitter = couch['name'] #Modify to include actual name from couchDB
db_substanceAbuse_twitter = couch['name'] #Modify to include actual name from couchDB
db_education_twitter = couch['name'] #Modify to include actual name from couchDB

#Connect to aurin databases on couch
db_opportunities_aurin = couch['name'] #Modify to include actual name from couchDB
db_secularism_aurin = couch['name'] #Modify to include actual name from couchDB
db_violence_aurin = couch['name'] #Modify to include actual name from couchDB
db_mentalHealth_aurin = couch['name'] #Modify to include actual name from couchDB
db_substanceAbuse_aurin = couch['name'] #Modify to include actual name from couchDB
db_education_aurin = couch['name'] #Modify to include actual name from couchDB

#Aurin DB Insertion
def insert_data_aurin():
    db_national_drug_strat_aurin = couch['name'] #Modify to include actual name from couchDB
    db_family_violence_aurin = couch['name'] #Modify to include actual name from couchDB
    db_religious_affiliation_aurin = couch['name'] #Modify to include actual name from couchDB
    db_principal_diagnosis_aurin = couch['name'] #Modify to include actual name from couchDB
    db_highest_year_school_aurin = couch['name'] #Modify to include actual name from couchDB
    db_non_school_qual_aurin = couch['name'] #Modify to include actual name from couchDB
    db_lga_profiles_aurin = couch['name'] #Modify to include actual name from couchDB

    #Load AURIN Datasets
    nat_drug_strat = open('aihw_national_drug_strategy_tobacco_alcohol_drug_phn_2016-2520923030413325430')
    fam_violence = open('csa_family_violence_violence_rate_lga_jun2016_jun2018-2105288931852105569')
    rel_affiliation = open('gccsa_g14_religious_affiliation_by_sex_census_2016-3891071021158871781')
    mental_health = open('phidu_admissions_principal_diagnosis_persons_lga_2014_15-1786525715406522307')
    highest_school_year = open('sa3_p16a_highest_yr_sch_by_age_by_sex_census_2016-7091432540489105805')
    non_school_qual = open('sa3_p39b_non_schl_qual_field_of_study_by_age_by_sex_census_2016-3970673947402248745')
    lga_profiles = open('vic_govt_dhhs_lga_profiles_2015-8931118096186002552')

    #Save data to couchDB

    metrics_doc = {
        "smk_status_never_smoked":0,
        "smk_status_ex_smoker":0,
        "smk_status_daily":0,
        "recent_illicit":0,
        "alcohol_risk_abstainers_ex_drinkers":0,
        "alcohol_risk_lifetime_risk_lorisk":0,
        "alcohol_risk_lifetime_risk_risky":0,
        "min_area_family_violence":"",
        "max_area_family_violence":"",
        "total_family_violence":0,
        "islam_ratio":0,
        "christianity_ratio":0,
        "hinduism_ratio":0,
        "judaism_ratio":0,
        "buddhism_ratio":0,
        "total_females_not_attended_school": 0,
        "total_males_not_attended_school":0,
        "total_females_attended_school": 0,
        "total_males_attended_school":0
    }

    #National Drug Strategy
    phn_count=0
    for feature in nat_drug_strat['features']:
        metrics_doc["smk_status_never_smoked"] += feature["properties"]["smk_status_never_smoked"]
        metrics_doc["smk_status_ex_smoker"] += feature["properties"]["smk_status_ex_smoker"]
        metrics_doc["smk_status_daily"] += feature["properties"]["smk_status_daily"]
        metrics_doc["recent_illicit"] += feature["properties"]["recent_illicit"]
        metrics_doc["alcohol_risk_abstainers_ex_drinkers"] += feature["properties"]["alcohol_risk_abstainers_ex_drinkers"]
        metrics_doc["alcohol_risk_lifetime_risk_lorisk"] += feature["properties"]["alcohol_risk_lifetime_risk_lorisk"]
        metrics_doc["alcohol_risk_lifetime_risk_risky"] += feature["properties"]["alcohol_risk_lifetime_risk_risky"]
        phn_count = phn_count+1
    
    metrics_doc["smk_status_never_smoked"] = metrics_doc["smk_status_never_smoked"]/phn_count
    metrics_doc["smk_status_ex_smoker"] = metrics_doc["smk_status_ex_smoker"]/phn_count
    metrics_doc["smk_status_daily"] = metrics_doc["smk_status_daily"]/phn_count
    metrics_doc["recent_illicit"] = metrics_doc["recent_illicit"]/phn_count
    metrics_doc["alcohol_risk_abstainers_ex_drinkers"] = metrics_doc["alcohol_risk_abstainers_ex_drinkers"]/phn_count
    metrics_doc["alcohol_risk_lifetime_risk_lorisk"] = metrics_doc["alcohol_risk_lifetime_risk_lorisk"]/phn_count
    metrics_doc["alcohol_risk_lifetime_risk_risky"] = metrics_doc["alcohol_risk_lifetime_risk_risky"]/phn_count

    fam_violence_area_count = 0
    min_violence = 0
    max_violence = 0

    #Family Violence
    for feature in fam_violence['features']:
        metrics_doc["total_family_violence"] += feature['properties']['domestic_family_sexual_violence_rate_per_100k']
        if fam_violence_area_count == 0:
            metrics_doc['min_area_family_violence'] = feature['properties']['lga_name11']
            metrics_doc['max_area_family_violence'] = feature['properties']['lga_name11']
            min_violence = feature['properties']['domestic_family_sexual_violence_rate_per_100k']
            max_violence = feature['properties']['domestic_family_sexual_violence_rate_per_100k']
        else:
            if min_violence>feature['properties']['domestic_family_sexual_violence_rate_per_100k']:
                metrics_doc['min_area_family_violence'] = feature['properties']['domestic_family_sexual_violence_rate_per_100k']
                min_violence = feature['properties']['domestic_family_sexual_violence_rate_per_100k']
            if max_violence<feature['properties']['domestic_family_sexual_violence_rate_per_100k']:
                metrics_doc['max_area_family_violence'] = feature['properties']['domestic_family_sexual_violence_rate_per_100k']
                max_violence<= feature['properties']['domestic_family_sexual_violence_rate_per_100k']
        fam_violence_area_count += 1
    metrics_doc["total_family_violence"] = metrics_doc["total_family_violence"]/fam_violence_area_count

    #Religious Affiliation
    total_people_surveyed = 0
    islam = 0
    christianity = 0
    buddhism = 0
    hinduism = 0
    judaism = 0

    for feature in rel_affiliation['fetaures']:
        if feature['properties']['gcc_code16'] == "2GMEL":
            total_people_surveyed = int(feature['properties']['tot_p'])
            for key in feature['properties']:
                if "christianity" in key and key[-1]=='p':
                    christiantiy += int(feature['properties'][key])
                if "islam" in key and key[-1]=='p':
                    islam += int(feature['properties'][key])
                if "buddhism" in key and key[-1]=='p':
                    buddhism += int(feature['properties'][key])
                if "hinduism" in key and key[-1]=='p':
                    hinduism += int(feature['properties'][key])
                if "judaism" in key and key[-1]=='p':
                    judaism += int(feature['properties'][key])
            metrics_doc["christianity"] = christianity/total_people_surveyed
            metrics_doc["islam"] = islam/total_people_surveyed
            metrics_doc["buddhism"] = buddhism/total_people_surveyed
            metrics_doc["hinduism"] = hinduism/total_people_surveyed
            metrics_doc["judaism"] = judaism/total_people_surveyed
            
    #Schooling
    total_males = 0
    total_females = 0
    for feature in highest_school_year:
        metrics_doc['total_males_not_attended_school'] += int(feature['properties']['m_dngts_tot'])
        metrics_doc['total_females_not_attended_school'] += int(feature['properties']['f_dngts_tot'])
        total_males += int(feature['properties']['m_tot_tot'])
        total_females += int(feature['properties']['f_tot_tot'])
    metrics_doc['total_males_attended_school'] = total_males - metrics_doc['total_males_not_attended_school']
    metrics_doc['total_females_attended_school'] = total_females - metrics_doc['total_females_not_attended_school']
        

def sentiment_analysis():
    positive_tweets = twitter_samples.strings('positive_tweets.json')
    negative_tweets = twitter_samples.strings('negative_tweets.json')
    text = twitter_samples.strings('tweets.20150430-223406.json')
    tweet_tokens = twitter_samples.tokenized('positive_tweets.json')[0]

    stop_words = stopwords.words('english')

    positive_tweet_tokens = twitter_samples.tokenized('positive_tweets.json')
    negative_tweet_tokens = twitter_samples.tokenized('negative_tweets.json')

    positive_cleaned_tokens_list = []
    negative_cleaned_tokens_list = []

    for tokens in positive_tweet_tokens:
        positive_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

    for tokens in negative_tweet_tokens:
        negative_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

    all_pos_words = get_all_words(positive_cleaned_tokens_list)

    freq_dist_pos = FreqDist(all_pos_words)
    print(freq_dist_pos.most_common(10))

    positive_tokens_for_model = get_tweets_for_model(positive_cleaned_tokens_list)
    negative_tokens_for_model = get_tweets_for_model(negative_cleaned_tokens_list)

    positive_dataset = [(tweet_dict, "Positive")
                         for tweet_dict in positive_tokens_for_model]

    negative_dataset = [(tweet_dict, "Negative")
                         for tweet_dict in negative_tokens_for_model]

    dataset = positive_dataset + negative_dataset

    random.shuffle(dataset)

    train_data = dataset[:7000]
    test_data = dataset[7000:]

    classifier = NaiveBayesClassifier.train(train_data)

    custom_tweet = "I ordered just once from TerribleCo, they screwed up, never used the app again."

    custom_tokens = remove_noise(word_tokenize(custom_tweet))

    print(custom_tweet, classifier.classify(dict([token, True] for token in custom_tokens)))

def remove_noise(tweet_tokens, stop_words = ()):

    cleaned_tokens = []

    for token, tag in pos_tag(tweet_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+','', token)
        token = re.sub("(@[A-Za-z0-9_]+)","", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens

def get_all_words(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        for token in tokens:
            yield token

def get_tweets_for_model(cleaned_tokens_list):
    for tweet_tokens in cleaned_tokens_list:
        yield dict([token, True] for token in tweet_tokens)
