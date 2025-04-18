from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.firefox import GeckoDriverManager
import time
import pandas as pd
from dotenv import load_dotenv
import os
# Function to extract spans from divs
def extract_spans(divs,property_details):
    for div in divs:
        spans = div.find_elements(By.TAG_NAME, "span")
        property_details[spans[0].text]=spans[1].text
    return property_details
def get_states_links_statut(statut_ch):
    """
    This function responsible for filling  the 'link' and 'statut' fields in the dictionaries within property_details_lst.
    """
    property_details_lst=[]
    page_number=1
    print("Start scripting")
    while True:
        print("Getting state links from page number ",page_number)
        page_number=page_number+1
        # Open the website
        states = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[@class="gallery-item"]'))
            )
        state_index=0
        for state in states:
            state_index=state_index+1
            print("getting state ",state_index," link.")
            property_details_dic={}
            #getting the status (vente/location)
            try:
                property_details_dic['statut'] = state.find_element(By.XPATH,'.//div[@class="card-trans-type collection-card drop-shadow"]').text
            except:
                property_details_dic['statut']=statut_ch
            #getting the link of the state
            link_element = WebDriverWait(state, 20).until(
                    EC.presence_of_element_located((By.XPATH, './/div[@class="gallery-photo"]/a'))
                )
            property_details_dic['link'] = link_element.get_attribute('href')
            property_details_lst.append(property_details_dic)
        try:
            wait = WebDriverWait(driver, 10)
            xpath = f"//a[@data-page='{page_number}' and contains(@class, 'ajax-page-link')]"
            button_next = wait.until(EC.element_to_be_clickable((By.XPATH, xpath)))
            driver.execute_script("arguments[0].click();", button_next)
            #time.sleep(5)
        except:
            print("no page found")
            break
    return property_details_lst
def get_states_details(property_details_lst):
    """
    This function responsible for filling other fields in the dictionaries within property_details_lst.
    """
    for c in range(len(property_details_lst)):
        driver.get(property_details_lst[c]['link'])
        print("Sraping state number ",c+1)
        print(property_details_lst[c]['link'])
        try:
            property_details_lst[c]['title']=driver.find_element(By.XPATH,'//div[@class="col-xs-12 key-title"]/h1').text
        except:
            property_details_lst[c]['title']=""
        try:
            property_details_lst[c]['prix']= driver.find_element(By.XPATH,'//div[@class="key-price-div"]/a').text
        except:
            property_details_lst[c]['prix']=0
        try:
            property_details_lst[c]['address']= driver.find_element(By.XPATH,'//div[@class="col-xs-12 key-address fts-mark"]').text
        except:
            property_details_lst[c]['address']=""
        try:
            property_details_lst[c]['statut_marche']= driver.find_element(By.XPATH,'//div[@class="col-xs-12 key-status fts-mark"]').text
        except:
            property_details_lst[c]['statut_marche']=""
        details=driver.find_elements(By.XPATH,'//div[@class="attributes-data-row"]')
        # First detail: divs with class "attributes-icons attributes-data-col"
        first_detail_divs = details[0].find_elements(By.CLASS_NAME, "attributes-icons.attributes-data-col")
        # Second detail: divs with class "attributes-no-icons attributes-data-col"
        second_detail_divs = details[1].find_elements(By.CLASS_NAME, "attributes-no-icons.attributes-data-col")
        # Extract spans from both details
        property_details_lst[c]=extract_spans(first_detail_divs,property_details_lst[c])
        property_details_lst[c]=extract_spans(second_detail_divs,property_details_lst[c])
        caracteristiques=driver.find_elements(By.XPATH,'//div[@class="col-xs-6 col-sm-4 col-md-3 fts-mark"]/span')
        for caract in caracteristiques:
            property_details_lst[c][caract.text]=1
    return property_details_lst
#Main programme
# Load environment variables from .env file
load_dotenv()
# Define website url
# Correct chromedriver path
path = os.getenv("CHROMEDRIVER_PATH")
#desactivate gui
options = Options()
options.headless = True  # Run in headless mode (no browser UI)
options.add_argument("--disable-gpu")  # Disable GPU (fixes some headless issues)
options.add_argument("--no-sandbox")  # Avoid sandboxing issues
options.add_argument("--disable-dev-shm-usage")  # Improve performance in Docker/Linux

# 🚀 Setup WebDriver
service = Service(GeckoDriverManager().install())
driver = webdriver.Firefox(service=service, options=options)
statut_lst=['Location','Vente']
website_link_lst=['https://www.remax.com.tn/PublicListingList.aspx#mode=gallery&tt=260&cur=TND&sb=MostRecent&page=1&sc=1048&sid=7e6fd428-3ad7-4e60-aec1-1d113cdb5f08','https://www.remax.com.tn/PublicListingList.aspx#mode=gallery&tt=261&cur=TND&sb=MostRecent&page=1&sc=1048&lsgeo=0,0,0,0&sid=7e6fd428-3ad7-4e60-aec1-1d113cdb5f08']
csv_name=['remax_location.csv','remax_vente.csv']
for p in range(2):
    driver.get(website_link_lst[p])
    print("start scraping ",website_link_lst[p])
    #collecting the data
    property_details_lst=get_states_links_statut(statut_lst[p])
    print("Number of states to scrape: ",len(property_details_lst))
    property_details_lst=get_states_details(property_details_lst)
    print("end scraping ",website_link_lst[p])
    #creating the dataframe and transform it into a csv file
    df=pd.DataFrame(property_details_lst)
    df.to_csv(csv_name[p],index=False)
print("end of scraping")
driver.quit()


