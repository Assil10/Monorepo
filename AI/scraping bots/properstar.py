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
def get_states_links_statut(website_link,statut_ch):
    """
    This function responsible for filling  the 'link' and 'statut' fields in the dictionaries within property_details_lst.
    """
    page_number=0
    property_details_lst=[]
    while True:
        try:
            page_number=page_number+1
            website = website_link+str(page_number)
            driver.get(website)
            print("Getting state links from page number ",page_number)
            # Open the website
            states = WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.XPATH, '//article[@class="item-adaptive card-basic vendor-hidden"]'))
                )
            state_index=0
            for state in states:
                state_index=state_index+1
                print("getting state ",state_index," link.")
                property_details_dic={}
                property_details_dic['statut']=statut_ch
                #getting the link of the state
                link_element = WebDriverWait(state, 20).until(
                        EC.presence_of_element_located((By.XPATH, './/a[@class="link"]'))
                    )
                property_details_dic['link'] = link_element.get_attribute('href')
                print(property_details_dic['link'])
                property_details_lst.append(property_details_dic)
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
            property_details_lst[c]['title']= driver.find_element(By.XPATH,'//div[@class="main-info"]/h1').text
        except:
            property_details_lst[c]['title']=""
        try:
            property_details_lst[c]['address']=driver.find_element(By.XPATH,'//span[@class="item-info-address-inner-address"]').text
        except:
            property_details_lst[c]['address']=""
        
        try:
            property_details_lst[c]['prix']= driver.find_element(By.XPATH,'//div[@class="listing-price-main"]/span').text
        except:
            property_details_lst[c]['prix']=0    
    
        details=driver.find_elements(By.XPATH,'//div[@class="feature-content"]')
        for detail in details:
            try:
                key=detail.find_element(By.XPATH,'.//span[@class="property-key"]').text
                value=detail.find_element(By.XPATH,'.//span[@class="property-value"]').text
                property_details_lst[c][key]=value
            except:
                key=detail.find_element(By.XPATH,'.//span[@class="property-value"]').text
                value=1
                property_details_lst[c][key]=key
                property_details_lst[c][value]=value
    return property_details_lst

#Main programme
# Load environment variables from .env file
load_dotenv()
# Correct ChromeDriver path
path = os.getenv("CHROMEDRIVER_PATH")

# Set up Chrome options
options = Options()
options.headless = True  # Run in headless mode (no browser UI)
options.add_argument("--disable-gpu")  # Disable GPU (fixes some headless issues)
options.add_argument("--no-sandbox")  # Avoid sandboxing issues
options.add_argument("--disable-dev-shm-usage")  # Improve performance in Docker/Linux

# 🚀 Setup WebDriver
service = Service(GeckoDriverManager().install())
driver = webdriver.Firefox(service=service, options=options)
#setting up variables that contain page links , file names
statut_lst=['Commercial','Commercial','Location','vente']
website_link_lst=['https://www.properstar.fr/tunisie/louer/commercial?p=','https://www.properstar.fr/tunisie/acheter/commercial?p=','https://www.properstar.fr/tunisie/louer/appartement-maison?p=','https://www.properstar.fr/tunisie/acheter/appartement-maison?p=']
csv_name_lst=['properstar_commercial_location.csv','properstar_commercial_vente.csv','properstar_location.csv','properstar_vente.csv']
# scraping websites
for p in range(4):
    print("start scraping ",website_link_lst[p])
    property_details_lst=get_states_links_statut(website_link_lst[p],statut_lst[p])
    print("Number of states to scrape: ",len(property_details_lst))
    property_details_lst=get_states_details(property_details_lst)
    print("end scraping ",website_link_lst[p])
    #creating the dataframe and transform it into a csv file
    df=pd.DataFrame(property_details_lst)
    df.to_csv(csv_name_lst[p],index=False)
print("end of scraping")
# Close the driver
driver.quit()