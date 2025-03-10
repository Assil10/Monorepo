import requests

# Define API endpoint
API_URL = "http://127.0.0.1:5000/predict"  # Change if hosted elsewhere

# Sample valid test case based on dataset
valid_payload = {
    "address": "Tunis, Tunisia",
    "Habitable": 122.00,
    "Terrain": 122.0,
    "Total": 192.00,
    "Pièces": 4.0,
    "Salles_de_bains": 1.0,
    "Chambres": 3.0,
    "Garage": 1,
    "Jardin": 0,
    "Balcon": 0,
    "Meublé": 0,
    "Piscine": 0,
    "Etages": 2.0,
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
del invalid_payload["Terrain"]  # Remove a required field
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 2: Missing Parameters")
print(response.json())

# Test Case 3: Invalid Data Types
invalid_payload = valid_payload.copy()
invalid_payload["Pièces"] = "four"  # Invalid string instead of number
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 3: Invalid Data Types")
print(response.json())

# Test Case 4: Invalid Address (Geocoding Failure)
invalid_payload = valid_payload.copy()
invalid_payload["address"] = "Invalid Address That Does Not Exist"
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 4: Invalid Address")
print(response.json())

# Test Case 5: Extreme Values
invalid_payload = valid_payload.copy()
invalid_payload["Habitable"] = 1000000  # Unrealistically large number
invalid_payload["Terrain"] = -50  # Negative value should not be allowed
response = requests.post(API_URL, json=invalid_payload)
print("\nTest 5: Extreme Values")
print(response.json())
