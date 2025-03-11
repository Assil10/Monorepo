import time
import pickle
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import logging
import pandas as pd
# Initialize geolocator once
geolocator = Nominatim(user_agent="my_unique_app_12345")
# Define CSV file for caching

def get_coordinates(address,max_retries):
    """
    Converts an address into (latitude, longitude) using geopy.
    Retries up to `max_retries` times with a delay before giving up.
    Logs warnings on retries and an error if all attempts fail.
    why logs ? :
    Different log levels You can categorize messages as DEBUG, INFO, WARNING, ERROR, or CRITICAL.
    """
    geocode_df= pd.read_csv("geocode_cache.csv")
    if address in geocode_df['address'].values:
        cached_row = geocode_df.loc[geocode_df['address'] == address]
        return cached_row['Latitude'].values[0], cached_row['Longitude'].values[0]
    else:
        for attempt in range(max_retries):
            try:
                location = geolocator.geocode(address, timeout=10)
                if location:
                    logging.info(f"Geocoding successful for '{address}': ({location.latitude}, {location.longitude})")
                    geocode_df.loc[len(geocode_df)] = [address,location.latitude, location.longitude]
                    geocode_df.to_csv("geocode_cache.csv",index=False)
                    return location.latitude, location.longitude
            except GeocoderTimedOut:
                logging.warning(f"Geocoding timeout for '{address}', retrying {attempt + 1}/{max_retries}...")
                time.sleep(1)  # Wait before retrying

        # If all retries fail, log an error and return None
        logging.error(f"Geocoding failed for '{address}' after {max_retries} attempts.")
        return None, None

def load_model(model_path):
    """
    Loads a pre-trained model pipeline from a given path.
    """
    return pickle.load(open(model_path, 'rb'))
