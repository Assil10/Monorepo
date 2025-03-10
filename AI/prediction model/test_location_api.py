import requests

# Define API endpoint
API_URL = "http://127.0.0.1:5000/predict"  # Update this if the API is hosted elsewhere

# Sample valid test case based on dataset
valid_payload = {
    "address": "Soukra",
    "Habitable": 100,
    "Pièces": 3,
    "Salles_de_bains": 1,
    "Chambres": 2,
    "Garage": 0,
    "Jardin": 0,
    "Balcon": 1,
    "Meublé": 0,
    "Piscine": 0,
    "Etages": 3,
    "Type_Land": 0,
    "Type_Other": 0,
    "Type_Residential": 1
}


# Test Case 1: Valid Request
response = requests.post(API_URL, json=valid_payload)
print("Test 1: Valid Request")
print(response.json())

# Test Case 2: Missing Parameters
invalid_payload = valid_payload.copy()
del invalid_payload["Pièces"]  # Remove a required field
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 2: Missing Parameters")
print(response.json())

# Test Case 3: Invalid Data Types
invalid_payload = valid_payload.copy()
invalid_payload["Etages"] = "three"  # Invalid string instead of number
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 3: Invalid Data Types")
print(response.json())

# Test Case 4: Invalid Address (Geocoding Failure)
invalid_payload = valid_payload.copy()
invalid_payload["address"] = "Invalid Address XYZ"
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 4: Invalid Address")
print(response.json())

# Test Case 5: Extreme Values
invalid_payload = valid_payload.copy()
invalid_payload["Habitable"] = 999999  # Unrealistically high number
invalid_payload["Etages"] = -1  # Negative number should not be allowed
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 5: Extreme Values")
print(response.json())
