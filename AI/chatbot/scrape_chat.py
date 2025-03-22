from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.firefox import GeckoDriverManager
import time
import json
from dotenv import load_dotenv
import os
def get_blogs_links(website_link):
    """
    This function responsible for getting the blogs links
    """
    page_number=0
    blogs_lst=[]
    while True:
        try:
            page_number=page_number+1
            website = website_link+str(page_number)+'/'
            driver.get(website)
            print("Getting state links from page number ",page_number)
            # Open the website
            blogs = WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.XPATH, '//div[@class="search-result-item"]'))
                )
            blog_index=0
            for blog in blogs:
                blog_index=blog_index+1
                print("getting blog ",blog_index," link.")
                #getting the link of the state
                link_element = WebDriverWait(blog, 20).until(
                        EC.presence_of_element_located((By.XPATH, './/a'))
                    )
                blogs_lst.append(link_element.get_attribute('href'))
        except:
            print("no page found")
            break
    return blogs_lst
def fill_other_subtopic(number_of_subtopics,section,hn,section_type,question,lst_bl):
    for i in range(1,number_of_subtopics):
        dic_b={}
        dic_b['section']=section_type
        dic_b['question']=question
        path='.//'+hn+'['+str(i)+']'
        try:
            dic_b["subtopic"] = section.find_element(By.XPATH, path).text
            try:
                # Find the element that directly follows the current <h3>
                next_element = section.find_element(By.XPATH, f'.//{hn}[{i}]/following-sibling::*[1]')
                # Check if it's a <ul>
                if next_element.tag_name == "ul":
                    li_elements = next_element.find_elements(By.XPATH, './/li')
                    if len(li_elements) > 1:
                        dic_b["answer"] = [li.text for li in li_elements]
                    elif len(li_elements) == 1:
                        dic_b["answer"] = [li_elements[0].text]
                    else:
                        dic_b["answer"] = []
                elif next_element.tag_name == "p":
                    p_elements = []
                            
                    # Start from the first <p> we found
                    while next_element and next_element.tag_name == "p":
                        p_elements.append(next_element.text)  # Collect text
                        try:
                            # Move to the next sibling element
                            next_element = next_element.find_element(By.XPATH, "following-sibling::*[1]")
                        except:
                            break  # Stop if no more siblings
                            
                    # Store result
                    dic_b["answer"] = p_elements if p_elements else []
                else:
                    dic_b["answer"] = []
                if dic_b["answer"]!=[]:
                    lst_bl.append(dic_b)
            except:
                pass
        except:
            pass
    return lst_bl
  
def get_blogs_data(link_lst,section_type):
    """
    This function responsible for collecting blogs data and store it 
    """
    blogs_data_lst=[]
    for link in link_lst:
        blog_dic={}
        driver.get(link)
        blog_dic['section']=section_type
        try:
            
            question=WebDriverWait(driver,10).until(
                EC.presence_of_element_located((By.XPATH, '//div[@class="post-title-wrap"]/h1'))
            )  
        except:
            question=""
        blog_dic['question']=question.text
        section=WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//div[@class="post-content-wrap"]'))
            )
        try:
            blog_dic['subtopic']="intrdocution"
            blog_dic['answer']=section.find_element(By.XPATH,'.//p[3]').text
        except:
            blog_dic['answer']=[]
        if blog_dic['answer']!=[]:
            blogs_data_lst.append(blog_dic)
        number_of_subtopics_h3=len(section.find_elements(By.XPATH,'.//h3'))
        number_of_subtopics_h2=len(section.find_elements(By.XPATH,'.//h2'))
        if number_of_subtopics_h3>number_of_subtopics_h2:
            blogs_data_lst=fill_other_subtopic(number_of_subtopics_h3,section,"h3",section_type,question.text,blogs_data_lst)
        else:
            blogs_data_lst=fill_other_subtopic(number_of_subtopics_h2,section,"h2",section_type,question.text,blogs_data_lst)
    return blogs_data_lst

options = Options()
options.headless = True  # Run in headless mode (no browser UI)
options.add_argument("--disable-gpu")  # Disable GPU (fixes some headless issues)
options.add_argument("--no-sandbox")  # Avoid sandboxing issues
options.add_argument("--disable-dev-shm-usage")  # Improve performance in Docker/Linux

# 🚀 Setup WebDriver
service = Service(GeckoDriverManager().install())
driver = webdriver.Firefox(service=service, options=options)

# Open the website
blog_type_lst=['Laws','Real Estate','Registration']
website_link_lst=['https://al-mindhar.com/category/laws/page/','https://al-mindhar.com/category/real-estate/page/','https://al-mindhar.com/category/registration/page/']
json_name=['laws.json','real_state.json','registration.json']
for p in range(3):
    print("start scraping ",blog_type_lst[p],' page')
    blogs_link_lst=get_blogs_links(website_link_lst[p])
    print("Number of blogs to scrape: ",len(blogs_link_lst))
    blogs_data=get_blogs_data(blogs_link_lst,blog_type_lst[p])
    print("end scraping ",blog_type_lst[p],' page')
    filename = json_name[p]
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(blogs_data, f, indent=4)

    print(f"JSON file '{filename}' has been created.")

# Close the driver
driver.quit()
